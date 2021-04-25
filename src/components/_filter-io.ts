import { htmlToElem, newElem, newDiv } from '../lib/dom-helpers.js';
import { observer } from '../lib/observer.js';
import { ViewBEM, CssVar, CssFilter } from '../lib/types.js';

export { FilterIO, FilterIOSettings };

class FilterIO extends ViewBEM  {
  static ViewName = 'filter-io';

  settings: FilterIOSettings;
  view: HTMLDivElement;
  input: HTMLInputElement;
  output: HTMLOutputElement;

  constructor(settings: FilterIOSettings) {
    super();
    this.settings = settings;

    this.view = newDiv(FilterIO.ViewName);

    this.input = htmlToElem(`
      <input class="${FilterIO.bem('input')}" type="range" value="${settings.value}" min="${settings.min}" max="${settings.max}">
    `) as HTMLInputElement;

    this.output = htmlToElem(`
      <output class="${FilterIO.bem('output')}" name="result">${settings.value}</output>
    `) as HTMLOutputElement;

    const label = htmlToElem(`<label class="${FilterIO.bem('label')}">${settings.prettyName}</label>`);

    label.append(this.input);
    this.view.append(label, this.output);

    observer.sub(`${FilterIO.ViewName}:reset`, () => observer.fire(`${this.settings.name}:reset`));

    observer.sub(`${this.settings.name}:set`, (value: number) => {
      this.output.value = String(value);
      this.input.value = String(value);
      observer.fire(FilterIO.ViewName, this.settings.cssVar);
    });

    this.input.addEventListener('input', () => {
      observer.fire(`${this.settings.name}:new`, Number(this.input.value));
    })
  }
}

class FilterIOSettings {
  name: string;
  initValue: number;
  value: number;
  min: number;
  max: number;
  units: string;

  constructor(name: string, value: number, min: number, max: number, units: string) {
    this.name = name.toLowerCase();
    this.initValue = value;
    this.value = value;
    this.min = min;
    this.max = max;
    this.units = units;

    observer.sub(`${this.name}:new`, (value: number) => {
      this.value = value;
      observer.fire(`${this.name}:set`, this.value);
    });

    observer.sub(`${this.name}:reset`, () => {
      this.value = this.initValue;
      observer.fire(`${this.name}:set`, this.value);
    });
  }

  get prettyName() : string {
    return `${this.name[0].toUpperCase()}${this.name.substring(1)}`;
  }

  get cssVar() : CssVar {
    return {
      name: `--${this.name}`,
      value: `${this.value}${this.units}`
    };
  }

  cssFilter() : CssFilter {
    return {
      name: this.name,
      value: this.value,
      units: this.units,
    };
  }
}
