// TODO: フレームワーク切り出し
// TODO: TodoMVC作成
'use strict';
// global libs
import touchable from '../libs/touchable';

import TodoTextInput from './components/TodoTextInput';
import TodoList from './components/TodoList';

let todoTextInputElements = document.querySelectorAll('#new-todo');
new TodoTextInput(todoTextInputElements[0]);

let todoListElements = document.querySelectorAll('#todo-list');
new TodoList(todoListElements[0]);
