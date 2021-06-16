import { AppView } from 'app';

import styles from './style.module.scss';

window.addEventListener('load', async () => {
  const app = new AppView();

  document.body.classList.add(styles.root);
  document.body.append(app.getRoot());

  await app.start();
});
