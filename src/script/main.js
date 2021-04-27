window.addEventListener('load', () => {
  initHambButton();
});

function initHambButton() {
  const btn = document.querySelector('.header__btn--hamburger');
  const menu = document.querySelector('.header__container--menu');

  btn.addEventListener('click', () => {
    btn.classList.toggle('header__btn--hamburger-close');
    menu.classList.toggle('header__container--menu-open');
  });
}
