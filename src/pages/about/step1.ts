import { PAGE_ABOUT } from 'app/configs/page-about.config';
import { PopUpSignUpView } from 'components/pop-up-sign-up/pop-up-sign-up-view';
import { View } from 'shared/views/view';

import { createInfo, createPict } from './builder';

import styles from './about.scss';

export const createStep1 = (): View[] => {
  const popup = new PopUpSignUpView(PAGE_ABOUT.step1.userService);
  void popup.show();
  return [
    createInfo(PAGE_ABOUT.step1.text, [styles.infoStep1]),
    createPict(popup, [styles.pictStep1]),
  ];
};
