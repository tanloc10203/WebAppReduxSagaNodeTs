import { Express, Request, Response, Router } from 'express';
import { introServer } from '../utils';
import authRoute from './auth';
import categoryRoute from './category';
import memberRoute from './member';
import productRoute from './product';
import productPriceRoute from './productPrice';
import productStatusRoute from './productStatus';

const initWebRoutes = (app: Express) => {
  app.get('/', (req: Request, res: Response) => res.status(200).json(introServer));
  app.use('/api/auth', authRoute);
  app.use('/api/member', memberRoute);
  app.use('/api/category', categoryRoute);
  app.use('/api/product', productRoute);
  app.use('/api/product-status', productStatusRoute);
  app.use('/api/product-price', productPriceRoute);

  app.use((req: Request, res: Response) => {
    if (!req.route)
      return res
        .status(404)
        .json({ error: true, message: 'Cannot PATCH ' + req.url + ', method: ' + req.method });
  });

  return app;
};

export default initWebRoutes;
