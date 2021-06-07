export interface PageModel {
  totalCount: number;
  pageNum: number;
  pageLimit: number;
}

export class PageLogic implements PageModel {
  public totalCount!: number;
  public pageNum!: number;
  public pageLimit!: number;

  public update({ totalCount, pageNum, pageLimit }: PageModel): void {
    this.totalCount = totalCount;
    this.pageNum = pageNum;
    this.pageLimit = pageLimit;
  }

  public getNext(): { num: number; enabled: boolean } {
    const enabled = this.totalCount - this.pageNum * this.pageLimit >= 0;
    const num = this.pageNum + 1;
    return { num, enabled };
  }

  public getPrev(): { num: number; enabled: boolean } {
    const enabled = this.pageNum > 1;
    const num = this.pageNum - 1;
    return { num, enabled };
  }
}
