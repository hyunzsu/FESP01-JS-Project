import Header from "../../layout/Header.js";
import Footer from "../../layout/Footer.js";

const TodoInfo = async ({ _id }) => {
  try {
    /* 상세내용 마크업 */
    const page = document.createElement("div");
    const title = document.createElement("input");
    const content = document.createElement("input");
    const createTime = document.createElement("div");

    page.setAttribute("id", "page");
    title.setAttribute("disabled", true);
    content.setAttribute("disabled", true);

    /* [삭제] [수정] 버튼 마크업 */
    const buttonContainer = document.createElement("div");
    const deleteButton = document.createElement("button");
    const editButton = document.createElement("button");

    deleteButton.textContent = "삭제";
    editButton.textContent = "수정";

    /* 상세 내용 받아오기  */
    const response = await axios(`http://localhost:33088/api/todolist/${_id}`);
    const item = response.data.item;

    title.value = `${item.title}`;
    content.value = `${item.content}`;
    createTime.textContent = `${item.createdAt}`;

    /* 수정-삭제 기능 이벤트 함수 */
    editButton.addEventListener("click", async (e) => {
      /* A. [수정] 버튼을 누르면 [제목],[내용]의 input에서 disabled 속성 삭제 */
      if (editButton.textContent == "수정") {
        title.removeAttribute("disabled");
        content.removeAttribute("disabled");

        /* A-1. [수정] -> [완료]로 변경, [삭제] -> [취소]로 글자 수정 */
        editButton.textContent = "완료";
        deleteButton.textContent = "취소";
      } else {
        /* B. [완료] 버튼을 누르면 [제목],[내용] input에 disabled 속성 추가 */
        title.setAttribute("disabled", true);
        content.setAttribute("disabled", true);

        /* B=1. [완료] -> [수정]로 변경, [취소] -> [삭제]로 글자 수정 */
        editButton.textContent = "수정";
        deleteButton.textContent = "삭제";

        /* C. 수정한 내용 서버로 전송 */
        const updatedData = {
          title: `${title.value}`,
          content: `${content.value}`,
        };
        editTodo(_id, updatedData);
      }
    });

    /* 수정 내용 전송하는 함수 */
    const editTodo = async (_id, updatedData) => {
      try {
        const response = await axios.patch(
          `http://localhost:33088/api/todolist/${_id}`,
          updatedData
        );
        console.log("수정해서 전송한 내역 -> ", response.data);
      } catch (error) {
        console.error("수정내역 전송 에러", error);
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
