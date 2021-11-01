import { Router } from 'express';

import { createWord, deleteWord, getWords, updateWord } from '../controllers/word';
import { verifyToken } from '../middlewares/auth';

const wordRouter = Router();

enum WordRoute {
  BASE = '/',
  BY_ID = '/:id',
}

wordRouter.get(WordRoute.BASE, getWords);
wordRouter.post(WordRoute.BASE, [verifyToken], createWord);
wordRouter.put(WordRoute.BY_ID, [verifyToken], updateWord);
wordRouter.delete(WordRoute.BY_ID, [verifyToken], deleteWord);

export { wordRouter };
