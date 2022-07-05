import { Request, Response } from 'express';
import { Model, ModelCtor } from 'sequelize/types';
import log from '../logger';
import { FilterPayload } from '../utils';
import { DbQuery } from './DbQuery.class';

export abstract class CommonController extends DbQuery {
  constructor(Db: ModelCtor<Model<any, any>>) {
    super(Db);
  }

  public abstract create(req: Request, res: Response): void;
  public abstract update(req: Request, res: Response): void;

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

      const response = await super.handleGetAllAndFilter(filter);

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

  public async getById(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> {
    try {
      const id = parseInt(req.params.id);

      const response = await super.handleGetById(id);
      if (!response) return res.status(400).json({ message: 'ID was not found !', error: true });

      res.status(200).json({ message: 'Get row by id succeed.', error: false, data: response });
    } catch (error) {
      log.error(error);
      if (error instanceof Error)
        return res.status(500).json({ message: 'ERROR FROM SERVER!!!', error: error.message });
    }
  }

  public async delete(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> {
    try {
      const id = parseInt(req.params.id);
      res.status(200).json({ message: `Id '${id}' was deleted`, error: false });
    } catch (error) {
      log.error(error);
      if (error instanceof Error)
        return res.status(500).json({ message: 'ERROR FROM SERVER!!!', error: error.message });
    }
  }
}
