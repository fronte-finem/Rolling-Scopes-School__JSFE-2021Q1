import { newElem, newDiv } from '../lib/dom-helpers.js';
import { observer } from '../lib/observer.js';
import { CssVar } from '../lib/types.js';

export { FilterIO, FilterIOSettings };

class FilterIO {
  static viewName = 'filter-io';

  settings: FilterIOSettings;
  view: HTMLDivElement;
  input: HTMLInputElement;
  output: HTMLOutputElement;

  constructor(settings: FilterIOSettings) {
    this.settings = settings;

    this.view = newDiv(FilterIO.viewName);

    this.input = newElem('input', `${FilterIO.viewName}__input`) as HTMLInputElement;
    this.input.name = settings.name;
    this.input.type = 'range';
    this.input.value = String(settings.value);
    this.input.min = String(settings.min);
    this.input.max = String(settings.max);

    this.output = newElem('output', `${FilterIO.viewName}__output`) as HTMLOutputElement;
    this.output.name = 'result';
    this.output.value = this.input.value;

    const label = newElem('label', `${FilterIO.viewName}__label`);
    label.textContent = `${settings.prettyName}:`

    label.append(this.input);
    this.view.append(label, this.output);

    this.input.addEventListener('input', () => {
      this.output.value = this.input.value;
      observer.fire(this.settings.name, Number(this.input.value));
      observer.fire(FilterIO.viewName, this.settings.cssVar);
    })
  }
}

class FilterIOSettings {
  name: string;
  value: number;
  min: number;
  max: number;
  units: string;

  constructor(name: string, value: number, min: number, max: number, units: string) {
    this.name = name.toLowerCase();
    this.value = value;
    this.min = min;
    this.max = max;
    this.units = units;

    observer.sub(this.name, (value: number) => this.value = value);
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
}
