import { PAGE_ABOUT } from 'app/configs/page-about.config';
import { ROUTE, SVGICON, TITLE } from 'app/configs/routes.config';
import { NavMenuView } from 'components/nav-menu/nav-menu-view';
import { PageError } from 'pages/error/error';
import { View } from 'shared/views/view';

import { createInfo, createPict } from './builder';

import styles from './about.scss';

export const createStep2 = (): View[] => {
  const nav = new NavMenuView();
  nav.init([
    {
      route: {
        url: ROUTE.SETTINGS,
        title: TITLE.SETTINGS,
        pageCreator: () => new PageError(),
      },
      navSvgIcon: SVGICON.SETTINGS,
    },
  ]);
  nav.setActiveNavLink(ROUTE.SETTINGS);
  return [
    createInfo(PAGE_ABOUT.step2.text, [styles.infoStep2]),
    createPict(nav, [styles.pictStep2]),
  ];
};
