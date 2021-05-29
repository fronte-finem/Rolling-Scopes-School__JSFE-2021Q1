import { POPUP_SIGN_UP } from 'app/configs/popups.config';
import { AvatarControlView } from 'components/avatar-control/avatar-control-view';
import { PopUpView } from 'components/pop-up/pop-up-view';
import { SignUpView } from 'components/sign-up/sign-up-view';
import { IUser, IUserService } from 'services/user-service';
import { BtnView } from 'shared/views/btn/btn';
import { View } from 'shared/views/view';

import styles from './pop-up-sign-up-view.scss';

export class PopUpSignUpView extends PopUpView {
  private form = new View<HTMLFormElement>({ tag: 'form' });

  private signUpView = new SignUpView();

  private avatarControl = new AvatarControlView();

  private btnAddUser = new BtnView(POPUP_SIGN_UP.btns.addUser);

  private btnCancel = new BtnView(POPUP_SIGN_UP.btns.cancel);

  public constructor(private readonly userService: IUserService) {
    super(POPUP_SIGN_UP.title);
    this.init();
  }

  private init(): void {
    const wrapper = new View({ classNames: [styles.userForm] });
    wrapper.render([this.signUpView, this.avatarControl]);
    this.addContent(wrapper);
    this.addButtons([this.btnAddUser, this.btnCancel]);
  }

  // Todo: think about careful aborting promises
  // https://stackoverflow.com/questions/29478751/cancel-a-vanilla-ecmascript-6-promise-chain/59999584#59999584
  // https://stackoverflow.com/questions/30233302/promise-is-it-possible-to-force-cancel-a-promise/65805464#65805464

  public async task(): Promise<boolean> {
    return new Promise((resolve) => {
      this.btnAddUser.onClick(async () => this.onAddUser(resolve));
      this.btnCancel.onClick(() => {
        this.signUpView.reset();
        resolve(false);
      });
    });
  }

  private async onAddUser(
    resolve: (value: boolean | PromiseLike<boolean>) => void
  ): Promise<boolean> {
    if (this.signUpView.validate()) {
      const user = this.getUser();
      const maybeUser = await this.userService.save(user);
      // await this.userService.logAll();
      resolve(maybeUser !== undefined);
    }
    return false;
  }

  private getUser(): IUser {
    return {
      ...this.signUpView.getValue(),
      score: 0,
      time: 0,
      avatar: this.avatarControl.getAvatar(),
    };
  }
}
