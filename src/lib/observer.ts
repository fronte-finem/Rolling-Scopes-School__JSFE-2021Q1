type Listeners = Record<string, Function[]>;

class Observer {
  static singleton: Observer;
  listeners: Listeners;

  private constructor() {
    this.listeners = {};
    console.log("Observer constructor called!", this);
  }

  public static getInstance(): Observer {
    if (!Observer.singleton) {
        Observer.singleton = new Observer();
    }
    return Observer.singleton;
}

  sub(type: string, handler: Function) {
    this.listeners[type] || (this.listeners[type] = []);
    this.listeners[type].push(handler);
  }

  unsub(type: string, handler: Function) {
    if(!this.listeners[type]) return;
    this.listeners[type] = this.listeners[type].filter(obs => obs !== handler);
  }

  fire(type: string, ...args: any[]) {
    if(!this.listeners[type]) return;
    this.listeners[type].forEach(handler => handler.apply(null, args));
  }
}

export const observer = Observer.getInstance();
