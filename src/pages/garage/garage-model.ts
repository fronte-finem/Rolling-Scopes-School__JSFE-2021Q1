import { CarModel } from 'components/car';
import { PageModel } from 'pages/base-page/page-model';
import { REST_API } from 'services/rest-api';

export class GarageModel implements PageModel {
  public totalCount = 0;
  public pageNum = 1;
  public pageLimit = REST_API.GARAGE_PAGE_LIMIT_DEFAULT;
  public cars: Array<CarModel> = [];
}
