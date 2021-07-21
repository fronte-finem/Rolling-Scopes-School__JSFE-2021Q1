import { Request, Response } from 'express';

import { CategoryModel } from '../models/category';
import { Word, WordModel } from '../models/word';
import { HttpStatusCode } from '../shared/http-status';

export async function getWords(request: Request, response: Response): Promise<Response> {
  try {
    const { categoryId } = response.locals;
    if (categoryId) {
      const category = await CategoryModel.findById(categoryId).lean();
      if (!category) return response.sendStatus(HttpStatusCode.NOT_FOUND);
      const words = await WordModel.find({ category }).lean();
      return response.status(HttpStatusCode.OK).json(words);
    }
    const words = await WordModel.find().lean();
    return response.status(HttpStatusCode.OK).json(words);
  } catch (error) {
    return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error);
  }
}

export async function createWord(request: Request, response: Response): Promise<Response> {
  try {
    const { categoryId } = response.locals;
    const category = await CategoryModel.findById(categoryId).lean();
    if (!category) return response.sendStatus(HttpStatusCode.NOT_FOUND);
    const data = request.body as Word;
    const newWord = await WordModel.create({ ...data, category });
    const word = await WordModel.findById(newWord._id).lean();
    return response.status(HttpStatusCode.OK).json(word);
  } catch (error) {
    return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error);
  }
}

export async function updateWord(request: Request, response: Response): Promise<Response> {
  try {
    const { categoryId } = response.locals;
    const category = await CategoryModel.findById(categoryId).lean();
    if (!category) return response.sendStatus(HttpStatusCode.NOT_FOUND);
    const { id } = request.params;
    const data = request.body as Word;
    const word = await WordModel.findByIdAndUpdate(id, { ...data, category }, { new: true }).lean();
    if (!word) return response.sendStatus(HttpStatusCode.NOT_FOUND);
    return response.status(HttpStatusCode.OK).json(word);
  } catch (error) {
    return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error);
  }
}

export async function deleteWord(request: Request, response: Response): Promise<Response> {
  try {
    const { categoryId } = response.locals;
    const category = await CategoryModel.findById(categoryId).lean();
    if (!category) return response.sendStatus(HttpStatusCode.NOT_FOUND);
    const { id } = request.params;
    const word = await WordModel.findByIdAndRemove(id).lean();
    return response.sendStatus(word ? HttpStatusCode.OK : HttpStatusCode.NOT_FOUND);
  } catch (error) {
    return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error);
  }
}
