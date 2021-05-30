import { BtnView } from '../../shared/views/btn/btn';
import { View } from '../../shared/views/view';

import styles from './pop-up-view.scss';

export abstract class PopUpView extends View {
  private readonly header = new View({
    tag: 'header',
    classNames: [styles.popUpSide, styles.popUpHeader],
  });

  private readonly footer = new View({
    tag: 'footer',
    classNames: [styles.popUpSide, styles.popUpFooter],
  });

  private readonly body = new View({ classNames: [styles.popUpBody] });

  public constructor(title: string, classNames: string[] = []) {
    super({
      tag: 'section',
      classNames: [styles.popUp, styles.hidden, ...classNames],
    });
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

  public addContent(childs: View | View[]): void {
    this.body.render(childs);
  }

  public addButtons(buttons: BtnView | BtnView[]): void {
    this.footer.render(buttons);
  }

  public async show(): Promise<void> {
    await this.setCssStateAsync(styles.hidden, false);
  }

  public async hide(): Promise<void> {
    await this.setCssStateAsync(styles.hidden, true);
  }

  public abstract task(): Promise<boolean>;
}
