'use strict';
import AppDispatcher from '../../framework/AppDispatcher';

let TodoActions = {
  create: (text) => {
    AppDispatcher.dispatch('TODO_CREATE', {
      text: text
    });
  },
  updateText: (id, text) => {
    AppDispatcher.dispatch('TODO_UPDATE_TEXT', {
      id: id,
      text: text
    });
  },
  toggleComplete: (todo) => {
    let id = todo.id;
    if (todo.complete) {
      AppDispatcher.dispatch('TODO_UNDO_COMPLETE', {
        id: id
      });
    } else {
      AppDispatcher.dispatch('TODO_COMPLETE', {
        id: id
      });
    }
  },
  destroy: (id) => {
    AppDispatcher.dispatch('TODO_DESTROY', {
      id: id
    });
  },
  updateOrders: (from, to) => {
    AppDispatcher.dispatch('TODO_UPDATE_ORDERS', {
      from: from,
      to: to
    });
  }
};
export default TodoActions;
