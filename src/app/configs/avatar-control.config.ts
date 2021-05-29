import styles from '~components/avatar-control/avatar-control-view.scss';

export const AVATAR_CONTROL = {
  wrapper: {
    classNames: [styles.inputWrapper],
  },
  input: {
    tag: 'input' as keyof HTMLElementTagNameMap,
    classNames: [styles.input],
  },
  output: { classNames: [styles.output] },
  icons: {
    input: {
      url: './svg/sprite.svg#icon-cross',
      classNames: [styles.svgIcon, styles.svgIconInput],
    },
    output: {
      url: './svg/sprite.svg#icon-avatar',
      classNames: [styles.svgIcon, styles.svgIconOutput],
    },
  },
};
