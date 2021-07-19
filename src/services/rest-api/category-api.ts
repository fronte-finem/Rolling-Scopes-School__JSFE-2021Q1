import { Category, CategoryClass } from '@server/models/category';
import axios, { AxiosResponse } from 'axios';

import { authHeader } from 'services/rest-api/auth';
import { RestApiResponse } from 'services/rest-api/axios-response';
import { axiosWrapper } from 'services/rest-api/axios-wrapper';
import { BACKEND_API_URL } from 'services/rest-api/config';

const API_URL = `${BACKEND_API_URL}/api/category`;

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

  public create = (category: Category): Promise<RestApiResponse<CategoryDocument>> => {
    const headers = authHeader();
    return axiosWrapper(async () => {
      const { data } = await axios.post<CategoryDocument>(API_URL, category, { headers });
      return data;
    });
  };

  public update = (category: CategoryDocument): Promise<RestApiResponse<CategoryDocument>> => {
    const url = `${API_URL}/${category._id}`;
    const headers = authHeader();
    return axiosWrapper(async () => {
      const { data } = await axios.put<CategoryDocument>(url, category, { headers });
      return data;
    });
  };

  public remove = (category: CategoryDocument): Promise<RestApiResponse<string>> => {
    const url = `${API_URL}/${category._id}`;
    const headers = authHeader();
    return axiosWrapper(async () => {
      const { data } = await axios.delete<string>(url, { headers });
      return data;
    });
  };
}

export const categoryApiService = new CategoryApiService();
