import styles from './style.module.scss';

export enum ButtonType {
  DEFAULT = 'default',
  START = 'start',
  STOP = 'stop',
  NEXT = 'next',
  PREV = 'prev',
  DELETE = 'delete',
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
    case ButtonType.DELETE:
      return [styles.btnNoText, styles.delete];
    case ButtonType.ROUTE:
      return [styles.btnRoute];
    case ButtonType.DEFAULT:
    default:
      return [styles.button];
  }
};
