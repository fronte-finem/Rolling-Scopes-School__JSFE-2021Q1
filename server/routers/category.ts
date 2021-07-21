import { NextFunction, Request, Response, Router } from 'express';

import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from '../controllers/category';
import { verifyToken } from '../middlewares/auth';
import { wordRouter } from './word';

const categoryRouter = Router();

enum CategoryRoute {
  BASE = '/',
  BY_ID = '/:id',
  WORDS = '/:id/word',
}

categoryRouter.get(CategoryRoute.BASE, getCategories);
categoryRouter.post(CategoryRoute.BASE, [verifyToken], createCategory);
categoryRouter.put(CategoryRoute.BY_ID, [verifyToken], updateCategory);
categoryRouter.delete(CategoryRoute.BY_ID, [verifyToken], deleteCategory);

categoryRouter.use(CategoryRoute.WORDS, toWordRouter, wordRouter);

function toWordRouter(request: Request, response: Response, next: NextFunction): void {
  response.locals.categoryId = request.params.id;
  next();
}

export { categoryRouter };
