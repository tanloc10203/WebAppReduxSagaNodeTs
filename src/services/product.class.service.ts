import { Request, Response } from 'express';
import { Model, ModelCtor } from 'sequelize/types';
import { CommonController } from '../class';
import log from '../logger';
import { StatusProductAttribute } from '../models/statusproduct.model';

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

      console.log({ name, slug, statusPId, categoryId });

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
      const { name, key } = req.body;
      const id = parseInt(req.params.id);

      if (!name || !key || !id)
        return res.status(404).json({ message: 'Missing parameter !', error: true });

      const response = await super.handleUpdate<StatusProductAttribute>(id, { name, key });

      if (response[0] === 0)
        return res.status(400).json({ message: 'ID was not found !', error: true });

      res.status(200).json({ message: 'Update succeed.', error: false });
    } catch (error) {
      log.error(error);
      if (error instanceof Error)
        return res.status(500).json({ message: 'ERROR FROM SERVER!!!', error: error.message });
    }
  }
}
