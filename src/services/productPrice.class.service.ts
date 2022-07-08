import { Request, Response } from 'express';
import { FindAttributeOptions, Model, ModelCtor } from 'sequelize/types';
import { CommonController } from '../class';
import { db } from '../config/db';
import log from '../logger';
import { ProductPriceAttribute } from '../models/productprice.model';
import { StatusProductAttribute } from '../models/statusproduct.model';
import { TimeChangeAttribute } from '../models/timechange.modle';

export class ProductPrice extends CommonController {
  constructor(Db: ModelCtor<Model<any, any>>) {
    super(Db);
  }

  // @Override
  public async create(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> {
    try {
      const { price, productId } = req.body;

      if (!price || !productId)
        return res.status(404).json({ message: 'Missing parameter !', error: true });

      const response = await super.handleFind({
        where: { productId },
        raw: true,
      });

      if (response) return res.status(404).json({ message: 'Price was exist !!!', error: true });

      const timeChange: TimeChangeAttribute = (
        await db.TimeChange.create({
          time: new Date(),
        })
      ).get();

      const newResponse = await super.handleCreate<ProductPriceAttribute>({
        ...req.body,
        price,
        productId: productId,
        timeChangeId: timeChange.id as number,
      });

      res.status(200).json({ message: 'Create row succeed.', error: false, data: newResponse });
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
