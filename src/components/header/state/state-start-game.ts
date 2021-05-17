import HeaderState from "./base-state";
import HeaderStateStopGame from "./state-stop-game";

export default class HeaderStateStartGame extends HeaderState {
  update(): void {
    this.baseUpdate([true, false, true, false], HeaderStateStopGame);
  }
}
