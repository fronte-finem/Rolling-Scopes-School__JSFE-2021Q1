import { LimitedSlider } from './base-slider.js'
import { getCssVar } from './dom-lib.js'

export { PetsSlider }

/**
 * @typedef {import('./base-slider.js').SliderConfig} SliderConfig
 *
 * @typedef {SliderConfig & Addon} PetsSliderConfig
 *
 * @typedef {object} Addon
 * @property {string} cssVarPageCols  - css-variable for set slots index
 * @property {string} cssVarSlotCols  - css-variable for set slots index
 */

class PetsSlider extends LimitedSlider {
  /**
   * @param {HTMLElement} view
   * @param {PetsSliderConfig} petsSliderConfigfig
   */
  constructor(view, {cssVarPageCols, cssVarSlotCols, ...config}, moveNum = 3) {
    super(view, config, moveNum);
    this.cssVarPageCols = cssVarPageCols;
    this.cssVarSlotCols = cssVarSlotCols;
    this.correction();
  }

  calcSlotsOnPage() {
    const pageCols = +getCssVar(this.view, this.cssVarPageCols);
    const slotCols = +getCssVar(this.view, this.cssVarSlotCols);
    return pageCols / slotCols;
  }

  calcMoveNum() { return Math.min(this._moveNum, this.calcSlotsOnPage()) }
}
