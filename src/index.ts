import { AppRoute, AppView } from 'app';
import { GarageController, GarageModel } from 'pages/garage';
import { WinnersController, WinnersModel } from 'pages/winners';
import { CarsService, RaceService } from 'services/race';

import { root, theme } from './index.css';

window.addEventListener('load', async () => {
  document.body.classList.add(root, theme);

  const garageModel = new GarageModel();
  const winnersModel = new WinnersModel();

  const carsService = new CarsService(garageModel, winnersModel);
  const raceService = new RaceService(garageModel, winnersModel);

  const garageController = new GarageController(garageModel, carsService, raceService);
  const winnersController = new WinnersController(winnersModel, carsService, raceService);

  const app = new AppView(AppRoute.GARAGE, garageController.view, winnersController.view);
  document.body.append(app.getRoot());

  await garageController.init();
  await winnersController.init();
});
