import styles from './pop-up-sign-up-view.scss';
import {
  APP_POPUP_SINGUP_CONFIG,
  PopUpSignUpBtns,
  PopUpSignUpInputs,
} from '../../app/configs/popups';
import { BtnView } from '../../shared/views/btn/btn';
import { PopUpView } from '../pop-up/pop-up-view';
import { TextInputView } from '../input/text-input-view';
import { View } from '../../shared/views/view';
import { IUser, IUserService } from '../../services/user-service';
import { createSvgSpriteElement, cropResize } from '../../shared/dom-utils';
import { ImgView } from '../../shared/views/img/img';

const BTN_ADD_USER_SVG_ICON = './svg/sprite.svg#icon-cross';
const DEFAULT_AVATAR_SVG_ICON = './svg/sprite.svg#icon-avatar';

const createInput = (key: PopUpSignUpInputs): TextInputView =>
  new TextInputView(APP_POPUP_SINGUP_CONFIG.inputs[key]);

const createBtn = (key: PopUpSignUpBtns, ...classNames: string[]): BtnView =>
  new BtnView({ ...APP_POPUP_SINGUP_CONFIG.btns[key], classNames });

export class PopUpSignUpView extends PopUpView {
  private form = new View<HTMLFormElement>({ tag: 'form' });

  private inputFirstName = createInput('firstnName');

  private inputLastName = createInput('lastName');

  private inputEmail = createInput('email');

  private btnAddUser = createBtn('addUser');

  private btnCancel = createBtn('cancel', 'btn--invert');

  private btnAddAvatar = new View<HTMLInputElement>({
    tag: 'input',
    classNames: [styles.btnAddAvatar],
  });

  private avatarOutput = new View({ classNames: [styles.avatarOutput] });

  private userAvatarBase64?: string;

  public constructor(private readonly userService: IUserService) {
    super(APP_POPUP_SINGUP_CONFIG.title);
    this.addContent(
      new View({ classNames: [styles.userForm] }).render([
        this.initInputs(),
        this.initAvatar(),
      ])
    );
    this.addButtons([this.btnAddUser, this.btnCancel]);
  }

  private initInputs(): View {
    return new View({ classNames: [styles.formWrapper] }).render(
      this.form.render(
        new View({ classNames: [styles.inputsWrapper] }).render(this.inputs)
      )
    );
  }

  private initAvatar(): View {
    this.avatarOutput.element.append(
      createSvgSpriteElement(DEFAULT_AVATAR_SVG_ICON, [
        styles.svgIcon,
        styles.svgIconAvatarOutput,
      ])
    );
    return new View({ classNames: [styles.avatar] }).render([
      this.avatarOutput,
      this.initBtnAddAvatar(),
    ]);
  }

  private initBtnAddAvatar() {
    this.btnAddAvatar.element.type = 'file';
    const btnAddAvatarWrapper = new View({
      classNames: [styles.btnAddAvatarWrapper],
    }).render(this.btnAddAvatar);
    btnAddAvatarWrapper.element.append(
      createSvgSpriteElement(BTN_ADD_USER_SVG_ICON, [
        styles.svgIcon,
        styles.svgIconBtnAddAvatar,
      ])
    );
    this.btnAddAvatar.element.addEventListener('input', () => {
      void this.handleAddAvatar();
    });
    return btnAddAvatarWrapper;
  }

  private async handleAddAvatar(): Promise<void> {
    const fileList = this.btnAddAvatar.element.files;
    if (!fileList) return;
    const file = fileList[0];
    let img = await ImgView.create({ url: window.URL.createObjectURL(file) });
    const base64img = cropResize(img.element, 200);
    if (!base64img) return;
    this.userAvatarBase64 = base64img;
    img = await ImgView.create({ url: base64img });
    this.avatarOutput.render(img);
  }

  private get inputs(): TextInputView[] {
    return [this.inputFirstName, this.inputLastName, this.inputEmail];
  }

  // Todo: think about careful aborting promises
  // https://stackoverflow.com/questions/29478751/cancel-a-vanilla-ecmascript-6-promise-chain/59999584#59999584
  // https://stackoverflow.com/questions/30233302/promise-is-it-possible-to-force-cancel-a-promise/65805464#65805464

  public async task(): Promise<boolean> {
    return new Promise((resolve) => {
      this.btnAddUser.onClick(async () => this.onAddUser(resolve));
      this.btnCancel.onClick(() => {
        this.resetInputs();
        resolve(false);
      });
    });
  }

  private async onAddUser(
    resolve: (value: boolean | PromiseLike<boolean>) => void
  ): Promise<boolean> {
    if (this.isUserValid()) {
      const user = this.getUser();
      const maybeUser = await this.userService.save(user);
      // await this.userService.logAll();
      resolve(maybeUser !== undefined);
    }
    return false;
  }

  private isUserValid(): boolean {
    return this.inputs.every((input) => input.validate());
  }

  private resetInputs(): void {
    this.inputs.map((input) => input.reset());
  }

  private getUser(): IUser {
    return {
      firstName: this.inputFirstName.input.element.value,
      lastName: this.inputLastName.input.element.value,
      email: this.inputEmail.input.element.value,
      score: 0,
      time: 0,
      avatar: this.userAvatarBase64,
    };
  }
}
