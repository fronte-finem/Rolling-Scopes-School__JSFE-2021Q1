import { Category, CategoryClass } from '@server/models/category';
import axios, { AxiosResponse } from 'axios';

import { authHeader } from 'services/rest-api/auth';
import { CURRENT_API_URL } from 'services/rest-api/config';

const API_URL = `${CURRENT_API_URL}/api/category`;

export type CategoryDocument = CategoryClass & { _id: string };
export type CategoryResponse = AxiosResponse<CategoryDocument>;

class CategoryApiService {
  public getAllCancelable = () => {
    const cancelSource = axios.CancelToken.source();
    return {
      cancel: () => cancelSource.cancel('get categories canceled'),
      getCategories: (): Promise<AxiosResponse<CategoryDocument[]>> => {
        return axios.get<CategoryDocument[]>(API_URL, { cancelToken: cancelSource.token });
      },
    };
  };

  public getAll = (): Promise<AxiosResponse<CategoryDocument[]>> => {
    return axios.get<CategoryDocument[]>(API_URL);
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
