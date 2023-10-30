import Header from '../../layout/Header.js';
import Footer from '../../layout/Footer.js';
import TodoRegist from '../regist/TodoRegist.js';

const TodoList2 = async () => {
  const page = document.createElement('div');
  const todoList = document.createElement('ul');
  const registBtn = document.createElement('button');
  const registTitle = document.createTextNode('등록');
  registBtn.appendChild(registTitle)

  try {
    const response = await axios('http://localhost:33088/api/todolist');
    const { items } = response.data;

    items.forEach((item) => {
      const todoItem = document.createElement('li');
      const todoLink = document.createElement('a');
      todoLink.setAttribute('href', `info?_id=${item._id}`);
      todoList.appendChild(todoItem);
      todoItem.appendChild(todoLink);
      const title = document.createTextNode(item.title);
      todoLink.appendChild(title);
    });
  } catch (err) {
    console.error(err);
  }

  page.appendChild(Header('TODO App 목록 조회'));
  page.appendChild(registBtn)
  page.appendChild(todoList)
  page.appendChild(TodoRegist())
  page.appendChild(Footer());

  return page;
};

export default TodoList2;
