import { Word } from '@server/models/word';
import axios, { AxiosResponse } from 'axios';

import { RestApiResponse } from 'services/rest-api/axios-response';
import { axiosAuth, axiosCancelWrapper, CancelableRequest } from 'services/rest-api/axios-wrapper';
import { BACKEND_API_URL, WordDocument } from 'services/rest-api/config';

const API_URL = `${BACKEND_API_URL}/api`;
const API_URL_CATEGORY = `${API_URL}/category`;
const API_URL_WORDS = `${API_URL}/words`;
const WORD = 'word';

const getUrl = (categoryId: string, wordId?: string) => {
  return `${API_URL_CATEGORY}/${categoryId}/${WORD}${wordId ? `/${wordId}` : ''}`;
};

type AxiosWordsResponse = Promise<AxiosResponse<WordDocument[]>>;
type RestApiWordResponse = Promise<RestApiResponse<WordDocument>>;
type RestApiStringResponse = Promise<RestApiResponse<string>>;

class WordApiService {
  public getAllCancelable = (categoryId?: string): CancelableRequest<WordDocument[]> => {
    const url = categoryId ? getUrl(categoryId) : API_URL_WORDS;
    return axiosCancelWrapper({ url, method: 'GET' });
  };

  public getAll = (categoryId?: string): AxiosWordsResponse => {
    return axios.get(categoryId ? getUrl(categoryId) : API_URL_WORDS);
  };

  public create = (categoryId: string, word: Word): RestApiWordResponse => {
    return axiosAuth({ url: getUrl(categoryId), method: 'POST', data: word });
  };

  public update = (categoryId: string, wordId: string, word: Word): RestApiWordResponse => {
    return axiosAuth({ url: getUrl(categoryId, wordId), method: 'PUT', data: word });
  };

  public remove = (categoryId: string, wordId: string): RestApiStringResponse => {
    return axiosAuth({ url: getUrl(categoryId, wordId), method: 'DELETE' });
  };
}

export const wordApiService = new WordApiService();
