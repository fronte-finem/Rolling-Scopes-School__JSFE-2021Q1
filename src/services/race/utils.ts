import { CarModel } from 'components/car/car-model';
import { REST_API } from 'services/rest-api';
import { filterTry, toMaybe } from 'shared/types';

export function getCarModels(carDTOArray: REST_API.CarDTO[], winPageCars: CarModel[]): CarModel[] {
  return carDTOArray.map((carDTO) => {
    const carModel = winPageCars.find((car) => car.id === carDTO.id);
    if (carModel) return carModel;
    return new CarModel(carDTO, null);
  });
}

export async function getWinModels(
  winDTOArray: REST_API.WinDTO[],
  garageCars: CarModel[]
): Promise<CarModel[]> {
  let cars = garageCars.filter((car) => winDTOArray.some(({ id }) => car.id === id));
  const winDTOArrayDiff = winDTOArray.filter(({ id }) => cars.every((car) => car.id !== id));

  if (winDTOArrayDiff.length > 0) {
    const carsDiff = filterTry(
      await Promise.all(
        winDTOArrayDiff.map(async (winDTO) => {
          const carDTO = toMaybe(await REST_API.getCar(winDTO.id));
          return new CarModel(carDTO, winDTO);
        })
      )
    );
    cars = cars.concat(carsDiff);
  }

  return winDTOArray.map((winDTO) => {
    const carModel = cars.find((car) => car.id === winDTO.id) || new CarModel(null, winDTO);
    carModel.updateWin(winDTO);
    return carModel;
  });
}
