import { CAR_EMPTY_ID, CarCSSVar } from 'components/car';
import { getRandomColor } from 'shared/css-utils';

import styles from './style.module.scss';

export const addBug = (): string =>
  `<span class="${
    styles.bug
  }" style="--flicker-delay:${Math.random()}s; --color:${getRandomColor()}">&lt;BUG&gt;</span>`;

const title = `<h1 class="${styles.title}">Async ${addBug()} Race</h1>`;

const greet = `
  <h2 class="${styles.greet}">Welcome fellow 
    <a class="${styles.link}" href="https://github.com/rolling-scopes-school/tasks/blob/master/tasks/async-race.md">async-racers</a>!
   😁
  </h2>`;

const remind = `
  <p class="${styles.remind}">To participate in the race, you need to start the
    <a class="${styles.link}" href="https://github.com/mikhama/async-race-api">server</a>.
  </p>`;

const features = `
  <div class="${styles.features}">
    <h3 class="${styles.featuresTitle}">Suported features:</h3>
    <ul class="${styles.featuresList}">
      <li class="${styles.featuresItem}">Create custom ${addBug()}</li>
      <li class="${styles.featuresItem}">For select ${addBug()} juct click it 😉</li>
      <li class="${styles.featuresItem}">Update ${addBug()}'s name and color</li>
      <li class="${styles.featuresItem}">Delete ${addBug()} or entire page with ${addBug()}s</li>
      <li class="${styles.featuresItem}">Generate a hundred of random ${addBug()}s in one click</li>
      <li class="${styles.featuresItem}">Navigate through the pages</li>
      <li class="${styles.featuresItem}">Test ${addBug()} in run-mode</li>
      <li class="${styles.featuresItem}">Start/reset race for current page</li>
      <li class="${
        styles.featuresItem
      }">The winner ${addBug()} of the race goes to the Records Tab</li>
      <li class="${styles.featuresItem}">You can sort winners by time or wins-count</li>
      <li class="${
        styles.featuresItem
      }">Tired of describing, maybe I forgot to mention something... 😅</li>
    </ul>
  </div>
`;

export const BLOCKS = {
  title,
  greet,
  remind,
  features,
};

export const RANDOM_CAR_DTO = { id: CAR_EMPTY_ID, name: '', color: getRandomColor() };

export const TO_RUN_STATE: [cssvar: CarCSSVar, value: string][] = [
  [CarCSSVar.LEG_TIME, `500ms`],
  [CarCSSVar.EYE_TIME, '3s'],
  [CarCSSVar.EYE_DELAY, '0'],
  [CarCSSVar.BODY_TIME, `500ms`],
  [CarCSSVar.BODY_DELAY, '0'],
];
