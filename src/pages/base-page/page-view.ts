import { ButtonView } from 'components/button';
import { PopupView } from 'components/popup';
import { createElement } from 'shared/dom-utils';
import { AsyncObserver } from 'shared/observer-async';
import { View } from 'shared/view';

import { PAGE_CSS_CLASS } from './page.css';
import { PageLogic, PageModel } from './page-model';

export enum PageEvent {
  NEXT = 'next',
  PREV = 'prev',
  PAGE = 'page',
  BEFORE_REQUEST = 'before request',
}

const formatPageNum = (num: number) => `Page #${num}`;

export abstract class PageView<M extends PageModel> extends View<M> {
  private pageObserver = new AsyncObserver<PageEvent>();
  protected popup?: PopupView;
  private pageName: string;
  protected pageLogic: PageLogic;
  private titleTotalAmount = createElement(PAGE_CSS_CLASS.title, { tag: 'h2' });
  private titlePageNum = createElement(PAGE_CSS_CLASS.pageNum, { tag: 'h3' });
  private btnNext = new ButtonView(PageEvent.NEXT);
  private btnPrev = new ButtonView(PageEvent.PREV);
  protected content = createElement(PAGE_CSS_CLASS.content);

  public constructor(pageName: string, pageClassName = '') {
    super([PAGE_CSS_CLASS.page, pageClassName]);
    this.pageName = pageName;
    this.pageLogic = new PageLogic();
    this.initPage();
  }

  public setPopup(popup: PopupView): void {
    this.popup = popup;
  }

  protected initPage(): void {
    this.root.append(this.titleTotalAmount, this.titlePageNum);
    this.root.append(this.content);
    this.root.append(this.btnPrev.getRoot(), this.btnNext.getRoot());
    this.btnPrev.onClick(() => this.requestPage(this.pageLogic.getPrev().num));
    this.btnNext.onClick(() => this.requestPage(this.pageLogic.getNext().num));
  }

  protected updatePage(model: M): void {
    this.pageLogic.update(model);
    this.btnPrev.switch(this.pageLogic.getPrev().enabled);
    this.btnNext.switch(this.pageLogic.getNext().enabled);
    this.titleTotalAmount.textContent = `${this.pageName} (${model.totalCount})`;
    this.titlePageNum.textContent = formatPageNum(model.pageNum);
  }

  public async requestPage(num: number): Promise<void> {
    await Promise.all(this.pageObserver.notify(PageEvent.BEFORE_REQUEST, num));
    this.pageObserver.notify(PageEvent.PAGE, num);
  }

  protected hookRequestPage(listener: (num: number) => Promise<void>): void {
    this.pageObserver.addListener(PageEvent.BEFORE_REQUEST, listener);
  }

  public onRequestPage(listener: (num: number) => Promise<void>): void {
    this.pageObserver.addListener(PageEvent.PAGE, listener);
  }

  public show(): void {
    this.setCssState(PAGE_CSS_CLASS.hidden, false);
  }

  public hide(): void {
    this.setCssState(PAGE_CSS_CLASS.hidden, true);
  }
}
