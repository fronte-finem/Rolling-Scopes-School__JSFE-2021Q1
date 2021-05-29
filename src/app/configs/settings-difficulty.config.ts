import { APP_GAME_SETTINGS } from './game.config';

import styles from '~components/settings-difficulty/settings-difficulty-view.scss';

const H2: keyof HTMLElementTagNameMap = 'h2';
const H3: keyof HTMLElementTagNameMap = 'h3';

export const SETTINGS_DIFFICULTY = {
  title: {
    tag: H2,
    classNames: [styles.title],
    text: 'Adjust the difficulty you want\r\n🥱😌🥴🤪🤯',
  },
  cardsRange: {
    title: '🎴🎴 Cards field (rows × columns)',
    classNames: [styles.range],
    values: APP_GAME_SETTINGS.cardsField,
  },
  initialShowTimeRange: {
    title: '⏱🃏 Start game countdown (seconds)',
    classNames: [styles.range],
    values: APP_GAME_SETTINGS.initialShowTime,
  },
  mismatchShowTimeRange: {
    title: '🍎🍏 Delay flip after mismatch (seconds)',
    classNames: [styles.range],
    values: APP_GAME_SETTINGS.mismatchShowTime,
  },
  scoreModifier: {
    classNames: [styles.scoreModifier],
  },
  scoreTitle: {
    tag: H3,
    classNames: [styles.scoreTitle],
    text: 'Score modifier\r\n💎 × 🏆',
  },
};
