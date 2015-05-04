'use strict';
import TodoStore from '../stores/TodoStore';
import TodoItem from './TodoItem';
import Component from '../framework/Component';

export default class TodoList extends Component {
  constructor(el) {
    super(el, {
      todos: TodoStore.getAll()
    });
    TodoStore.addChangeListener(() => this._onChange());
  }
  _onChange() {
    this.setState({
      todos: TodoStore.getAll()
    });
    this.render();
  }
  render() {
    let todo = {};
    this.el.innerHTML = '';
    for(let i = 0; i < this.state.todos.length; i++) {
      todo = this.state.todos[i];
      this.el.appendChild(new TodoItem(todo).el);
    }
  }
}
