import { action, computed, makeObservable, observable, runInAction } from 'mobx';

import { RestApiError, RestApiResponse } from 'services/rest-api/axios-response';
import { categoryApiService } from 'services/rest-api/category-api';
import { CategoryDocument, WordDocument } from 'services/rest-api/config';
import { mediaUpload, PLACEHOLDER } from 'services/rest-api/media-api';
import { wordApiService } from 'services/rest-api/word-api';
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

type MediaUploadResult = Promise<RestApiResponse<{ image?: string; audio?: string }>>;
type RestApiWordResponse = Promise<RestApiResponse<WordDocument>>;

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

  @computed public get isPending(): boolean {
    return this.state === DataServiceState.PENDING;
  }

  @computed public get isDone(): boolean {
    return this.state === DataServiceState.DONE;
  }

  @computed public get isError(): boolean {
    return this.state === DataServiceState.ERROR;
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

  public async createCategory(name: string): Promise<RestApiResponse<CategoryDocument>> {
    const result = await categoryApiService.create({ name });
    if (result.data) {
      this.onCreateCategory(result.data);
    }
    return result;
  }

  public async updateCategory(
    category: CategoryDocument,
    name: string
  ): Promise<RestApiResponse<CategoryDocument>> {
    const result = await categoryApiService.update({ ...category, name });
    if (result.data) {
      this.onUpdateCategory(result.data);
    }
    return result;
  }

  public async deleteCategory(category: CategoryDocument): Promise<RestApiResponse<string>> {
    const result = await categoryApiService.remove(category);
    if (!result.isError) {
      this.onDeleteCategory(category._id);
    }
    return result;
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

  private uploadMedia = async ({ image, audio }: WordProps): MediaUploadResult => {
    const resultImage = image && (await mediaUpload(image));
    if (resultImage?.isError) return resultImage as RestApiError;
    const resultAudio = audio && (await mediaUpload(audio));
    if (resultAudio?.isError) return resultAudio as RestApiError;
    return {
      data: {
        image: resultImage?.data,
        audio: resultAudio?.data,
      },
    };
  };

  public async createWord(categoryId: string, wordProps: WordProps): RestApiWordResponse {
    const resultUpload = await this.uploadMedia(wordProps);
    if (resultUpload?.isError) return resultUpload as RestApiError;
    const result = await wordApiService.create(categoryId, {
      ...wordProps,
      image: resultUpload.data?.image || PLACEHOLDER,
      audio: resultUpload.data?.audio || PLACEHOLDER,
    });
    if (result.data) {
      this.onCreateWord(result.data);
    }
    return result;
  }

  public async updateWord(
    categoryId: string,
    word: WordDocument,
    wordProps: WordProps
  ): RestApiWordResponse {
    const resultUpload = await this.uploadMedia(wordProps);
    if (resultUpload?.isError) return resultUpload as RestApiError;
    const result = await wordApiService.update(categoryId, word._id, {
      ...wordProps,
      image: resultUpload.data?.image || word.image,
      audio: resultUpload.data?.audio || word.audio,
    });
    if (result.data) {
      this.onUpdateWord(result.data);
    }
    return result;
  }

  public async deleteWord(categoryId: string, wordId: string): Promise<RestApiResponse<string>> {
    const result = await wordApiService.remove(categoryId, wordId);
    if (!result.isError) {
      this.onDeleteWord(wordId);
    }
    return result;
  }

  public getWordsByCategoryId = (categoryId: string): WordDocument[] => {
    return this.words.filter((word) => String(word.category) === categoryId);
  };

  public getCategoryById = (categoryId: string): CategoryDocument | undefined => {
    return this.categories.find((category) => category._id === categoryId);
  };
}
