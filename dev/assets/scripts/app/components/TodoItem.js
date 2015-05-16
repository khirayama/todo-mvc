import TodoActions from '../actions/TodoActions';
import Component from '../../framework/Component';

export default class TodoItem extends Component {
  constructor(todo) {
    super('template', {
      isEditing: false,
      isSelect: false,
      touches: []
    }, {
      todo: todo
    });
  }
  handleEvents() {
    this.on('tap', 'label', () => {
      this.setState({ isEditing: true });
      this.el.querySelector('.edit').focus();
    });
    this.on('swiperight', 'label', () => {
      TodoActions.toggleComplete(this.props.todo);
    });
    this.on('swipeleft', 'label', () => {
      TodoActions.destroy(this.props.todo.id);
    });
    this.on('blur', '.edit', (event) => {
      let text = event.target.value;
      this.setState({ isEditing: false });
      TodoActions.updateText(this.props.todo.id, text);
    });
    this.on('keyup', '.edit', (event) => {
      if (event.keyCode !== 13) return;
      this.el.querySelector('.edit').blur();
    });
    this.on('touchmove', (event) => {
      event.preventDefault();
      this.onTouchmove();
    });
    this.on('touchend', () => {
      this.onTouchend();
    });
    this.on('touchhold', 'label', () => {
      this.setState({ isSelect: true }, false);
      this.el.classList.add('selecting');
    });
    this.on('select', 'label', (event) => {
      this.onSelect(event);
    });
  }
  template() {
    return `<li class="${this._cx({
      'completed': this.props.todo.complete,
      'editing': this.state.isEditing
    })}">
      ${this.inputTemplate()}
    </li>`;
  }
  inputTemplate() {
    let dom = '';
    if (this.state.isEditing) {
      dom = `<input class="edit" type="text" value="${this.props.todo.text}"></input>`;
    } else {
      dom = `<label>${this.props.todo.text}</label>`;
    }
    return dom;
  }
  onTouchmove() {
    this.setState({ touches: event.touches }, false);
  }
  onTouchend() {
    if (!this.state.touches.length) return;
    // if(!this.state.touches.length || !this.state.isSelect) return;
    let todo = this.props.todo;
    let touchesPos = this.state.touches[0];
    let targetElement = document.elementFromPoint(touchesPos.clientX, touchesPos.clientY);
    let event = new Event('select');
    event.moveTodo = todo;
    targetElement.dispatchEvent(event);
  }
  onSelect(event) {
    let from = event.moveTodo.order;
    let to = this.props.todo.order;
    TodoActions.updateOrders(from, to);
  }
}
