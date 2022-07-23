import { Request, Response } from 'express';
import { Attributes, FindOptions, Model, ModelCtor } from 'sequelize/types';
import { CommonController } from '../class';
import { db } from '../config/db';
import log from '../logger';
import { CategoryAttribute } from '../models/category.model';
import { FilterPayload } from '../utils';

export class ProductImage extends CommonController {
  constructor(Db: ModelCtor<Model<any, any>>) {
    super(Db);
  }

  // @Override
  public async create(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> {
    try {
      const { productId, data } = req.body;

      if (!productId) return res.status(404).json({ message: 'Missing parameter !', error: true });

      const response = await super.handleBulkCreate<ProductImage>(data);

      res
        .status(200)
        .json({ message: 'Create row succeed.', error: false, data: response, productId });
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
      const name_order = req.query.name_order as string;
      const name_like = req.query.name_like as string;

      const _limit = parseInt(req.query._limit as string);
      let _page = parseInt(req.query._page as string);

      _page = _page < 0 ? (_page = 0) : _page;

      if (!_limit && !_page && !_order && !name_order && !name_like) {
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
        name_query: 'thumb',
        name_order,
        _order,
        name_like,
      };

      const response = await super.handleGetAllAndFilter(filter);

      res.status(200).json({
        message: 'GET ALL SUCCEED',
        error: false,
        data: response.rows,
        pagination: { _limit: _limit, _page: _page, _totalRows: response.count },
      });
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
      const { productId } = req.body;
      const id = parseInt(req.params.id);

      if (!productId) return res.status(404).json({ message: 'Missing parameter !', error: true });

      const response = await super.handleUpdate<ProductImage>(id, { ...req.body });

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
  public async delete(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> {
    try {
      const id = parseInt(req.params.id);

      const response = await super.handleDelete(id);

      if (!response) return res.status(400).json({ message: 'ID was not found !', error: true });

      res.status(200).json({ message: `Id '${id}' was deleted`, error: false });
    } catch (error) {
      log.error(error);
      if (error instanceof Error)
        return res.status(500).json({ message: 'ERROR FROM SERVER!!!', error: error.message });
    }
  }
}
