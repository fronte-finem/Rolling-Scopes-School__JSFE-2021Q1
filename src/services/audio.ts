import { Maybe } from 'types/abstract';

export async function playAudio(src?: Maybe<string>): Promise<void> {
  if (!src) return Promise.resolve();
  const audio = new Audio();
  if (audio.src !== src) audio.src = src;
  audio.currentTime = 0;
  await audio.play();
  return new Promise((resolve) => {
    audio.onended = () => resolve();
  });
}
