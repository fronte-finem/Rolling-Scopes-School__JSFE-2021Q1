import { getModelForClass, prop } from '@typegoose/typegoose';

export interface Category {
  name: string;
}

export class CategoryClass implements Category {
  @prop({ required: true, unique: true })
  public name!: string;
}

export const CategoryModel = getModelForClass(CategoryClass);
