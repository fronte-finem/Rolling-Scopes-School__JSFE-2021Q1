const audio = new Audio();

export const playAudio = (src: string): void => {
  if (audio.src !== src) audio.src = src;
  audio.currentTime = 0;
  void audio.play();
};
