import HeaderState from "./base-state";
import HeaderStateStartGame from "./state-start-game";

export default class HeaderStateSignUp extends HeaderState {
  update(): void {
    this.baseUpdate([false, true, true, true], HeaderStateStartGame);
  }
}


