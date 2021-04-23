// <div class="filter-io">
//   <label class="filter-io__label">
//     Blur:
//     <input class="filter-io__input" name="blur" data-sizing="px" type="range" min="0" max="10" value="0">
//   </label>
//   <output class="filter-io__output" name="result">0</output>
// </div>

export { FilterIOView, FilterIOViewSettings };

class FilterIOView {
  settings: FilterIOViewSettings;
  view: HTMLDivElement;
  input: HTMLInputElement;
  output: HTMLOutputElement;

  constructor(settings: FilterIOViewSettings) {
    this.settings = settings;

    this.view = document.createElement('div');

    this.input = document.createElement('input');
    this.input.name = settings.name;
    this.input.type = 'range';
    this.input.value = String(settings.value);
    this.input.min = String(settings.min);
    this.input.max = String(settings.max);

    this.output = document.createElement('output');
    this.output.name = 'result';
    this.output.value = this.input.value;

    const label = document.createElement('label');
    label.textContent = `${settings.prettyName}:`

    this.view.className = 'filter-io';
    label.className = `${this.view.className}__label`;
    this.input.className = `${this.view.className}__input`;
    this.output.className = `${this.view.className}__output`;

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
