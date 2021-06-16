import { Observer } from 'shared/observer';

import { PageModelEvent } from './config';

export class PageModel {
  private pageObserver = new Observer<PageModelEvent>();
  public totalCount = 0;
  public pageNum = 1;

  public constructor(public pageLimit: number) {}

  public pageUpdate(totalCount: number, pageNum?: number): void {
    this.totalCount = totalCount;
    if (pageNum !== undefined) this.pageNum = pageNum;
    this.pageObserver.notify(PageModelEvent.UPDATED, this);
  }

  public onPageUpdate(listener: (model: PageModel) => void): void {
    this.pageObserver.addListener(PageModelEvent.UPDATED, listener);
  }

  public getPage(next: boolean): number {
    const { num } = next ? this.getNext() : this.getPrev();
    return num;
  }

  public getNext(): { num: number; enabled: boolean } {
    const enabled = this.totalCount - this.pageNum * this.pageLimit > 0;
    const num = this.pageNum + 1;
    return { num, enabled };
  }

  public getPrev(): { num: number; enabled: boolean } {
    const enabled = this.pageNum > 1;
    const num = this.pageNum - 1;
    return { num, enabled };
  }
}
