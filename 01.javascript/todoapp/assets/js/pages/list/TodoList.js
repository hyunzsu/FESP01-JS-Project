import TodoRegist from "../regist/TodoRegist.js";
import TodoInfo from "../info/TodoInfo.js";

const TodoList = async () => {
  const page = document.createElement("div");
  const todoList = document.createElement("ul");
  const registBtn = document.createElement("button");
  const registTitle = document.createTextNode("할 일 추가하기");
  const infoArea = document.createElement("section");
  registBtn.appendChild(registTitle);
  page.classList.add("contents-container");
  registBtn.classList.add("regist-button");


  // 등록버튼 클릭 이벤트 처리
  registBtn.addEventListener("click", () => {
    const todoRegist = document.querySelector(".regist-container");
    if (todoRegist.style.display === "none") todoRegist.style.display = "block";

    /* todo 상세보기가 열려있으면 삭제 후 등록 페이지 노출 */
    const todoInfo = document.querySelector(".info-container");
    if (todoInfo) {
      todoInfo.remove();
    }
  });

  // 각 Todo 아이템을 생성하는 함수
  const createTodoItem = (item) => {
    const todoItem = document.createElement("li");
    todoItem.id = item._id; //id속성값 추가
    todoItem.classList.add("todo-item");

    // 체크박스 생성
    const checkbox = document.createElement("input");
    checkbox.classList.add("checkbox-item");
    checkbox.type = "checkbox";
    checkbox.checked = item.done;

    // span 태그 생성 및 텍스트 내용
    const title = document.createElement('span');
    title.classList.add('title-item');
    title.innerText = item.title;

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
      /* 등록이 열려 있으면 none으로 처리 후 상세 페이지 열기 */
      const todoRegist = document.querySelector(".regist-container");
      if (todoRegist.style.display === "block") {
        todoRegist.style.display = "none";
      }

      // 이미 focus-item 클래스를 가지고 있는 ul 요소를 찾아서 클래스 제거
      const currentFocusItem = document.querySelector('.focus-item');
      if (currentFocusItem) {
        currentFocusItem.classList.remove('focus-item');
      }
      todoItem.classList.add('focus-item');


      // 아이템 클릭 시 상세 정보 표시
      if (e.target !== checkbox) {
        infoArea.innerHTML = "";
        infoArea.appendChild(await TodoInfo({ _id: item._id }));
      }
    });

    todoItem.appendChild(checkbox);
    todoItem.appendChild(title);
    todoList.appendChild(todoItem);
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
