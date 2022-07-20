import { Request, Response } from 'express';
import { db } from '../config/db';
import { Product } from '../services';

export const productController = {
  db: new Product(db.Product),

  create(req: Request, res: Response) {
    return productController.db.create(req, res);
  },

  getAll(req: Request, res: Response) {
    return productController.db.getAll(req, res);
  },

  getById(req: Request, res: Response) {
    return productController.db.getById(req, res);
  },

  getCollections(req: Request, res: Response) {
    return productController.db.getCollections(req, res);
  },

  update(req: Request, res: Response) {
    return productController.db.update(req, res);
  },

  delete(req: Request, res: Response) {
    return productController.db.delete(req, res);
  },
};
