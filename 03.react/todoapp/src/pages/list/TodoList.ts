import axios from "axios";
import TodoInfo from "../info/TodoInfo";
import TodoRegist from "../regist/TodoRegist";

const TodoList = async () => {
  const page = document.createElement("div");
  const listContainer = document.createElement("div");
  const todoList = document.createElement("ul");
  const registBtn = document.createElement("button");
  const registTitle = document.createTextNode("할 일 추가하기");
  const infoArea = document.createElement("section");

  registBtn.appendChild(registTitle);
  page.classList.add("contents-container");
  listContainer.setAttribute("class", "list-container");
  registBtn.classList.add("regist-button");
  todoList.classList.add("todolist");

  // 등록버튼 클릭 이벤트 처리
  registBtn.addEventListener("click", () => {
    const todoRegist = document.querySelector(
      ".regist-container"
    ) as HTMLDivElement;
    if (todoRegist!.style.display === "none")
      todoRegist!.style.display = "block";

    /* todo 상세보기가 열려있으면 삭제 후 등록 페이지 노출 */
    const todoInfo = document.querySelector(".info-container");
    if (todoInfo) {
      const todoItems = document.querySelectorAll(".todo-item");
      todoItems.forEach((item) => item.classList.remove("focus-item"));
      todoInfo.remove();
    }
    const inputTitle = document.querySelector(
      ".regist-title"
    ) as HTMLInputElement;
    inputTitle!.focus();
  });

  // 각 Todo 아이템을 생성하는 함수
  const createTodoItem = (item: TodoItem) => {
    const todoItem = document.createElement("li");
    todoItem.id = item._id.toString(); //id속성값 추가
    todoItem.classList.add("todo-item");

    // 체크박스 생성
    const checkbox = document.createElement("input") as HTMLInputElement;
    checkbox.classList.add("checkbox-item");
    checkbox.type = "checkbox";
    checkbox.checked = item.done;

    // span 태그 생성 및 텍스트 내용
    const title = document.createElement("span");
    title.classList.add("title-item");
    title.innerText = item.title;
    if (item.done) title.classList.add("checked");

    //체크박스 업데이트 기능
    checkbox.addEventListener("change", async (e) => {
      const target = e.target as HTMLInputElement;

      // 체크박스 변경 시 서버에 업데이트 요청
      try {
        await axios.patch(`http://localhost:33088/api/todolist/${item._id}`, {
          done: target!.checked,
        });
        // 취소선 토글
        if (target!.checked) {
          checkbox.nextElementSibling!.classList.add("checked");
        } else {
          checkbox.nextElementSibling!.classList.remove("checked");
        }
      } catch (err) {
        console.error(err);
      }
    });

    todoItem.addEventListener("click", async (e) => {
      /* 등록이 열려 있으면 none으로 처리 후 상세 페이지 열기 */
      const todoRegist = document.querySelector(
        ".regist-container"
      ) as HTMLDivElement;
      if (todoRegist!.style.display === "block") {
        todoRegist!.style.display = "none";
      }

      // 이미 focus-item 클래스를 가지고 있는 ul 요소를 찾아서 클래스 제거
      const currentFocusItem = document.querySelector(".focus-item");
      if (currentFocusItem) {
        currentFocusItem.classList.remove("focus-item");
      }

      todoItem.classList.add("focus-item");

      // 아이템 클릭 시 상세 정보 표시
      if (e.target !== checkbox) {
        infoArea.innerHTML = "";

        const todoInfoContent = (await TodoInfo({
          _id: item._id.toString(),
        })) as HTMLDivElement;
        infoArea.appendChild(todoInfoContent);
      }
    });

    todoItem.appendChild(checkbox);
    todoItem.appendChild(title);
    todoList.appendChild(todoItem);
  };

  // 데이터를 가져와 화면에 표시하는 함수
  const initializeTodoList = async () => {
    try {
      // Axios에 응답받는 item 타입을 제네릭으로 넘겨준다
      const response = await axios<TodoListResponse>(
        "http://localhost:33088/api/todolist"
      );
      const { items } = response.data;
      items.forEach((item) => createTodoItem(item));
    } catch (err) {
      console.error(err);
    }
  };

  // 페이지 초기화 함수 호출
  initializeTodoList();

  listContainer.appendChild(registBtn);
  listContainer.appendChild(todoList);

  page.appendChild(listContainer);
  page.appendChild(infoArea);
  page.appendChild(TodoRegist());

  return page;
};
export default TodoList;
