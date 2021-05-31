import '@styles/reset.scss';
import styles from '@styles/main.scss';

import { App } from './app/app';

window.addEventListener('load', () => {
  document.body.classList.add(styles.root);
  const app = new App(document.body);
  // app.start().catch((error: Error) => console.log(error));
  void app.start();
});
