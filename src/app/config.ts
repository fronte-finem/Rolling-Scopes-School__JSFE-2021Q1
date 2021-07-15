// placeholder

export const PLACEHOLDER = 'placeholder';

const PLACEHOLDER_IMAGE = './placeholder/image.svg';
const PLACEHOLDER_AUDIO = './placeholder/audio.mp3';

const getUrl = (placeholderUrl: string) => (url: string) =>
  url === PLACEHOLDER ? placeholderUrl : url;

export const getImageUrl = getUrl(PLACEHOLDER_IMAGE);
export const getAudioUrl = getUrl(PLACEHOLDER_AUDIO);
