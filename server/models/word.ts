import { getModelForClass, prop, Ref } from '@typegoose/typegoose';

import { CategoryClass } from './category';

export interface Word {
  word: string;
  translation: string;
  image: string;
  audio: string;
}

export class WordClass implements Word {
  @prop({ required: true })
  public word!: string;

  @prop({ required: true })
  public translation!: string;

  @prop({ required: true })
  public image!: string;

  @prop({ required: true })
  public audio!: string;

  @prop({ ref: () => CategoryClass, required: true })
  public category: Ref<CategoryClass>;
}

export const WordModel = getModelForClass(WordClass);
