// placeholder

export const PLACEHOLDER = 'placeholder';

const PLACEHOLDER_IMAGE = './placeholder/placeholder.svg';
const PLACEHOLDER_AUDIO = './placeholder/placeholder.mp3';

const getUrl = (placeholderUrl: string) => (url: string) =>
  url === PLACEHOLDER ? placeholderUrl : url;

export const getImageUrl = getUrl(PLACEHOLDER_IMAGE);
export const getAudioUrl = getUrl(PLACEHOLDER_AUDIO);
