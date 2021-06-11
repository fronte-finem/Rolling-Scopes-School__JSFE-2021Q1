import { ButtonView } from 'components/button';
import { PopupView } from 'components/popup';
import { createElement } from 'shared/dom-utils';
import { Observer } from 'shared/observer';
import { View } from 'shared/view';

import { PAGE_CSS_CLASS } from './page.css';
import { PageViewEvent } from './page-config';
import { PageModel } from './page-model';

const formatTitle = (name: string, count: number) => `${name} (${count})`;
const formatPageNum = (num: number) => `Page #${num}`;

export abstract class PageView extends View {
  private pageObserver = new Observer<PageViewEvent>();
  protected _popup?: PopupView;
  private pageName: string;
  private titleTotalAmount = createElement(PAGE_CSS_CLASS.title, { tag: 'h2' });
  private titlePageNum = createElement(PAGE_CSS_CLASS.pageNum, { tag: 'h3' });
  private btnNext = new ButtonView(PageViewEvent.NEXT);
  private btnPrev = new ButtonView(PageViewEvent.PREV);
  protected content = createElement(PAGE_CSS_CLASS.content);

  public constructor(private pageModel: PageModel, pageName: string, pageClassName = '') {
    super([PAGE_CSS_CLASS.page, pageClassName]);
    this.pageName = pageName;
    this.init();
    this.updatePage(pageModel);
  }

  public setPopup(popup: PopupView): void {
    this._popup = popup;
  }

  public popup(message: string): void {
    this._popup?.update(message);
  }

  private init(): void {
    this.root.append(this.titleTotalAmount, this.titlePageNum);
    this.root.append(this.content);
    this.root.append(this.btnPrev.getRoot(), this.btnNext.getRoot());
    this.btnPrev.disable();
    this.btnNext.disable();
    this.btnPrev.onClick(() => this.requestPage(PageViewEvent.PREV));
    this.btnNext.onClick(() => this.requestPage(PageViewEvent.NEXT));
  }

  public updatePage(model: PageModel): void {
    if (!this.pageModel) this.pageModel = model;
    this.btnPrev.switch(this.pageModel.getPrev().enabled);
    this.btnNext.switch(this.pageModel.getNext().enabled);
    this.titleTotalAmount.textContent = formatTitle(this.pageName, model.totalCount);
    this.titlePageNum.textContent = formatPageNum(model.pageNum);
  }

  protected hookRequestPage?: () => void;

  private requestPage(next: PageViewEvent): void {
    this.hookRequestPage?.();
    this.pageObserver.notify(
      PageViewEvent.PAGE,
      this.pageModel.getPage(next === PageViewEvent.NEXT)
    );
  }

  public onRequestPage(listener: (num: number) => void): void {
    this.pageObserver.addListener(PageViewEvent.PAGE, listener);
  }

  public show(): void {
    this.setCssState(PAGE_CSS_CLASS.hidden, false);
  }

  public hide(): void {
    this.setCssState(PAGE_CSS_CLASS.hidden, true);
  }
}
