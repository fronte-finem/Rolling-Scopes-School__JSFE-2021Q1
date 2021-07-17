import { Request, Response } from 'express';

import { Category, CategoryModel } from '../models/category';
import { WordModel } from '../models/word';

export async function getCategories(request: Request, response: Response): Promise<Response> {
  try {
    const categories = await CategoryModel.find().lean();
    return response.status(200).json(categories);
  } catch (error) {
    return response.status(500).send(error);
  }
}

export async function getCategory(request: Request, response: Response): Promise<Response> {
  const categoryId = request.params.id;
  if (!categoryId) {
    return response.sendStatus(422);
  }
  try {
    const category = await CategoryModel.findById(categoryId).lean();
    if (!category) return response.sendStatus(404);
    return response.status(200).json(category);
  } catch (error) {
    return response.status(500).send(error);
  }
}

export async function createCategory(request: Request, response: Response): Promise<Response> {
  try {
    const data = request.body as Category;
    if (data.name) {
      const category = await CategoryModel.create(data);
      const newCategory = await category.save();
      return response.status(200).json(newCategory);
    }
    return response.sendStatus(422);
  } catch (error) {
    return response.status(500).send(error);
  }
}

export async function updateCategory(request: Request, response: Response): Promise<Response> {
  const categoryId = request.params.id;
  if (!categoryId) {
    return response.sendStatus(422);
  }
  try {
    const data = request.body as Category;
    const category = await CategoryModel.findByIdAndUpdate(categoryId, data, { new: true }).lean();
    if (!category) return response.sendStatus(404);
    return response.status(200).json(category);
  } catch (error) {
    return response.status(500).send(error);
  }
}

export async function deleteCategory(request: Request, response: Response): Promise<Response> {
  const categoryId = request.params.id;
  if (!categoryId) {
    return response.sendStatus(422);
  }
  try {
    const category = await CategoryModel.findById(categoryId);
    if (!category) return response.sendStatus(404);
    await WordModel.deleteMany({ category });
    await category.remove();
    return response.sendStatus(200);
  } catch (error) {
    return response.status(500).send(error);
  }
}
