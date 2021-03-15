import { Carousel } from './block/carousel.js'
import { cards } from './cfg/cards.js'


window.addEventListener('load', (e) => {
  let carousel = new Carousel(document.querySelector('.carousel'));
  // console.log(carousel);
  cards.concat(cards).concat(cards).forEach(carousel.addCard.bind(carousel));
  carousel.changeSlot(3);
});

