import { Request, Response } from 'express';

import { CategoryModel } from '../models/category';
import { Word, WordModel } from '../models/word';

export async function getWords(request: Request, response: Response): Promise<Response> {
  try {
    const { categoryId } = response.locals;
    if (categoryId) {
      const category = await CategoryModel.findById(categoryId).lean();
      if (!category) return response.sendStatus(404);
      const words = await WordModel.find({ category }).lean();
      return response.status(200).json(words);
    }
    const words = await WordModel.find().lean();
    return response.status(200).json(words);
  } catch (error) {
    return response.status(500).send(error);
  }
}

export async function getWord(request: Request, response: Response): Promise<Response> {
  try {
    const { categoryId } = response.locals;
    const category = await CategoryModel.findById(categoryId).lean();
    if (!category) return response.sendStatus(404);
    const word = await WordModel.findOne({ category }).lean();
    return word ? response.status(200).json(word) : response.sendStatus(404);
  } catch (error) {
    return response.status(500).send(error);
  }
}

export async function createWord(request: Request, response: Response): Promise<Response> {
  try {
    const { categoryId } = response.locals;
    const category = await CategoryModel.findById(categoryId).lean();
    if (!category) return response.sendStatus(404);
    const data = request.body as Word;
    const newWord = await WordModel.create({ ...data, category });
    const word = await WordModel.findById(newWord._id).lean();
    return response.status(200).json(word);
  } catch (error) {
    return response.status(500).send(error);
  }
}

export async function updateWord(request: Request, response: Response): Promise<Response> {
  try {
    const { categoryId } = response.locals;
    const category = await CategoryModel.findById(categoryId).lean();
    if (!category) return response.sendStatus(404);
    const { id } = request.params;
    const data = request.body as Word;
    const word = await WordModel.findByIdAndUpdate(id, { ...data, category }, { new: true }).lean();
    if (!word) return response.sendStatus(404);
    return response.status(200).json(word);
  } catch (error) {
    return response.status(500).send(error);
  }
}

export async function deleteWord(request: Request, response: Response): Promise<Response> {
  try {
    const { categoryId } = response.locals;
    const category = await CategoryModel.findById(categoryId).lean();
    if (!category) return response.sendStatus(404);
    const { id } = request.params;
    const word = await WordModel.findByIdAndRemove(id).lean();
    return response.sendStatus(word ? 200 : 404);
  } catch (error) {
    return response.status(500).send(error);
  }
}
