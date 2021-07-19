import { action, makeObservable, observable, runInAction } from 'mobx';

import { PLACEHOLDER } from 'app/config';
import { categoryApiService, CategoryDocument } from 'services/rest-api/category-api';
import { mediaUpload } from 'services/rest-api/media-api';
import { wordApiService, WordDocument } from 'services/rest-api/word-api';
import { updateItem } from 'utils/array';

export interface WordProps {
  word: string;
  translation: string;
  image?: File;
  audio?: File;
}

export enum DataServiceState {
  PENDING = 'pending',
  DONE = 'done',
  ERROR = 'error',
}

export class DataService {
  @observable public state = DataServiceState.PENDING;
  @observable public categories: Array<CategoryDocument> = [];
  @observable public words: Array<WordDocument> = [];

  public constructor() {
    makeObservable(this);
  }

  public async init(): Promise<void> {
    runInAction(() => {
      this.state = DataServiceState.PENDING;
      this.categories = [];
      this.words = [];
    });
    try {
      const categories = (await categoryApiService.getAll()).data;
      const words = (await wordApiService.getAll()).data;
      runInAction(() => {
        this.state = DataServiceState.DONE;
        this.categories = categories;
        this.words = words;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.state = DataServiceState.ERROR;
      });
    }
  }

  @action private onCreateCategory(category: CategoryDocument): void {
    this.categories = [...this.categories, category];
  }

  @action private onUpdateCategory(category: CategoryDocument): void {
    this.categories = updateItem(this.categories, category, (x) => (y) => x._id === y._id);
  }

  @action private onDeleteCategory(categoryId: string): void {
    this.categories = this.categories.filter((category) => category._id !== categoryId);
  }

  public async createCategory(name: string): Promise<void> {
    try {
      const category = (await categoryApiService.create({ name })).data;
      this.onCreateCategory(category);
    } catch (e) {
      console.log(e);
    } finally {
      console.log('end of category create request');
    }
  }

  public async updateCategory(category: CategoryDocument, name: string): Promise<void> {
    try {
      const { data } = await categoryApiService.update({ ...category, name });
      this.onUpdateCategory(data);
    } catch (e) {
      console.log(e);
    } finally {
      console.log('end of category update request');
    }
  }

  public async deleteCategory(category: CategoryDocument): Promise<void> {
    try {
      await categoryApiService.remove(category);
      this.onDeleteCategory(category._id);
    } catch (e) {
      console.log(e);
    } finally {
      console.log('end of category delete request');
    }
  }

  @action private onCreateWord(word: WordDocument): void {
    this.words = [...this.words, word];
  }

  @action private onUpdateWord(word: WordDocument): void {
    this.words = updateItem(this.words, word, (x) => (y) => x._id === y._id);
  }

  @action private onDeleteWord(wordId: string): void {
    this.words = this.words.filter((word) => word._id !== wordId);
  }

  public async createWord(
    categoryId: string,
    { image, audio, ...texts }: WordProps
  ): Promise<void> {
    try {
      const imageUrl = image && (await mediaUpload(image)).data;
      const audioUrl = audio && (await mediaUpload(audio)).data;
      const { data } = await wordApiService.create(categoryId, {
        ...texts,
        image: imageUrl || PLACEHOLDER,
        audio: audioUrl || PLACEHOLDER,
      });
      this.onCreateWord(data);
    } catch (e) {
      console.log(e);
    } finally {
      console.log('end of category create request');
    }
  }

  public async updateWord(
    categoryId: string,
    word: WordDocument,
    { image, audio, ...texts }: WordProps
  ): Promise<void> {
    try {
      const imageUrl = image && (await mediaUpload(image)).data;
      const audioUrl = audio && (await mediaUpload(audio)).data;
      const { data } = await wordApiService.update(categoryId, word._id, {
        ...texts,
        image: imageUrl || word.image,
        audio: audioUrl || word.audio,
      });
      this.onUpdateWord(data);
    } catch (e) {
      console.log(e);
    } finally {
      console.log('end of category update request');
    }
  }

  public async deleteWord(categoryId: string, wordId: string): Promise<void> {
    try {
      await wordApiService.remove(categoryId, wordId);
      this.onDeleteWord(wordId);
    } catch (e) {
      console.log(e);
    } finally {
      console.log('end of category delete request');
    }
  }

  public getWordsByCategoryId = (categoryId: string): WordDocument[] => {
    return this.words.filter((word) => String(word.category) === categoryId);
  };

  public getCategoryById = (categoryId: string): CategoryDocument | undefined => {
    return this.categories.find((category) => category._id === categoryId);
  };
}
