let Observer1 = class Observer {
  constructor() {
    this.listeners = {};
    console.log('Observer constructor called!', this);
  }
  static getInstance() {
    if (!Observer.singleton) {
      Observer.singleton = new Observer();
    }
    return Observer.singleton;
  }
  sub(type, handler) {
    this.listeners[type] || (this.listeners[type] = []);
    this.listeners[type].push(handler);
  }
  unsub(type, handler) {
    if (!this.listeners[type]) return;
    this.listeners[type] = this.listeners[type].filter(
      (obs) => obs !== handler
    );
  }
  fire(type, ...args) {
    if (!this.listeners[type]) return;
    this.listeners[type].forEach((handler) => handler.apply(null, args));
  }
};
export const observer = Observer1.getInstance();
