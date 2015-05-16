import 'babel/polyfill';
import Observer from './Observer';
import AppDispatcher from './AppDispatcher';

const CHANGE_EVENT = 'CHANGE';

export default class Store extends Observer {
  constructor(actions) {
    super();
    for (let key in actions) {
      if (!{}.hasOwnProperty.call(actions, key)) return false;
      let action = actions[key];
      this.register(key, action);
    }
  }
  dispatchChange() {
    this.dispatch(CHANGE_EVENT);
  }
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
  register(key, action) {
    AppDispatcher.on(key, (data) => {
      action(data);
      this.dispatchChange();
    });
  }
}

