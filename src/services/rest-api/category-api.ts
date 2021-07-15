import { Category, CategoryClass } from '@server/models/category';
import axios, { AxiosResponse } from 'axios';

import { authHeader } from 'services/admin/auth';

const API_URL = 'http://localhost:5000/api/category';

export type CategoryDocument = CategoryClass & { _id: string };
export type CategoryResponse = AxiosResponse<CategoryDocument>;

export interface CategoryCardData {
  category: CategoryDocument;
  words: number;
}
export type CategoryCardDataArray = Array<CategoryCardData>;

class CategoryApiService {
  public getAllCancelable = () => {
    const cancelSource = axios.CancelToken.source();
    return {
      cancel: () => cancelSource.cancel('get categories canceled'),
      getCategories: (): Promise<AxiosResponse<CategoryCardDataArray>> => {
        return axios.get<CategoryCardDataArray>(API_URL, { cancelToken: cancelSource.token });
      },
    };
  };

  public getAll = (): Promise<AxiosResponse<CategoryCardDataArray>> => {
    return axios.get<CategoryCardDataArray>(API_URL);
  };

  public getOne = (categoryId: string): Promise<CategoryResponse> => {
    const url = `${API_URL}/${categoryId}`;
    return axios.get<CategoryDocument>(url);
  };

  public create = (category: Category): Promise<CategoryResponse> => {
    const headers = authHeader();
    return axios.post<CategoryDocument>(API_URL, category, { headers });
  };

  public update = (category: CategoryDocument): Promise<CategoryResponse> => {
    const url = `${API_URL}/${category._id}`;
    const headers = authHeader();
    return axios.put<CategoryDocument>(url, category, { headers });
  };

  public remove = (category: CategoryDocument): Promise<unknown> => {
    const url = `${API_URL}/${category._id}`;
    const headers = authHeader();
    return axios.delete(url, { headers });
  };
}

export const categoryApiService = new CategoryApiService();
