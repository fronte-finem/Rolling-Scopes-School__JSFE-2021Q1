
export { Observer };

class Observer {
  constructor() {
    this.listeners = new Map();
  }

  addListener(type, listener) {
    if (!this.listeners.has(type)) this.listeners.set(type, []);
    this.listeners.get(type).push(listener);
  }

  delListener(type, listener) {
    if (!this.listeners.has(type)) return;
    this.listeners.set(type, this.listeners.get(type).filter(func => func !== listener));
  }

  dispatch(type, data, context) {
    if (!this.listeners.has(type)) return;
    this.listeners.get(type).forEach((listener) => listener.call(context, data));
  }

}
