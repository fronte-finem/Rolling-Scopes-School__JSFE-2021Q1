import { IPageView } from '../pages/base-page';
import { IEvent } from '../shared/observer';

export default class RouteChangedEvent implements IEvent<IPageView> {
  constructor(readonly data: IPageView) {
    this.data = data;
  }
}
