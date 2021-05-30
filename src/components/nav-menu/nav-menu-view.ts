import { IPageConfig } from '../../app/configs/pages.config';
import { createSvgSpriteElement } from '../../shared/dom-utils';
import { LinkView } from '../../shared/views/link/link';
import { View } from '../../shared/views/view';

import styles from './nav-menu-view.scss';

const createNavItem = (link: View): View => {
  const li = new View({ tag: 'li', classNames: [styles.navItem] });
  li.render(link);
  return li;
};

const createNavList = (links: View[]): View => {
  const navList = new View({ tag: 'ul', classNames: [styles.navItems] });
  navList.render(links.map((link) => createNavItem(link)));
  return navList;
};

const createNavLink = ({ route, navSvgIcon = '' }: IPageConfig): LinkView => {
  const link = new LinkView({ url: route.url, classNames: [styles.navLink] });
  link.setText(route.title);
  const opts = { url: navSvgIcon, classNames: [styles.svgIcon] };
  link.element.append(createSvgSpriteElement(opts));
  return link;
};

export class NavMenuView extends View {
  private navLinks?: Map<string, LinkView>;

  private activeNavLink?: LinkView;

  public constructor() {
    super({ tag: 'nav', classNames: [styles.navMenu] });
  }

  public init(pagesConfig: IPageConfig[]): void {
    this.navLinks = pagesConfig
      .filter((page) => page.navSvgIcon !== undefined)
      .reduce(
        (dict, pageCfg) => dict.set(pageCfg.route.url, createNavLink(pageCfg)),
        new Map<string, LinkView>()
      );
    this.render(createNavList([...this.navLinks.values()]));
  }

  public setActiveNavLink(url: string): void {
    this.activeNavLink?.active(false);
    this.activeNavLink = this.navLinks?.get(url);
    this.activeNavLink?.active();
  }
}
