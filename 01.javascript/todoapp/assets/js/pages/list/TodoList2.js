import TodoRegist from '../regist/TodoRegist.js';

const TodoList2 = async () => {
  const page = document.createElement('div');
  const todoList = document.createElement('ul');
  const registBtn = document.createElement('button');
  const registTitle = document.createTextNode('등록');
  registBtn.appendChild(registTitle);

  registBtn.addEventListener('click', () => {
    const todoRegist = document.querySelector('.todo-regist');
    if (todoRegist.style.display === 'none') {
      return (todoRegist.style.display = 'block');
    }
    // todoRegist.style.display = "none";
  });

  try {
    const response = await axios('http://localhost:33088/api/todolist');
    const { items } = response.data;

    items.forEach((item) => {
      const todoItem = document.createElement('li');
      const todoLink = document.createElement('a');
      todoLink.setAttribute('href', `info?_id=${item._id}`);

      // 체크박스
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = item.done;
      checkbox.addEventListener('change', async (e) => {
        console.log(e.target.checked);
        try {
          await axios.patch(`http://localhost:33088/api/todolist/${item._id}`, {
            done: e.target.checked,
          });
        } catch (err) {
          console.error(err)
        }
      });

      todoItem.appendChild(checkbox);
      todoItem.appendChild(todoLink);
      todoList.appendChild(todoItem);

      const title = document.createTextNode(item.title);
      todoLink.appendChild(title);
    });
  } catch (err) {
    console.error(err);
  }

  page.appendChild(registBtn);
  page.appendChild(todoList);
  page.appendChild(TodoRegist());

  return page;
};

export default TodoList2;
