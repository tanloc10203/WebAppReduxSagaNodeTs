import { Router } from 'express';
import { categoryController } from '../controllers';

const categoryRoute = Router();

categoryRoute.post('/', categoryController.create);
categoryRoute.get('/', categoryController.getAll);
categoryRoute.patch('/:id', categoryController.update);
categoryRoute.delete('/:id', categoryController.delete);
categoryRoute.get('/:id', categoryController.getById);

export default categoryRoute;
