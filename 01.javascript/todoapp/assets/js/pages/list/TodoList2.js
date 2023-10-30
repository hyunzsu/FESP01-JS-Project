import TodoRegist from '../regist/TodoRegist.js';
import TodoInfo from '../info/TodoInfo2.js';

const TodoList2 = async () => {
  const page = document.createElement('div');
  const todoList = document.createElement('ul');
  const registBtn = document.createElement('button');
  const registTitle = document.createTextNode('등록');
  const infoArea = document.createElement('section');
  registBtn.appendChild(registTitle);

  registBtn.addEventListener('click', () => {
    const todoRegist = document.querySelector('.todo-regist');
    if (todoRegist.style.display === 'none') {
      return (todoRegist.style.display = 'block');
    }
  });

  try {
    const response = await axios('http://localhost:33088/api/todolist');
    const { items } = response.data;

    items.forEach((item) => {
      const todoItem = document.createElement('li');
      todoItem.addEventListener('click', async () => {
        infoArea.innerHTML = '';
        infoArea.appendChild(await TodoInfo({ _id: item._id }));
      });

      // 체크박스
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = item.done;
      checkbox.addEventListener('change', async (e) => {
        try {
          await axios.patch(`http://localhost:33088/api/todolist/${item._id}`, {
            done: e.target.checked,
          });
        } catch (err) {
          console.error(err);
        }
      });

      todoItem.appendChild(checkbox);
      todoList.appendChild(todoItem);

      const title = document.createTextNode(item.title);
      todoItem.appendChild(title);
    });
  } catch (err) {
    console.error(err);
  }

  page.appendChild(registBtn);
  page.appendChild(todoList);
  page.appendChild(infoArea);
  page.appendChild(TodoRegist());

  return page;
};

export default TodoList2;
