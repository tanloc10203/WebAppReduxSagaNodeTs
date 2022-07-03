import { Router } from 'express';
import { deleteMember, getAllMember } from '../controllers';
import { authorization, verifyTokenAndAdmin } from '../middleware';

const memberRoute = Router();

memberRoute.get('/', authorization, getAllMember);
memberRoute.delete('/:id', [authorization, verifyTokenAndAdmin], deleteMember);

export default memberRoute;
