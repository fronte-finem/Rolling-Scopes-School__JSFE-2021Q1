import { Request, Response } from 'express';

import { Category, CategoryModel } from '../models/category';
import { WordModel } from '../models/word';
import { HttpStatusCode } from '../shared/http-status';

export async function getCategories(request: Request, response: Response): Promise<Response> {
  try {
    const categories = await CategoryModel.find().lean();
    return response.status(HttpStatusCode.OK).json(categories);
  } catch (error) {
    return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error);
  }
}

export async function createCategory(request: Request, response: Response): Promise<Response> {
  try {
    const data = request.body as Category;
    if (data.name) {
      const category = await CategoryModel.create(data);
      const newCategory = await category.save();
      return response.status(HttpStatusCode.OK).json(newCategory);
    }
    return response.sendStatus(HttpStatusCode.UNPROCESSABLE_ENTITY);
  } catch (error) {
    return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error);
  }
}

export async function updateCategory(request: Request, response: Response): Promise<Response> {
  const categoryId = request.params.id;
  if (!categoryId) {
    return response.sendStatus(HttpStatusCode.UNPROCESSABLE_ENTITY);
  }
  try {
    const data = request.body as Category;
    const category = await CategoryModel.findByIdAndUpdate(categoryId, data, { new: true }).lean();
    if (!category) return response.sendStatus(HttpStatusCode.NOT_FOUND);
    return response.status(HttpStatusCode.OK).json(category);
  } catch (error) {
    return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error);
  }
}

export async function deleteCategory(request: Request, response: Response): Promise<Response> {
  const categoryId = request.params.id;
  if (!categoryId) {
    return response.sendStatus(HttpStatusCode.UNPROCESSABLE_ENTITY);
  }
  try {
    const category = await CategoryModel.findById(categoryId);
    if (!category) return response.sendStatus(HttpStatusCode.NOT_FOUND);
    await WordModel.deleteMany({ category });
    await category.remove();
    return response.sendStatus(HttpStatusCode.OK);
  } catch (error) {
    return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error);
  }
}
