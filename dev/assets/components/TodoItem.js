'use strict';
import TodoActions from '../actions/TodoActions';
import Component from '../framework/Component';

export default class TodoItem extends Component {
  constructor(todo) {
    super('template', {
      isEditing: false,
      touches: []
    }, {
      todo: todo
    });
  }
  handleEvents() {
    this.on('click', '.toggle', () => {
      TodoActions.toggleComplete(this.props.todo);
    });
    this.on('click', '.destroy', () => {
      TodoActions.destroy(this.props.todo.id);
    });
    this.on('click', 'label', () => {
      this.setState({ isEditing: true });
      this.el.querySelector('.edit').focus();
    });
    this.on('blur', '.edit', (event) => {
      let text = event.target.value;
      this.setState({ isEditing: false });
      TodoActions.updateText(this.props.todo.id, text);
    });
    this.on('keyup', '.edit', (event) => {
      if(event.keyCode !== 13) return;
      this.el.querySelector('.edit').blur();
    });
    this.on('touchmove', (event) => {
      event.preventDefault();
      this.setState({ touches: event.touches }, false);
    });
    this.on('touchend', () => {
      this.onTouchmove();
    });
    this.on('select', 'label', (event) => {
      this.onSelect();
    });
  }
  template() {
    return `<li class="${this._cx({
      'completed': this.props.todo.complete,
      'editing': this.state.isEditing
    })}">
      <div class="Component">
        <div class="toggle"></div>
        ${this.inputTemplate()}
        <div class="destroy"></div>
      </div>
    </li>`;
  }
  inputTemplate() {
    if(this.state.isEditing) {
      return `<input class="edit" type="text" value="${this.props.todo.text}"></input>`;
    } else {
      return `<label>${this.props.todo.text}</label>`;
    }
  }
  onTouchmove() {
    if(!this.state.touches.length) return;
    let todo = this.props.todo;
    let touchesPos = this.state.touches[0];
    let targetElement = document.elementFromPoint(touchesPos.clientX, touchesPos.clientY);
    let event = new Event('select');
    event.moveTodo = todo;
    targetElement.dispatchEvent(event);
  }
  onSelect() {
    let from = event.moveTodo.order;
    let to = this.props.todo.order;
    TodoActions.updateOrders(from, to);
  }
}
