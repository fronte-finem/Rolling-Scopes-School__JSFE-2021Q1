import { petsData } from './config.js'
import { Modal } from './modal.js'
import { Popup1 } from './donate-popup1.js'
import { Popup2 } from './donate-popup2.js'
import { DonateApp } from './donate-app.js'
import { Slider } from './base-slider.js'

window.addEventListener('load', () => {
  initHambButton();

  const donateApp = new DonateApp(
      new Modal(document.querySelector('.modal-cover')),
      new Popup1(document.querySelector('.pop-up-first')),
      new Popup2(document.querySelector('.pop-up-second'), petsData),
      [...document.querySelectorAll('.btn--js-donate-step-0')],
      document.querySelector('.control-donation')
  );

  const petSlider = new Slider(document.querySelector('.pets-in-zoo__slider'));
});

function initHambButton() {
  const btn = document.querySelector('.header__btn--hamburger');
  const menu = document.querySelector('.header__container--menu');

  btn.addEventListener('click', () => {
    btn.classList.toggle('header__btn--hamburger-close');
    menu.classList.toggle('header__container--menu-open');
  });
}
