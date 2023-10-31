import TodoRegist from "../regist/TodoRegist.js";
import TodoInfo from "../info/TodoInfo.js";

const TodoList = async () => {
  const page = document.createElement("div");
  const todoList = document.createElement("ul");
  const registBtn = document.createElement("button");
  const registTitle = document.createTextNode("등록");
  const infoArea = document.createElement("section");
  registBtn.appendChild(registTitle);

  // 등록버튼 클릭 이벤트 처리
  registBtn.addEventListener("click", () => {
    const todoRegist = document.querySelector(".todo-regist");
    if (todoRegist.style.display === "none") todoRegist.style.display = "block";
  });

  // 각 Todo 아이템을 생성하는 함수
  const createTodoItem = (item) => {
    const todoItem = document.createElement("li");
    // 체크박스 생성
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.done;
    checkbox.addEventListener("change", async (e) => {
      // 체크박스 변경 시 서버에 업데이트 요청
      try {
        await axios.patch(`http://localhost:33088/api/todolist/${item._id}`, {
          done: e.target.checked,
        });
      } catch (err) {
        console.error(err);
      }
    });

    todoItem.addEventListener("click", async (e) => {
      // 아이템 클릭 시 상세 정보 표시
      if (e.target !== checkbox) {
        infoArea.innerHTML = "";
        infoArea.appendChild(await TodoInfo({ _id: item._id }));
      }
    });

    todoItem.appendChild(checkbox);
    todoList.appendChild(todoItem);

    const title = document.createTextNode(item.title);
    todoItem.appendChild(title);
  };

  // 데이터를 가져와 화면에 표시하는 함수
  const initializeTodoList = async () => {
    try {
      const response = await axios("http://localhost:33088/api/todolist");
      const { items } = response.data;
      items.forEach((item) => createTodoItem(item));
    } catch (err) {
      console.error(err);
    }
  };

  // 페이지 초기화 함수 호출
  initializeTodoList();

  page.appendChild(registBtn);
  page.appendChild(todoList);
  page.appendChild(infoArea);
  page.appendChild(TodoRegist());

  return page;
};
export default TodoList;
