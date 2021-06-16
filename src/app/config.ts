import styles from './style.module.scss';

export enum AppRoute {
  ABOUT = 'about',
  GARAGE = 'garage',
  WINNERS = 'winners',
}

export const FOOTER = `
  <footer class="${styles.footer}">
    <div class="${styles.footerWrapper}">
      <a class="${styles.logo} ${styles.rss}" href="https://rs.school/js/">
        <svg class="${styles.svg} ${styles.rss}">
          <use href="./svg/sprite.svg#icon-rs-school-js"></use>
        </svg>
        <span class="${styles.text} ${styles.rss}">'21</span>
      </a>
      <div class="${styles.group}">
        <a class="${styles.logo} ${styles.github}" href="https://github.com/dimonwhite">
          <svg class="${styles.svg} ${styles.github}">
            <use href="./svg/sprite.svg#icon-github"></use>
          </svg>
          <span class="${styles.text} ${styles.github}">mentor<span class="${styles.spoiler}">: dimonwhite</span></span>
        </a>
        <a class="${styles.logo} ${styles.github}" href="https://github.com/fronte-finem">
          <svg class="${styles.svg} ${styles.github}">
            <use href="./svg/sprite.svg#icon-github"></use>
          </svg>
          <span class="${styles.text} ${styles.github}">student<span class="${styles.spoiler}">: fronte-finem</span></span>
        </a>         
      </div>
    </div>
  </footer>
`;
