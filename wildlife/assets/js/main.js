import { Carousel } from './block/carousel.js'
import { cards } from './cfg/cards.js'


let carousel = new Carousel(document.querySelector('.carousel'));

cards.concat(cards).concat(cards).forEach(carousel.addCard.bind(carousel));

carousel.changeSlot(3);

// console.log(carousel);
