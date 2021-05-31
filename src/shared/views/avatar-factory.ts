import { IUser } from 'services/user-service';

import { createSvgSpriteElement } from '../dom-utils';

import { ImgView } from './img/img';
import { View } from './view';

const DEFAULT_AVATAR_SVG_ICON = './svg/sprite.svg#icon-avatar';

export function renderAvatar(
  user: IUser,
  avatarContainer: View,
  svgClassNames: string[],
  imgClassNames: string[]
): void {
  if (!user.avatar) {
    avatarContainer.element.append(
      createSvgSpriteElement({
        url: DEFAULT_AVATAR_SVG_ICON,
        classNames: svgClassNames,
      })
    );
  } else {
    avatarContainer.render(
      new ImgView({ url: user.avatar, classNames: imgClassNames })
    );
  }
}
