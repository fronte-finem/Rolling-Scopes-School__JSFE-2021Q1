import View from '../../shared/view';
import BtnView from '../../views/btn/btn';
import LinkView from '../../views/link/link';
import Factory from '../../shared/view-factory';
import appConfig from '../../app/app.config';
import style from './header.scss';

export default class Header {
  readonly view: View;

  navLinks: Map<string, LinkView>;

  activeNavLink: LinkView | undefined;

  logo = new LinkView({ url: '#/about', styles: [style.logo] });

  btnAuth = new BtnView({
    styles: [style.btn, style.btnAuth],
    text: appConfig.header.btnAuth,
  });

  btnStart = new BtnView({
    styles: [style.btn, style.btnStart],
    text: appConfig.header.btnStart,
  });

  btnAvatar = <BtnView>Factory.view({
    tag: 'button',
    styles: [style.btnAvatar],
    childs: [],
  });

  constructor(navData: { url: string; text: string }[]) {
    this.navLinks = navData.reduce(
      (dict, { url, text }) =>
        dict.set(url, new LinkView({ url, styles: [style.navLink], text })),
      new Map<string, LinkView>()
    );

    this.view = Factory.view({
      tag: 'header',
      styles: [style.header],
      childs: [
        {
          styles: [style.wrapper],
          childs: [
            this.logo,
            {
              tag: 'nav',
              styles: [style.navMenu],
              childs: [
                {
                  tag: 'ul',
                  styles: [style.navItems],
                  childs: [...this.navLinks.values()].map((link) =>
                    Factory.view({
                      tag: 'li',
                      styles: [style.navItem],
                      childs: [link],
                    })
                  ),
                },
              ],
            },
            {
              styles: [style.controls],
              childs: [this.btnAuth, this.btnStart, this.btnAvatar],
            },
          ],
        },
      ],
    });
  }

  setActiveNavLink(url: string): void {
    this.activeNavLink?.deactivate();
    this.activeNavLink = this.navLinks?.get(url);
    this.activeNavLink?.activate();
  }
}
