import { Request, Response } from 'express';
import { Sequelize } from 'sequelize';
import { Model, ModelCtor } from 'sequelize/types';
import { CommonController } from '../class';
import { db } from '../config/db';
import log from '../logger';
import { ProductAttribute } from '../models/product.model';
import { ProductTempAttribute } from '../models/producttemp.model';
import { FilterPayload } from '../utils';

export class Product extends CommonController {
  constructor(Db: ModelCtor<Model<any, any>>) {
    super(Db);
  }

  // @Override
  public async create(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> {
    try {
      const { name, slug } = req.body;

      const categoryId = parseInt(req.body.categoryId);
      const statusPId = parseInt(req.body.statusPId);

      if (!name || !slug || !categoryId || !statusPId)
        return res.status(404).json({ message: 'Missing parameter !', error: true });

      const [response, created] = await super.handleFindAndCreate({
        where: { name, slug, categoryId, statusPId },
        defaults: { ...req.body, categoryId: categoryId, statusPId: statusPId },
        raw: true,
      });

      if (!created) return res.status(400).json({ message: 'Row is exist !', error: true });

      res.status(200).json({ message: 'Create row succeed.', error: false, data: response });
    } catch (error) {
      log.error(error);
      if (error instanceof Error)
        return res.status(500).json({ message: 'ERROR FROM SERVER!!!', error: error.message });
    }
  }

  // @Override
  public async update(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> {
    try {
      const { categoryId, statusPId, slug } = req.body;
      const id = parseInt(req.params.id);

      if (!categoryId || !statusPId || !id)
        return res.status(404).json({ message: 'Missing parameter !', error: true });

      const findProduct: ProductAttribute = (
        await super.handleFind({ where: { slug, categoryId } })
      )?.get();

      if (findProduct.id !== id)
        return res
          .status(400)
          .json({ message: 'Name and Slug were existed with "ID" difference !', error: true });

      const response = await super.handleUpdate<ProductAttribute>(id, { ...req.body });

      if (response[0] === 0)
        return res.status(400).json({ message: 'ID was not found !', error: true });

      res.status(200).json({ message: 'Update succeed.', error: false });
    } catch (error) {
      log.error(error);
      if (error instanceof Error)
        return res.status(500).json({ message: 'ERROR FROM SERVER!!!', error: error.message });
    }
  }

  // @Override
  public async getAll(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> {
    try {
      const _order = req.query._order as 'DESC' | 'ASC';
      const _name = req.query._name as string;
      const name_like = req.query.name_like as string;

      const _limit = parseInt(req.query._limit as string);
      let _page = parseInt(req.query._page as string);

      _page = _page < 1 ? (_page = 0) : _page - 1;

      if (!_limit && !_page && !_order && !_name && !name_like) {
        const response = await super.handleGetAll();

        return res.status(200).json({
          message: 'GET ALL SUCCEED.',
          error: false,
          data: response,
          pagination: {
            _limit: 5,
            _page: 0,
            _totalRows: response.length,
          },
        });
      }

      const filter: FilterPayload = {
        ...req.query,
        _limit,
        _page,
        _name,
        _order,
        name_like,
      };

      const response = await super.handleGetAllAndFilterByIncludes(filter, [
        {
          model: db.Category,
          as: 'categories',
          attributes: {
            exclude: ['id', 'createdAt', 'updatedAt'],
          },
        },
        {
          model: db.StatusProduct,
          as: 'status',
          attributes: {
            exclude: ['id', 'createdAt', 'updatedAt'],
          },
        },
        {
          model: db.ProductPrice,
          as: 'price',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
      ]);

      res.status(200).json({
        message: 'GET ALL SUCCEED',
        error: false,
        data: response.rows,
        pagination: { _limit: _limit, _page: _page + 1, _totalRows: response.count },
      });
    } catch (error) {
      log.error(error);
      if (error instanceof Error)
        return res.status(500).json({ message: 'ERROR FROM SERVER!!!', error: error.message });
    }
  }

  public async getCollections(req: Request, res: Response) {
    try {
      let limit = parseInt(req.query._limit as string);
      let dayClient = req.query._day;

      if (!Boolean(limit)) {
        limit = 10;
      }

      if (!dayClient || dayClient === null || super.hasOneDayPassed(dayClient as string)) {
        const response = await super.handleGetAll({
          order: [Sequelize.fn('random')],
          limit: limit,
          include: [
            {
              model: db.Category,
              as: 'categories',
              attributes: {
                exclude: ['id', 'createdAt', 'updatedAt'],
              },
            },
            {
              model: db.StatusProduct,
              as: 'status',
              attributes: {
                exclude: ['id', 'createdAt', 'updatedAt'],
              },
            },
            {
              model: db.ProductPrice,
              as: 'price',
              attributes: {
                exclude: ['createdAt', 'updatedAt'],
              },
            },
          ],
        });

        await db.ProductTemp.destroy({ truncate: true });

        const data = response as Array<ProductAttribute>;

        const arrProductId: Array<ProductTempAttribute> = data.map(
          (item): ProductTempAttribute => ({ productId: item.id as number })
        );

        // @ts-ignore
        await db.ProductTemp.bulkCreate(arrProductId);

        return res.status(200).json({
          message: 'GET ALL SUCCEED',
          error: false,
          dayGet: new Date().toLocaleDateString(),
          data: response,
        });
      }

      const responseTemp = await db.ProductTemp.findAll({
        attributes: ['id'],
        include: {
          model: db.Product,
          as: 'products',
          include: [
            {
              model: db.Category,
              as: 'categories',
              attributes: {
                exclude: ['id', 'createdAt', 'updatedAt'],
              },
            },
            {
              model: db.StatusProduct,
              as: 'status',
              attributes: {
                exclude: ['id', 'createdAt', 'updatedAt'],
              },
            },
            {
              model: db.ProductPrice,
              as: 'price',
              attributes: {
                exclude: ['createdAt', 'updatedAt'],
              },
            },
          ],
        },
      });

      const data = responseTemp as unknown as Array<ProductTempAttribute>;

      const arrProduct: Array<ProductTempAttribute> = data.map(
        (item): ProductTempAttribute => item.products as ProductTempAttribute
      );

      res.status(200).json({
        message: 'GET ALL SUCCEED',
        error: false,
        dayGet: dayClient,
        data: arrProduct,
      });
    } catch (error) {
      log.error(error);
      if (error instanceof Error)
        return res.status(500).json({ message: 'ERROR FROM SERVER!!!', error: error.message });
    }
  }
}
