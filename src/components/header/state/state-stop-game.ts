import HeaderState from "./base-state";
import HeaderStateStartGame from "./state-start-game";

export default class HeaderStateStopGame extends HeaderState {
  update(): void {
    this.baseUpdate([true, true, false, false], HeaderStateStartGame);
  }
}
