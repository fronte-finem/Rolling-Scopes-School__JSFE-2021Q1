import { Category } from '@server/models/category';
import axios, { AxiosResponse } from 'axios';

import { RestApiResponse } from 'services/rest-api/axios-response';
import { axiosAuth, axiosCancelWrapper, CancelableRequest } from 'services/rest-api/axios-wrapper';
import { BACKEND_API_URL, CategoryDocument } from 'services/rest-api/config';

const API_URL = `${BACKEND_API_URL}/api/category`;

type AxiosCategoriesResponse = Promise<AxiosResponse<CategoryDocument[]>>;
type RestApiCategoryResponse = Promise<RestApiResponse<CategoryDocument>>;
type RestApiStringResponse = Promise<RestApiResponse<string>>;

class CategoryApiService {
  public getAllCancelable = (): CancelableRequest<CategoryDocument[]> => {
    return axiosCancelWrapper({ url: API_URL, method: 'GET' });
  };

  public getAll = (): AxiosCategoriesResponse => {
    return axios.get(API_URL);
  };

  public create = (category: Category): RestApiCategoryResponse => {
    return axiosAuth({ url: API_URL, method: 'POST', data: category });
  };

  public update = (category: CategoryDocument): RestApiCategoryResponse => {
    return axiosAuth({ url: `${API_URL}/${category._id}`, method: 'PUT', data: category });
  };

  public remove = (category: CategoryDocument): RestApiStringResponse => {
    return axiosAuth({ url: `${API_URL}/${category._id}`, method: 'DELETE' });
  };
}

export const categoryApiService = new CategoryApiService();
