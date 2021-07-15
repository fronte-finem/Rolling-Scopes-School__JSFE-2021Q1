import { Word, WordClass } from '@server/models/word';
import axios, { AxiosResponse } from 'axios';

import { authHeader } from 'services/admin/auth';

const API_URL = 'http://localhost:5000/api';
const API_URL_CATEGORY = `${API_URL}/category`;
const API_URL_WORDS = `${API_URL}/words`;

export type WordDocument = WordClass & { _id: string };
export type WordResponse = AxiosResponse<WordDocument>;

class WordApiService {
  public getAllCancelable = (categoryId: string) => {
    const cancelSource = axios.CancelToken.source();
    return {
      cancel: () => cancelSource.cancel('get words canceled'),
      getWords: (): Promise<AxiosResponse<WordDocument[]>> => {
        const url = `${API_URL}/${categoryId}/word`;
        return axios.get<WordDocument[]>(url, { cancelToken: cancelSource.token });
      },
    };
  };

  public getAll = (categoryId?: string): Promise<AxiosResponse<WordDocument[]>> => {
    const url = categoryId ? `${API_URL_CATEGORY}/${categoryId}/word` : API_URL_WORDS;
    return axios.get<WordDocument[]>(url);
  };

  public getOne = (categoryId: string): Promise<AxiosResponse<WordDocument>> => {
    const url = `${API_URL_CATEGORY}/${categoryId}/word/one`;
    return axios.get<WordDocument>(url);
  };

  public create = (categoryId: string, word: Word): Promise<WordResponse> => {
    const url = `${API_URL_CATEGORY}/${categoryId}/word`;
    const headers = authHeader();
    return axios.post<WordDocument>(url, word, { headers });
  };

  public update = (categoryId: string, wordId: string, word: Word): Promise<WordResponse> => {
    const url = `${API_URL_CATEGORY}/${categoryId}/word/${wordId}`;
    const headers = authHeader();
    return axios.put<WordDocument>(url, word, { headers });
  };

  public remove = (categoryId: string, wordId: string): Promise<unknown> => {
    const url = `${API_URL_CATEGORY}/${categoryId}/word/${wordId}`;
    const headers = authHeader();
    return axios.delete(url, { headers });
  };
}

export const wordApiService = new WordApiService();
