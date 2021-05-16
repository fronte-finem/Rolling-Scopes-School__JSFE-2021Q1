import View, { ICreateViewOptions, IView } from "./view";
import BtnView from "./btn/btn";
import LinkView, { ICreateLinkOptions } from "./link/link";
import { ICreateViewActivableOptions } from "./view-types/view-activable";


export interface IBuildViewOptions extends ICreateViewOptions {
  childs?: (IBuildViewOptions | IView)[];
  hookView?: (view: IView) => void;
}

export default abstract class Factory {
  static view({ tag, childs, hookView, ...options }: IBuildViewOptions): View {
    let view: View;
  
    switch (tag) {
      case 'a':
        view = new LinkView(<ICreateLinkOptions>options);
        break;
      case 'button':
        view = new BtnView(<ICreateViewActivableOptions>options);
        break;
      default:
        view = new View(<ICreateViewOptions>{ tag, ...options });
    }

    if (hookView) {
      hookView(view);
    }
  
    if (childs) {
      const views = childs.map((child) =>
        child instanceof View ? child : Factory.view(<IBuildViewOptions>child)
      );
      view.render(views);
    }
    return view;
  }
}
