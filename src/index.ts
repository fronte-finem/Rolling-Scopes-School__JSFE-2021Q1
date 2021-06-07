import { AppRoute, AppView } from 'app';
import { GarageController } from 'pages/garage';
import { WinnersController } from 'pages/winners';
import { RaceService } from 'services/race';

import { root, theme } from './index.css';

window.addEventListener('load', () => {
  document.body.classList.add(root, theme);

  const raceService = new RaceService();

  const garageController = new GarageController(raceService);
  const winnersController = new WinnersController(raceService);

  const app = new AppView(AppRoute.GARAGE, garageController.view, winnersController.view);
  document.body.append(app.getRoot());

  void garageController.init();
  void winnersController.init();
});
