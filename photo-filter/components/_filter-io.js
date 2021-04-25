import { htmlToElem, newDiv } from '../lib/dom-helpers.js';
import { observer } from '../lib/observer.js';
import { ViewBEM } from '../lib/types.js';
export { FilterIO1 as FilterIO, FilterIOSettings };
let FilterIO1 = class FilterIO extends ViewBEM {
  constructor(settings) {
    super();
    this.settings = settings;
    this.view = newDiv(FilterIO.ViewName);
    this.input = htmlToElem(
      `\r\n      <input class="${FilterIO.bem('input')}" type="range" value="${
        settings.value
      }" min="${settings.min}" max="${settings.max}">\r\n    `
    );
    this.output = htmlToElem(
      `\r\n      <output class="${FilterIO.bem('output')}" name="result">${
        settings.value
      }</output>\r\n    `
    );
    const label = htmlToElem(
      `<label class="${FilterIO.bem('label')}">${settings.prettyName}:</label>`
    );
    label.append(this.input);
    this.view.append(label, this.output);
    observer.sub(`${FilterIO.ViewName}:reset`, () =>
      observer.fire(`${this.settings.name}:reset`)
    );
    observer.sub(`${this.settings.name}:set`, (value) => {
      this.output.value = String(value);
      this.input.value = String(value);
      observer.fire(FilterIO.ViewName, this.settings.cssVar);
    });
    this.input.addEventListener('input', () => {
      observer.fire(`${this.settings.name}:new`, Number(this.input.value));
    });
  }
};
FilterIO1.ViewName = 'filter-io';
let FilterIOSettings = class FilterIOSettings {
  constructor(name, value, min, max, units) {
    this.name = name.toLowerCase();
    this.initValue = value;
    this.value = value;
    this.min = min;
    this.max = max;
    this.units = units;
    observer.sub(`${this.name}:new`, (value1) => {
      this.value = value1;
      observer.fire(`${this.name}:set`, this.value);
    });
    observer.sub(`${this.name}:reset`, () => {
      this.value = this.initValue;
      observer.fire(`${this.name}:set`, this.value);
    });
  }
  get prettyName() {
    return `${this.name[0].toUpperCase()}${this.name.substring(1)}`;
  }
  get cssVar() {
    return {
      name: `--${this.name}`,
      value: `${this.value}${this.units}`,
    };
  }
  cssFilter() {
    return {
      name: this.name,
      value: this.value,
      units: this.units,
    };
  }
};
