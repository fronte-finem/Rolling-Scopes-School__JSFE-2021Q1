import { RestApiResponse } from 'services/rest-api/axios-response';
import { axiosAuth } from 'services/rest-api/axios-wrapper';
import { BACKEND_API_URL } from 'services/rest-api/config';

const API_URL = `${BACKEND_API_URL}/api/media/upload`;

export async function mediaUpload(media: File): Promise<RestApiResponse<string>> {
  const formData = new FormData();
  formData.append('media', media, media.name);
  return axiosAuth({ url: API_URL, method: 'POST', data: formData });
}
