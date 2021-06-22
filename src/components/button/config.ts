import styles from './style.module.scss';

export enum ButtonType {
  DEFAULT = 'default',
  START = 'start',
  STOP = 'stop',
  NEXT = 'next',
  PREV = 'prev',
  NO_TEXT = 'delete',
  CUSTOM = 'custom',
  ROUTE = 'route',
}

export const getBtnClassName = (type: ButtonType): string[] => {
  switch (type) {
    case ButtonType.START:
      return [styles.btnProcess, styles.start];
    case ButtonType.STOP:
      return [styles.btnProcess, styles.stop];
    case ButtonType.NEXT:
      return [styles.btnPaginator, styles.next];
    case ButtonType.PREV:
      return [styles.btnPaginator, styles.prev];
    case ButtonType.NO_TEXT:
      return [styles.btnNoText];
    case ButtonType.CUSTOM:
      return [];
    case ButtonType.ROUTE:
      return [styles.btnRoute];
    default:
      return [styles.button];
  }
};
