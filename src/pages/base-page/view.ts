import { ButtonView } from 'components/button';
import { ButtonType } from 'components/button/config';
import { PopupView } from 'components/popup';
import { createElement } from 'shared/dom-utils';
import { Observer } from 'shared/observer';
import { View } from 'shared/view';
import { IShow } from 'shared/view-types';

import { PageViewEvent } from './config';
import { PageModel } from './model';
import styles from './style.module.scss';

const formatTitle = (name: string, count: number) => `${name} (${count})`;
const formatPageNum = (num: number) => `Page #${num}`;

export abstract class PageView extends View implements IShow {
  private pageObserver = new Observer<PageViewEvent>();
  private pageNum = createElement(styles.pageNum);
  private btnPrev = new ButtonView('', ButtonType.PREV, [styles.btn, styles.prev]);
  private btnNext = new ButtonView('', ButtonType.NEXT, [styles.btn, styles.next]);
  protected content = createElement(styles.content);

  public constructor(
    protected pageModel: PageModel,
    private pageName: string,
    pageClassName = '',
    protected popup: PopupView
  ) {
    super([styles.page, pageClassName]);
    this.pageName = pageName;
    this.buildPage();
    this.initPageBinds();
    this.updatePage(pageModel);
  }

  private buildPage(): void {
    const paginatorWrapper = createElement(styles.paginatorWrapper);
    const paginator = createElement(styles.paginator);
    paginator.append(this.btnPrev.getRoot(), this.pageNum, this.btnNext.getRoot());
    paginatorWrapper.append(paginator);
    this.root.append(this.content, paginatorWrapper);
  }

  private initPageBinds(): void {
    this.btnPrev.onClick(() => this.requestPage(PageViewEvent.PREV));
    this.btnNext.onClick(() => this.requestPage(PageViewEvent.NEXT));
    this.btnPrev.disable();
    this.btnNext.disable();
  }

  public updatePage(model: PageModel): void {
    if (!this.pageModel) this.pageModel = model;
    this.btnPrev.switch(this.pageModel.getPrev().enabled);
    this.btnNext.switch(this.pageModel.getNext().enabled);
    this.pageNum.textContent = formatPageNum(model.pageNum);
    this.pageObserver.notify(
      PageViewEvent.PAGE_UPDATED,
      formatTitle(this.pageName, model.totalCount)
    );
  }

  protected hookRequestPage?: () => void;

  private requestPage(next: PageViewEvent): void {
    this.hookRequestPage?.();
    this.pageObserver.notify(
      PageViewEvent.REQUEST_PAGE,
      this.pageModel.getPage(next === PageViewEvent.NEXT)
    );
  }

  public onRequestPage(listener: (num: number) => void): void {
    this.pageObserver.addListener(PageViewEvent.REQUEST_PAGE, listener);
  }

  public onPageUpdated(listener: (title: string) => void): void {
    this.pageObserver.addListener(PageViewEvent.PAGE_UPDATED, listener);
  }

  public show(): void {
    this.setCssState(styles.hidden, false);
  }

  public hide(): void {
    this.setCssState(styles.hidden, true);
  }
}
