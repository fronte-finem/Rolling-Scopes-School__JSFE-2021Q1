import './assets/styles/reset.scss';
import styles from './assets/styles/main.scss';
import { App } from './app/app';

window.addEventListener('load', () => {
  document.body.classList.add(styles.root);
  const app = new App(document.body);
  app.start().then(null, (error: Error) => console.log(error));
});
