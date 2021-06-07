import { randomFromInterval } from './numbers-utils';

export function getVarName(variable: string): string {
  const matches = /^var\((.*)\)$/.exec(variable);
  return matches ? matches[1] : variable;
}

/**
 * @param dark flag
 * @returns h in [0,360], s in [0,1], l in [0, 0.5] or [0.5, 1]
 */
function getRandomHSL(dark = false): [h: number, s: number, l: number] {
  const modifier = dark ? 0 : 0.5;
  const h = randomFromInterval(0, 359);
  const s = Math.random();
  const l = modifier + 0.5 * Math.random();
  return [h, s, l];
}

/**
 *
 * @param h in [0,360]
 * @param s in [0,1]
 * @param l in [0,1]
 * @returns r,g,b in [0,1]
 */
function hsl2rgb(h: number, s: number, l: number): [r: number, g: number, b: number] {
  const a = s * Math.min(l, 1 - l);

  const f = (n: number, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  return [f(0), f(8), f(4)];
}

/**
 * @param r in [0,1]
 * @param g in [0,1]
 * @param b in [0,1]
 * @returns hex-color
 */
function rgb2hex(r: number, g: number, b: number) {
  return `#${[r, g, b]
    .map((x) =>
      Math.round(x * 255)
        .toString(16)
        .padStart(2, '0')
    )
    .join('')}`;
}

export function getRandomColor(dark = false): string {
  const [h, s, l] = getRandomHSL(dark);
  const [r, g, b] = hsl2rgb(h, s, l);
  return rgb2hex(r, g, b);
}
