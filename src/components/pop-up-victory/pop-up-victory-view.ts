import { POPUP_VICTORY } from '../../app/configs/popups.config';
import { IUser, IUserService } from '../../services/user-service';
import { BtnView } from '../../shared/views/btn/btn';
import { View } from '../../shared/views/view';
import { PopUpView } from '../pop-up/pop-up-view';

export class PopUpVictoryView extends PopUpView {
  private btnConfirn = new BtnView(POPUP_VICTORY.btns.confirm);

  public constructor(private readonly userService: IUserService, time = NaN) {
    super(POPUP_VICTORY.title);
    this.init(time, this.userService.currentUser);
  }

  private init(time: number, user: IUser | undefined) {
    if (!user) return;
    this.addContent(new View(POPUP_VICTORY.msgGenerator(user)));
    this.addButtons(this.btnConfirn);
  }

  public task(): Promise<boolean> {
    return new Promise((resolve) => {
      this.btnConfirn.onClick(() => resolve(true));
    });
  }
}
