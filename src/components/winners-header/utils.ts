import { REST_API } from 'services/rest-api';

import styles from './style.module.scss';

type SortOrder = REST_API.SortOrder;

export function* orderGenerator(): Generator<SortOrder, void, SortOrder> {
  while (true) {
    yield REST_API.SortOrder.INITIAL;
    yield REST_API.SortOrder.ASC;
    yield REST_API.SortOrder.DESC;
  }
}

export function toggleOrder(
  element: HTMLElement,
  generator: Generator<SortOrder, void, SortOrder>
): SortOrder {
  const order = generator.next().value;
  switch (order) {
    case REST_API.SortOrder.ASC:
      element.classList.toggle(styles.asc, true);
      element.classList.toggle(styles.desc, false);
      break;
    case REST_API.SortOrder.DESC:
      element.classList.toggle(styles.asc, false);
      element.classList.toggle(styles.desc, true);
      break;
    default:
      element.classList.toggle(styles.asc, false);
      element.classList.toggle(styles.desc, false);
      break;
  }
  return order as SortOrder;
}
