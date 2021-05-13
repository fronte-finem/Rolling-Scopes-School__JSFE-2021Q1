import { IViewOptions } from "./types";
import View from "./view";
import BtnView from "../views/btn/btn";
import LinkView, { ICreateLinkOptions } from "../views/link/link";


export default abstract class Factory {
  static view({ tag, childs, ...options }: IViewOptions): View {
    let view: View;
  
    switch (tag) {
      case 'a':
        view = new LinkView(<ICreateLinkOptions>options);
        break;
      case 'button':
        view = new BtnView(options);
        break;
      default:
        view = new View(options);
    }
  
    if (childs) {
      const views = childs.map((child) =>
        child instanceof View ? child : Factory.view(<IViewOptions>child)
      );
      view.render(views);
    }
    return view;
  }
}
