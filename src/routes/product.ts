import { Router } from 'express';
import { productController } from '../controllers';

const productRoute = Router();

productRoute.post('/', productController.create);
productRoute.get('/', productController.getAll);
productRoute.get('/collections', productController.getCollections);
productRoute.get('/:id', productController.getById);
productRoute.get('/slug/:slug', productController.getBySlug);
productRoute.patch('/:id', productController.update);
productRoute.delete('/:id', productController.delete);

export default productRoute;
