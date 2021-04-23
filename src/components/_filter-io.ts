import { newElem, newDiv } from '../lib/dom-helpers.js';

export { FilterIOView, FilterIOViewSettings };

class FilterIOView {
  settings: FilterIOViewSettings;
  view: HTMLDivElement;
  input: HTMLInputElement;
  output: HTMLOutputElement;

  constructor(settings: FilterIOViewSettings) {
    this.settings = settings;

    this.view = newDiv('filter-io');

    this.input = newElem('input', `${this.view.className}__input`) as HTMLInputElement;
    this.input.name = settings.name;
    this.input.type = 'range';
    this.input.value = String(settings.value);
    this.input.min = String(settings.min);
    this.input.max = String(settings.max);

    this.output = newElem('output', `${this.view.className}__output`) as HTMLOutputElement;
    this.output.name = 'result';
    this.output.value = this.input.value;

    const label = newElem('label', `${this.view.className}__label`);
    label.textContent = `${settings.prettyName}:`

    label.append(this.input);
    this.view.append(label, this.output);

    this.input.addEventListener('input', e => {
      this.output.value = this.input.value;
    })
  }
}

class FilterIOViewSettings {
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
  }

  get prettyName() {
    return `${this.name[0].toUpperCase()}${this.name.substring(1)}`;
  }
}
