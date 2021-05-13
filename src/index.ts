import './assets/styles/reset.scss';
import style from './assets/styles/main.scss';
import App from './app/app';

window.addEventListener('load', () => {
  document.body.classList.add(style.root);
  const app = new App(document.body);
  app.start();
});
