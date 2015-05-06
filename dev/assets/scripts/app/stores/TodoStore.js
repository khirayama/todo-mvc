'use strict';
import 'babel/polyfill';
import Store from '../../framework/Store';

class Todo extends Store {
  constructor() {
    super({
      'TODO_CREATE': (action) => {
        let text = action.text.trim();
        if (text !== '') this._create(text);
      },
      'TODO_UNDO_COMPLETE': (action) => {
        this._update(action.id, {complete: false});
      },
      'TODO_COMPLETE': (action) => {
        this._update(action.id, {complete: true});
      },
      'TODO_DESTROY': (action) => {
        this._destroy(action.id);
      },
      'TODO_UPDATE_TEXT': (action) => {
        let text = action.text.trim();
        if (text !== '') {
          this._update(action.id, {text: text});
        }
      },
      'TODO_UPDATE_ORDERS': (action) => {
        this._updateOrders(action.from, action.to);
      }
    });
    this._todos = {};
  }
  _create(text) {
    let id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    let order = Object.keys(this._todos).length;
    this._todos[id] = {
      id: id,
      complete: false,
      text: text,
      order: order
    };
  }
  _update(id, updates) {
    this._todos[id] = Object.assign({}, this._todos[id], updates);
  }
  _destroy(id) {
    delete this._todos[id];
  }
  _updateOrders(from, to) {
    for(let id in this._todos) {
      let todo = this._todos[id];
      if(from > to) {
        if(todo.order >= to && todo.order < from) {
          todo.order += 1;
        } else if(todo.order === from) {
          todo.order = to;
        }
      } else if(to > from) {
        if(todo.order > from && todo.order <= to) {
          todo.order -= 1;
        } else if(todo.order === from) {
          todo.order = to;
        }
      }
    }
  }
  getAll() {
    let todos = [];
    for(let key in this._todos) {
      let todo = this._todos[key];
      todos.push(todo);
    }
    todos.sort(function(a, b) {
      let x = a.order;
      let y = b.order;
      return (x > y) ? 1 : -1;
    });
    return todos;
  }
}
export default new Todo();
