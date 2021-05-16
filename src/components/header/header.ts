import appConfig from '../../app/app.config';
import BtnView from '../../shared/views/btn/btn';
import LinkView from '../../shared/views/link/link';
import View from '../../shared/views/view';
import Factory from '../../shared/views/view-factory';
import style from './header.scss';

export default class Header {
  readonly view: View;

  readonly navLinks: Map<string, LinkView>;

  private activeNavLink: LinkView | undefined;

  readonly logo = new LinkView({ url: '#/about', styles: [style.logo] });

  readonly btnAuth = new BtnView({
    styles: [style.btn, style.btnAuth],
    text: appConfig.header.btnAuth,
  });

  readonly btnStart = new BtnView({
    styles: [style.btn, style.btnStart],
    text: appConfig.header.btnStart,
  });

  readonly btnAvatar = <BtnView>Factory.view({
    tag: 'button',
    styles: [style.btnAvatar],
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
    this.activeNavLink?.active(false);
    this.activeNavLink = this.navLinks?.get(url);
    this.activeNavLink?.active();
  }
}
