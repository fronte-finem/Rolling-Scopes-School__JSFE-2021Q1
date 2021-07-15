import { Router } from 'express';

import { createWord, deleteWord, getWord, getWords, updateWord } from '../controllers/word';
import { verifyToken } from '../middlewares/auth';

const wordRouter = Router();

wordRouter.get('/', getWords);
wordRouter.get('/one', getWord);
wordRouter.post('/', [verifyToken], createWord);
wordRouter.put('/:id', [verifyToken], updateWord);
wordRouter.delete('/:id', [verifyToken], deleteWord);

export { wordRouter };
