import axios, { AxiosResponse } from 'axios';

import { authHeader } from 'services/rest-api/auth';
import { RestApiResponse } from 'services/rest-api/axios-response';
import { axiosWrapper } from 'services/rest-api/axios-wrapper';
import { BACKEND_API_URL } from 'services/rest-api/config';

const API_URL = `${BACKEND_API_URL}/api/media/upload`;

export async function mediaUpload(media: File): Promise<RestApiResponse<string>> {
  const headers = authHeader();
  const formData = new FormData();
  formData.append('media', media, media.name);
  return axiosWrapper(async () => {
    const { data } = await axios.post<string>(API_URL, formData, { headers });
    return data;
  });
}
