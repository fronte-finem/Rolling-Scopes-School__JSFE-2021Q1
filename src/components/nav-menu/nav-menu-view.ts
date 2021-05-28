import { IPageConfig } from '../../app/configs/pages.config';
import { createSvgSpriteElement } from '../../shared/dom-utils';
import { LinkView } from '../../shared/views/link/link';
import { View } from '../../shared/views/view';

import styles from './nav-menu-view.scss';

export interface NavLinkCreateOptions {
  page: string;
  url: string;
  title: string;
  svgIconLink: string;
}

export class NavMenuView extends View {
  private navLinks?: Map<string, LinkView>;

  private activeNavLink: LinkView | undefined;

  private readonly navList = new View<HTMLUListElement>({
    tag: 'ul',
    classNames: [styles.navItems],
  });

  public constructor() {
    super({ tag: 'nav', classNames: [styles.navMenu] });
    this.render(this.navList);
  }

  public addNavLinks(pagesConfig: IPageConfig[]): void {
    this.navLinks = pagesConfig
      .filter((page) => page.navSvgIcon !== undefined)
      .reduce(
        (dict, pageCfg) =>
          dict.set(pageCfg.route.url, NavMenuView.createNavLink(pageCfg)),
        new Map<string, LinkView>()
      );
    this.navList.render(
      NavMenuView.createNavItems([...this.navLinks.values()])
    );
  }

  public setActiveNavLink(url: string): void {
    this.activeNavLink?.active(false);
    this.activeNavLink = this.navLinks?.get(url);
    this.activeNavLink?.active();
  }

  private static createNavItems(payload: View[]): View[] {
    return payload.map(
      (link) =>
        new View<HTMLLIElement>({
          tag: 'li',
          classNames: [styles.navItem],
          childs: [link],
        })
    );
  }

  private static createNavLink({ route, navSvgIcon }: IPageConfig): LinkView {
    return new LinkView({
      url: route.url,
      classNames: [styles.navLink],
      text: route.title,
      hookElement: (elem) => {
        if (navSvgIcon)
          elem.append(createSvgSpriteElement(navSvgIcon, [styles.svgIcon]));
        return elem;
      },
    });
  }
}
