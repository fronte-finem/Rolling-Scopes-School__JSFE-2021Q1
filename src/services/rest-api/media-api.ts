import axios, { AxiosResponse } from 'axios';

import { authHeader } from 'services/admin/auth';

const API_URL = 'http://localhost:5000/api/media/upload';

export async function mediaUpload(media: File): Promise<AxiosResponse<string>> {
  const headers = authHeader();
  const formData = new FormData();
  formData.append('media', media, media.name);
  const res = await axios.post<string>(API_URL, formData, { headers });
  console.log(res);
  return res;
}
