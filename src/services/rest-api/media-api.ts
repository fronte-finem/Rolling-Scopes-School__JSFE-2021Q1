import axios, { AxiosResponse } from 'axios';

import { authHeader } from 'services/rest-api/auth';
import { CURRENT_API_URL } from 'services/rest-api/config';

const API_URL = `${CURRENT_API_URL}/api/media/upload`;

export async function mediaUpload(media: File): Promise<AxiosResponse<string>> {
  const headers = authHeader();
  const formData = new FormData();
  formData.append('media', media, media.name);
  const res = await axios.post<string>(API_URL, formData, { headers });
  console.log(res);
  return res;
}
