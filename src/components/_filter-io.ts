import { newElem, newDiv } from '../lib/dom-helpers.js';
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

    this.input = newElem('input', FilterIO.bem('input')) as HTMLInputElement;
    this.input.name = settings.name;
    this.input.type = 'range';
    this.input.value = String(settings.value);
    this.input.min = String(settings.min);
    this.input.max = String(settings.max);

    this.output = newElem('output', FilterIO.bem('output')) as HTMLOutputElement;
    this.output.name = 'result';
    this.output.value = this.input.value;

    const label = newElem('label', FilterIO.bem('label'));
    label.textContent = `${settings.prettyName}:`

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
