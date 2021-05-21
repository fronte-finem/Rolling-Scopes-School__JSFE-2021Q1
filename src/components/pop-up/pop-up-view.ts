import styles from './pop-up-view.scss';
import { View } from '../../shared/views/view';
import { Factory } from '../../shared/views/view-factory';
import { BtnView } from '../../shared/views/btn/btn';

export class PopUpView extends View {
  readonly header = Factory.view({
    tag: 'header',
    classNames: [styles.popUpSide, styles.popUpHeader],
  });

  readonly footer = Factory.view({
    tag: 'footer',
    classNames: [styles.popUpSide, styles.popUpFooter],
  });

  readonly body = Factory.view({ classNames: [styles.popUpBody] });

  constructor(title: string) {
    super({ tag: 'section', classNames: [styles.popUp, styles.hidden] });
    this.render([this.header, this.body, this.footer]);
    this.header.render(
      Factory.view({
        tag: 'h3',
        classNames: [styles.popUpHeading],
        text: title,
      })
    );
  }

  addContent(childs: View | View[]): void {
    this.body.render(childs);
  }

  addButtons(buttons: BtnView | BtnView[]): void {
    this.footer.render(buttons);
  }

  async show(): Promise<void> {
    await this.setCssStateAsync(styles.hidden, false);
  }

  async hide(): Promise<void> {
    await this.setCssStateAsync(styles.hidden, true);
  }

  async process(): Promise<boolean> {
    await this.show();
    return new Promise((resolve) => {
      this.onClick(
        () => {
          this.hide().then(() => resolve(true), null);
        },
        { once: true }
      );
    });
  }
}
