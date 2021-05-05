import { petsData } from './config.js'
import { Modal } from './modal.js'
import { Popup1 } from './donate-popup1.js'
import { Popup2 } from './donate-popup2.js'
import { DonateApp } from './donate-app.js'
import { PetsSlider } from './slider-pets.js'
import { TestimonialsSlider } from './slider-testimonials.js'
import { SideBar } from './side-bar.js'
import { LiveCams } from './live-cams.js'

window.addEventListener('load', () => {
  initHambButton();
  initDonateApp();
  initPetsSlider(document.querySelector('.pets-in-zoo__slider'));
  initTimonialsSlider(document.querySelector('.testimonials__slider'));
  initSideBar(document.querySelector('.side-bar'));
  initLiveCams(document.querySelector('.live-cams'));
});

function initHambButton() {
  const btn = document.querySelector('.header__btn--hamburger');
  const menu = document.querySelector('.header__container--menu');
  btn.addEventListener('click', () => {
    btn.classList.toggle('header__btn--hamburger-close');
    menu.classList.toggle('header__container--menu-open');
  });
}

function initDonateApp() {
  new DonateApp(
    new Modal(document.querySelector('.modal-cover')),
    new Popup1(document.querySelector('.pop-up-first')),
    new Popup2(document.querySelector('.pop-up-second'), petsData),
    [...document.querySelectorAll('.btn--js-donate-step-0')],
    document.querySelector('.control-donation')
  );
}

function initPetsSlider(petsSliderView) {
  if (petsSliderView) {
    new PetsSlider(petsSliderView, {
      btnPrev: petsSliderView.querySelector('.btn-icon--prev'),
      btnNext: petsSliderView.querySelector('.btn-icon--next'),
      slots: petsSliderView.querySelector('.slider__slots'),
      cssVarMoveSlots: '--slider-move-slots',
      cssVarPageCols: '--page-cols',
      cssVarSlotCols: '--slider-slot-cols',
    }, 2)
  }
}

function initTimonialsSlider(testimonialsSliderView) {
  if (testimonialsSliderView) {
    new TestimonialsSlider(testimonialsSliderView, {
      btnPrev: testimonialsSliderView.querySelector('.btn-icon--prev'),
      btnNext: testimonialsSliderView.querySelector('.btn-icon--next'),
      slots: testimonialsSliderView.querySelector('.slider__slots'),
      rows: testimonialsSliderView.querySelectorAll('.slider__slots'),
      cssVarMoveSlots: '--slider-move-slots',
      cssClassTransition: 'slider--transition',
    }, 15, 60);
  }
}

function initSideBar(sideBarView) {
  sideBarView && new SideBar(sideBarView);
}

function initLiveCams(liveCamsView) {
  if (liveCamsView) {
    new LiveCams(liveCamsView, {
      btnPrev: liveCamsView.querySelector('.btn-icon--prev'),
      btnNext: liveCamsView.querySelector('.btn-icon--next'),
      slots: liveCamsView.querySelector('.live-cams__slots'),
      cssVarMoveSlots: '--🎦--slider-move-slots',
    })
  }
}
