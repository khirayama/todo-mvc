// TODO: フレームワーク切り出し
// TODO: TodoMVC作成
// global libs
import touchable from '../libs/touchable'; // want to know best practice...

import TodoTextInput from './components/TodoTextInput';
import TodoList from './components/TodoList';

let todoTextInputElements = document.querySelectorAll('#new-todo');
const todoTextInput = new TodoTextInput(todoTextInputElements[0]);

let todoListElements = document.querySelectorAll('#todo-list');
const todoList = new TodoList(todoListElements[0]);

