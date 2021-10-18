import { Maybe } from 'types/abstract';

export function playAudio(src?: Maybe<string>): void {
  if (!src) return;
  const audio = new Audio();
  audio.src = src;
  void audio.play();
}

export async function playAudioAsync(src?: Maybe<string>): Promise<void> {
  if (!src) return Promise.resolve();
  const audio = new Audio();
  audio.src = src;
  await audio.play();
  return new Promise((resolve) => {
    audio.onended = () => resolve();
  });
}

type Cancel = () => void;
type PlayAudioCancelable = readonly [promise: Promise<void>, cancel: Cancel];

export function playAudioCancelable(src?: Maybe<string>): Cancel {
  if (!src) return () => {};
  let audio: null | HTMLAudioElement = new Audio();
  audio.src = src;
  void audio.play();
  return () => {
    audio?.pause();
    audio = null;
  };
}

export function playAudioAsyncCancelable(src?: Maybe<string>): PlayAudioCancelable {
  let cancel: Cancel = () => {};
  if (!src) return [Promise.resolve(), cancel] as const;
  let audio: null | HTMLAudioElement = null;
  const cleanup = (resolve: () => void) => () => {
    audio && (audio.onended = null);
    audio?.pause();
    audio = null;
    resolve();
  };
  const promise = new Promise<void>((resolve) => {
    cancel = cleanup(resolve);
    audio = new Audio();
    audio.src = src;
    audio.onended = () => resolve();
    void audio.play();
  });
  return [promise, cancel] as const;
}
