import styles from './pop-up-view.scss';
import { View } from '../../shared/views/view';
import { BtnView } from '../../shared/views/btn/btn';

export abstract class PopUpView extends View {
  readonly header = new View({
    tag: 'header',
    classNames: [styles.popUpSide, styles.popUpHeader],
  });

  readonly footer = new View({
    tag: 'footer',
    classNames: [styles.popUpSide, styles.popUpFooter],
  });

  readonly body = new View({ classNames: [styles.popUpBody] });

  constructor(title: string) {
    super({ tag: 'section', classNames: [styles.popUp, styles.hidden] });
    this.render([this.header, this.body, this.footer]);
    this.header.render(
      new View({
        tag: 'h3',
        classNames: [styles.popUpTitle],
        text: title,
      })
    );
    this.onClick((event: Event) => {
      event.cancelBubble = true;
    });
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

  abstract task(): Promise<boolean>;
}
