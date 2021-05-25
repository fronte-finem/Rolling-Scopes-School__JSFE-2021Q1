import { View, ICreateViewOptions, IView } from './view';
import { BtnView } from './btn/btn';
import { LinkView, ICreateLinkOptions } from './link/link';
import { ImgView } from './img/img';

export interface IBuildViewOptions extends ICreateViewOptions {
  build?: IBuildViewOptions | IBuildViewOptions[];
  hookView?: (view: IView<HTMLElement>) => void;
}

export abstract class Factory {
  static view({ tag, build, hookView, ...options }: IBuildViewOptions): View {
    let view: View;

    switch (tag) {
      case 'a':
        view = new LinkView(<ICreateLinkOptions>options);
        break;
      case 'img':
        view = new ImgView(<ICreateLinkOptions>options);
        break;
      case 'button':
        view = new BtnView(options);
        break;
      default:
        view = new View(<ICreateViewOptions>{ tag, ...options });
    }

    if (hookView) {
      hookView(view);
    }

    if (build) {
      if (Array.isArray(build)) {
        const views = build.map((opt) => Factory.view(opt));
        view.render(views);
      } else {
        view.render(Factory.view(build));
      }
    }
    return view;
  }
}
