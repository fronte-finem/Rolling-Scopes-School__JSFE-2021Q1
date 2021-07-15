import { NextFunction, Request, Response, Router } from 'express';

import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from '../controllers/category';
import { verifyToken } from '../middlewares/auth';
import { wordRouter } from './word';

const categoryRouter = Router();

categoryRouter.get('/', getCategories);
categoryRouter.get('/:id', getCategory);
categoryRouter.post('/', [verifyToken], createCategory);
categoryRouter.put('/:id', [verifyToken], updateCategory);
categoryRouter.delete('/:id', [verifyToken], deleteCategory);

categoryRouter.use('/:id/word', toWordRouter, wordRouter);

function toWordRouter(request: Request, response: Response, next: NextFunction): void {
  response.locals.categoryId = request.params.id;
  next();
}

export { categoryRouter };
