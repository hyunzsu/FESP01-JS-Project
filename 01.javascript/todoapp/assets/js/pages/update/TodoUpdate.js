import TodoDelete from "../delete/TodoDelete.js";

/* [수정 모드] & [저장 모드] 변경 함수 */
const TodoUpdate = (
  _id,
  detailData,
  editButton,
  deleteButton,
  title,
  content
) => {
  editButton.addEventListener("click", async () => {
    if (editButton.textContent === "수정") {
      /* 수정 가능 모드로 변경 */
      enableEditMode(editButton, deleteButton, title, content);
    } else {
      /* 데이터 저장 + 수정불가 모드로 변경 */
      await saveEditedTodo(_id, editButton, deleteButton, title, content);
    }
  });
  /* 삭제 <-> 취소 버튼 기능 */
  deleteTodo(_id, deleteButton, detailData, editButton, title, content);
};

/* 수정 가능 모드 세팅*/
const enableEditMode = (editButton, deleteButton, title, content) => {
  title.removeAttribute("disabled");
  content.removeAttribute("disabled");
  editButton.textContent = "완료";
  deleteButton.textContent = "취소";
};

/* 수정 불가(취소) 모드 세팅  */
const cancelEditMode = (editButton, deleteButton, title, content) => {
  title.setAttribute("disabled", true);
  content.setAttribute("disabled", true);
  editButton.textContent = "수정";
  deleteButton.textContent = "삭제";
};

/* 수정 내역 전송 */
const saveEditedTodo = async (
  _id,
  editButton,
  deleteButton,
  title,
  content
) => {
  const updatedData = {
    title: title.value,
    content: content.value,
  };
  try {
    const response = await axios.patch(
      `http://localhost:33088/api/todolist/${_id}`,
      updatedData
    );
    cancelEditMode(editButton, deleteButton, title, content);
    console.log("수정해서 전송한 내역 -> ", response.data);
  } catch (error) {
    console.error("수정내역 전송 에러", error);
  }
};

/* 삭제 <-> 취소 버튼 기능 */
const deleteTodo = (
  _id,
  deleteButton,
  detailData,
  editButton,
  title,
  content
) => {
  deleteButton.addEventListener("click", () => {
    if (deleteButton.textContent === "삭제") {
      TodoDelete(_id);
    } else {
      title.value = detailData.title;
      content.value = detailData.content;
      cancelEditMode(editButton, deleteButton, title, content);
    }
  });
};

export default TodoUpdate;
