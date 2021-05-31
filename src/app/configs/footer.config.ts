import { ICreateSvgSpriteElementOptions } from 'shared/dom-utils';
import { ICreateLinkOptions } from 'shared/views/link/link';
import { ICreateViewOptions } from 'shared/views/view';

import styles from '~components/footer/footer-view.scss';

const SVG_RSS = {
  url: './svg/sprite.svg#icon-rs-school-js',
  classNames: [styles.svg, styles.svgRss],
};
const SVG_GITHUB = {
  url: './svg/sprite.svg#icon-github',
  classNames: [styles.svg, styles.svgGithub],
};

export interface LogoOpts {
  link: ICreateLinkOptions;
  text: ICreateViewOptions;
  svg: ICreateSvgSpriteElementOptions;
}

export const FOOTER: Record<string, LogoOpts> = {
  rss: {
    link: {
      url: 'https://rs.school/js/',
      classNames: [styles.logo, styles.logoRss],
    },
    text: {
      tag: 'span',
      text: "'21",
      classNames: [styles.text, styles.textRss],
    },
    svg: SVG_RSS,
  },
  mentor: {
    link: {
      url: 'https://github.com/dimonwhite',
      classNames: [styles.logo, styles.logoGithub],
    },
    text: {
      tag: 'span',
      text: 'mentor: dimonwhite',
      classNames: [styles.text, styles.textGithub],
    },
    svg: SVG_GITHUB,
  },
  student: {
    link: {
      url: 'https://github.com/fronte-finem',
      classNames: [styles.logo, styles.logoGithub],
    },
    text: {
      tag: 'span',
      text: 'student: fronte-finem',
      classNames: [styles.text, styles.textGithub],
    },
    svg: SVG_GITHUB,
  },
};
