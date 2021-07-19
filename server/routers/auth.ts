import { Router } from 'express';

import { login, tokenVerified } from '../controllers/auth';
import { verifyToken } from '../middlewares/auth';

const authRouter = Router();

authRouter.post('/login', login);

authRouter.get('/check-token', [verifyToken], tokenVerified);

export { authRouter };
