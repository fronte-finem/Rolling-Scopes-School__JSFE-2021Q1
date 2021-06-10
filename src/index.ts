import { AppRoute, AppView } from 'app';
import { GarageController } from 'pages/garage';
import { WinnersController } from 'pages/winners';
import { GarageService, RaceService, WinnersService } from 'services/race';

import { root, theme } from './index.css';

window.addEventListener('load', () => {
  document.body.classList.add(root, theme);

  const garageService = new GarageService();
  const winnersService = new WinnersService();
  const raceService = new RaceService();

  const garageController = new GarageController(garageService, raceService);
  const winnersController = new WinnersController(winnersService, raceService);

  const app = new AppView(AppRoute.GARAGE, garageController.view, winnersController.view);
  document.body.append(app.getRoot());

  void garageController.init();
  void winnersController.init();
});
