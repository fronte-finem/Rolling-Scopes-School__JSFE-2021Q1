import { Router } from 'express';

import { login, tokenVerified } from '../controllers/auth';
import { verifyToken } from '../middlewares/auth';

const authRouter = Router();

enum AuthRoute {
  LOGIN = '/login',
  CHECK_TOKEN = '/check-token',
}

authRouter.post(AuthRoute.LOGIN, login);

authRouter.get(AuthRoute.CHECK_TOKEN, [verifyToken], tokenVerified);

export { authRouter };
