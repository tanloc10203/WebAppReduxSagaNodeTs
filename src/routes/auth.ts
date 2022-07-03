import { Router } from 'express';
import {
  createMember,
  login,
  logout,
  refreshToken,
  changePw,
  verifyPwChange,
} from '../controllers';
import { authorization, requireDataInput } from '../middleware';

const authRoute = Router();

authRoute.post('/register', requireDataInput, createMember);
authRoute.post('/login', requireDataInput, login);
authRoute.get('/refresh', refreshToken);
authRoute.post('/logout', authorization, logout);
authRoute.post('/forgot-password', changePw);
authRoute.post('/verify-change-password', verifyPwChange);

export default authRoute;
