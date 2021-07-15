import { Router } from 'express';

import { login, logout, tokenVerified } from '../controllers/auth';
import { verifyToken } from '../middlewares/auth';

const authRouter = Router();

authRouter.post('/login', login);

authRouter.get('/logout', logout);

authRouter.get('/check-token', [verifyToken], tokenVerified);

export { authRouter };
