export interface ITimeDiff {
  hours: number;
  min: number;
  sec: number;
  diff: number;
}

export interface ITimeDiffFormat {
  hours: string;
  min: string;
  sec: string;
  diff: number;
}

export function timeSplit(diff: number): [part: number, rest: number] {
  const part = diff % 60;
  const rest = (diff - part) / 60;
  return [part, rest];
}

export function timeDiff(diff: number): ITimeDiff {
  const [sec, rest] = timeSplit(Math.floor(diff));
  const [min, hours] = timeSplit(rest);
  return { hours, min, sec, diff };
}

export function timeDiffFormat(diff: number): ITimeDiffFormat {
  const { hours, min, sec } = timeDiff(diff);
  return {
    hours: String(hours).padStart(2, '0'),
    min: String(min).padStart(2, '0'),
    sec: String(sec).padStart(2, '0'),
    diff,
  };
}

export interface ITimeDiffExt extends ITimeDiff {
  msec: number;
}
export interface ITimeDiffFormatExt extends ITimeDiffFormat {
  msec: string;
}

export function timeDiffExt(oldTime: Date, newTime: Date): ITimeDiffExt {
  const delta = newTime.getTime() - oldTime.getTime();
  const msec = delta % 1000;
  return { ...timeDiff((delta - msec) / 1000), msec };
}

export function timeDiffExtFormat(
  oldTime: Date,
  newTime: Date
): ITimeDiffFormatExt {
  const { msec, diff } = timeDiffExt(oldTime, newTime);
  return {
    ...timeDiffFormat(diff),
    msec: String(msec).padStart(3, '0'),
  };
}
