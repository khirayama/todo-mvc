export default class Component {
  // TODO: componentsの破棄（イベント消したり）
  // TODO: animationを考慮したAPIの追加（animationってなんかダサいからUIとかにしよう）
  // TODO: renderメソッドとtemplateメソッドをうまく抽象化して吸収したほうがいい
  // TODO: html escape
  // TODO: classの付け替えとかはサポートcxだと再レンダリングしてしまい、アニメーションがきつい
  // TODO: classを自動で振るようにしてみるか？TodoItemだったら.todo-item的な？extendsまで
  constructor(el, state = {}, props = {}) {
    this.state = state;
    this.props = props;
    if (typeof el === 'object') {
      this.el = el;
    } else if (typeof el === 'string') {
      this.el = this._createElements(this.template());
    }
    if (this.handleEvents) this.handleEvents();
  }
  setState(state, update = true) {
    this.state = Object.assign({}, this.state, state);
    if (update) this._update();
  }
  on(eventType, selector, callback) {
    if (arguments.length === 2) {
      let _callback = selector;
      this.el.addEventListener(eventType, _callback);
    } else if (arguments.length === 3) {
      let target = this.el.querySelector(selector);
      if (target) target.addEventListener(eventType, callback);
    }
  }
  _update() {
    if (!this.template) return;
    let parentNode = this.el.parentNode;
    let tmp = this._createElements(this.template());
    parentNode.replaceChild(tmp, this.el);
    this.el = tmp;
    this.handleEvents();
  }
  _createElements(template) {
    let tmp = document.implementation.createHTMLDocument();
    tmp.body.innerHTML = template;
    return tmp.body.children[0];
  }
  _cx(classNames) {
    let classStr = [];
    for (let className in classNames) {
      if (classNames[className]) classStr.push(className);
    }
    return classStr.join(' ');
  }
}
