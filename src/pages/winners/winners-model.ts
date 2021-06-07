import { PageModel } from 'pages/base-page';
import { REST_API } from 'services/rest-api';

// 1.3 (+5)  "Winners" view should contain its name, page number, and the full amount of items in the database (how many records the winners table contains).
// 5.1 (+10) After some car wins it should be displayed at the "Winners view" table.
// 5.2 (+5)  There should be pagination (10 winners per one page).
// 5.3 (+10) Table should include the next culumns:
//           - "№", "Image of the car", "Name of the car", "Wins number", "Best time in seconds" (names of the columns can differ).
//           - If the same car wins more than once the number of wins should be incremented while best time should be saved only if it's better than the stored one.
// 5.4 (+10) User should be able to sort cars by wins number and by best time (ASC, DESC).

export class WinnersModel implements PageModel {
  public totalCount = 0;
  public pageNum = 1;
  public pageLimit = REST_API.WINNERS_PAGE_LIMIT_DEFAULT;
}
