'use strict';

const getCssVar = (elem, key) => getComputedStyle(elem).getPropertyValue(key);
const setCssVar = (elem, key, val) => elem.style.setProperty(key, String(val));

class Carousel {
  CSS_VAR_CURR_SLOT = '--curr-slot';
  CSS_VAR_VISIBLE_SLOTS = '--visible-slots';
  ctrlOff = 'ctrl--disabled';
  ctrlPrev = '.ctrl--prev';
  ctrlNext = '.ctrl--next';
  root;
  currSlot;
  slotsNum;

  constructor(root) {
    this.root = root;
    this.currSlot = this.cssCurrSlot;
    this.slotsNum = root.querySelectorAll('.slot').length;
    this.ctrlPrev = root.querySelector(this.ctrlPrev);
    this.ctrlNext = root.querySelector(this.ctrlNext);
    this.ctrlPrev.querySelector('.btn-inline-svg').addEventListener('click', this.changeSlot.bind(this, -1));
    this.ctrlNext.querySelector('.btn-inline-svg').addEventListener('click', this.changeSlot.bind(this, +1));
  }

  get cssCurrSlot() { return parseInt(getCssVar(this.root, this.CSS_VAR_CURR_SLOT)); }
  get cssVisibleSlots() { return parseInt(getCssVar(this.root, this.CSS_VAR_VISIBLE_SLOTS)); }

  set cssCurrSlot(pos) { setCssVar(this.root, this.CSS_VAR_CURR_SLOT, pos); }
  set cssVisibleSlots(num) { setCssVar(this.root, this.CSS_VAR_VISIBLE_SLOTS, num); }

  changeSlot(inc) {
    let slots = this.cssVisibleSlots;
    let pos = this.currSlot + inc;
    if (pos < 0) return false;
    if (pos > this.slotsNum - slots) return false;
    pos            > 0 || this.ctrlPrev.classList.add(this.ctrlOff);
    this.currSlot > 0 || this.ctrlPrev.classList.remove(this.ctrlOff);
    pos            < this.slotsNum - slots || this.ctrlNext.classList.add(this.ctrlOff);
    this.currSlot < this.slotsNum - slots || this.ctrlNext.classList.remove(this.ctrlOff);
    this.cssCurrSlot = pos;
    this.currSlot = pos;
    return true;
  }

  addCard(card) {
    let slot = document.createElement('li');
    slot.className = 'slot';
    slot.innerHTML = Carousel.cardTempalte(card);
    this.root.querySelector('.slots').appendChild(slot);
    this.slotsNum++;
  }

  /**
   * card: {
   *   link: string,
   *   img: {
   *     src: uri | string,
   *     alt: string,
   *     w: int | string,
   *     h: int | string,
   *   },
   *   title: string,
   *   text: string
   * }
   */
  static cardTempalte(card) {
    return `<!-- - - - - - - - - - - - - - - - - -->
<a class="card" href="${card.link}">
  <img class="card-bg" src="${card.img.src}" alt="${card.img.alt}" width="${card.img.w}" height="${card.img.h}">
  <section class="card-description">
    <h4 class="card-title">${card.title}</h4>
    <p class="card-text font-small">${card.text}</p>
  </section>
</a>`;
  }
}

export { Carousel };
