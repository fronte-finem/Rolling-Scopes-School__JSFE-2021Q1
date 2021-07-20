import { RestApiResponse } from 'services/rest-api/axios-response';
import { axiosAuth } from 'services/rest-api/axios-wrapper';
import { BACKEND_API_URL } from 'services/rest-api/config';

const API_URL = `${BACKEND_API_URL}/api/media/upload`;

export async function mediaUpload(media: File): Promise<RestApiResponse<string>> {
  const formData = new FormData();
  formData.append('media', media, media.name);
  return axiosAuth({ url: API_URL, method: 'POST', data: formData });
}

export const PLACEHOLDER = 'placeholder';

const PLACEHOLDER_IMAGE = './placeholder/placeholder.svg';
const PLACEHOLDER_AUDIO = './placeholder/placeholder.mp3';

const getUrl = (placeholderUrl: string) => (url: string) =>
  url === PLACEHOLDER ? placeholderUrl : url;

export const getImageUrl = getUrl(PLACEHOLDER_IMAGE);
export const getAudioUrl = getUrl(PLACEHOLDER_AUDIO);
