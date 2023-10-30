import Header from "../../layout/Header.js";
import Footer from "../../layout/Footer.js";
import TodoDelete from "../delete/TodoDelete.js";

const TodoInfo = async ({ _id }) => {
  try {
    const response = await axios(`http://localhost:33088/api/todolist/${_id}`);
    const item = response.data.item;
    // console.log(response);

    const page = document.createElement("div");
    page.setAttribute("id", "page");

    const title = document.createElement("input");
    title.setAttribute("disabled", true);
    const content = document.createElement("input");
    content.setAttribute("disabled", true);

    const createTime = document.createElement("div");
    const buttonContainer = document.createElement("div");

    const deleteButton = document.createElement("button");
    const editButton = document.createElement("button");

    title.value = `${item.title}`;
    content.value = `${item.content}`;
    createTime.textContent = `${item.createdAt}`;
    deleteButton.textContent = "삭제";
    editButton.textContent = "수정";

    /* 삭제, 취소 기능 */
    deleteButton.addEventListener("click", () => {
      // 버튼이 '삭제 모드'일 경우 TodoDelete 기능 동작
      if (deleteButton.textContent === "삭제") {
        TodoDelete(_id);
      } else {
        // '수정 모드'일 경우, 값을 초기화학고 input 속성 비활성화
        title.value = `${item.title}`;
        content.value = `${item.content}`;
        title.setAttribute("disabled", true);
        content.setAttribute("disabled", true);

        deleteButton.textContent = "삭제";
        editButton.textContent = "수정";
      }
    });

    /* 수정-삭제 기능 이벤트 함수 */
    editButton.addEventListener("click", async (e) => {
      // 수정버튼을 누르면 [제목],[내용] input에 disabled 속성 삭제
      if (editButton.textContent == "수정") {
        /* 1. input의 disabled 속성 삭제 */
        console.log("수정 버튼 클릭 이벤트 발생");
        title.removeAttribute("disabled");
        content.removeAttribute("disabled");

        /* 2. [수정] -> [완료]로 변경, [삭제] -> [취소]로 글자 수정 */
        editButton.textContent = "완료";
        deleteButton.textContent = "취소";
      } else {
        /* 1. 완료 버튼을 누르면 [제목],[내용] input에 disabled 속성 추가 */
        title.setAttribute("disabled", true);
        content.setAttribute("disabled", true);

        /* 1. [완료] -> [수정]로 변경, [취소] -> [삭제]로 글자 수정 */
        editButton.textContent = "수정";
        deleteButton.textContent = "삭제";

        /* editData에 title, content 값 전달 */
        let editData = {
          title: `${title.value}`,
          content: `${content.value}`,
        };
        console.log(editData);
        editTodo(_id, editData);
      }
    });

    /* 수정한 내용 axios.patch를 통해 전송하는 함수 */
    const editTodo = async (_id, updateData) => {
      try {
        const response = await axios.patch(
          `http://localhost:33088/api/todolist/${_id}`,
          updateData
        );
        console.log("수정해서 전송한 내역 -> ", response.data);
      } catch (error) {
        console.error("수정 에러", error);
      }
    };

    let editCheck = buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

    page.appendChild(buttonContainer);
    page.appendChild(title);
    page.appendChild(createTime);
    page.appendChild(content);

    return page;
  } catch (err) {
    console.log(err.message);
  }
};

export default TodoInfo;
