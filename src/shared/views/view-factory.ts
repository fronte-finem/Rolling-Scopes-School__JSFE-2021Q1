import { BtnView } from './btn/btn';
import { ICreateImgOptions, ImgView } from './img/img';
import { ICreateLinkOptions, LinkView } from './link/link';
import { ICreateViewOptions, View } from './view';

export interface IBuildViewOptions extends ICreateViewOptions {
  build?: IBuildViewOptions | IBuildViewOptions[];
  hookView?: (view: View<HTMLElement>) => void;
}

export function viewFactory({
  tag,
  build,
  hookView,
  ...options
}: IBuildViewOptions): View {
  let view: View;

  switch (tag) {
    case 'a':
      view = new LinkView(<ICreateLinkOptions>options);
      break;
    case 'img':
      view = new ImgView(<ICreateImgOptions>options);
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
      const views = build.map((opt) => viewFactory(opt));
      view.render(views);
    } else {
      view.render(viewFactory(build));
    }
  }
  return view;
}
