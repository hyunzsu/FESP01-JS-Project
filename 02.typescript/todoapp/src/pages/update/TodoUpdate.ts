import axios from "axios";
import TodoDelete from "../delete/TodoDelete";
import fetchDetailData from "../fetch/fetchDetailData";

/* [수정 모드] & [저장 모드] 변경 함수 */
const TodoUpdate = (_id: number, editButton: HTMLButtonElement, deleteButton: HTMLButtonElement, title: HTMLInputElement, content: HTMLTextAreaElement) => {
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
  deleteTodo(_id, deleteButton, editButton, title, content);
};

/* 수정 가능 모드 세팅*/
const enableEditMode = (editButton: HTMLButtonElement, deleteButton: HTMLButtonElement, title: HTMLInputElement, content: HTMLTextAreaElement) => {
  title.removeAttribute("disabled");
  content.removeAttribute("disabled");
  title.focus();
  editButton.textContent = "완료";
  deleteButton.textContent = "취소";
};

/* 수정 불가(취소) 모드 세팅  */
const cancelEditMode = (editButton: HTMLButtonElement, deleteButton: HTMLButtonElement, title: HTMLInputElement, content: HTMLTextAreaElement) => {
  title.setAttribute("disabled", "true");
  content.setAttribute("disabled", "true");
  editButton.textContent = "수정";
  deleteButton.textContent = "삭제";
};

/* 수정 내역 전송 */
const saveEditedTodo = async (_id: number, editButton: HTMLButtonElement, deleteButton: HTMLButtonElement, title: HTMLInputElement, content: HTMLTextAreaElement) => {
  const updatedData = {
    title: title.value,
    content: content.value,
  };

  // 수정 전의 값을 불러오는 코드
  const detailData = await fetchDetailData(_id);
  let prevTitleValue = detailData.title;
  let prevContentValue = detailData.content;

  try {
    if (title.value === "" || content.value === "") {
      alert("제목과 내용을 모두 작성해주세요!");
      return;
    }

    if (prevTitleValue !== title.value || prevContentValue !== content.value) {
      const response = await axios.patch(`http://localhost:33088/api/todolist/${_id}`, updatedData);
      cancelEditMode(editButton, deleteButton, title, content);
      console.log("수정해서 전송한 내역 -> ", response.data);
      if (response.status === 200) {
        // span에 접근 & span값을 최신화로 접근
        const titleSpanValue = document.getElementById(String(_id))!.lastChild;
        titleSpanValue!.textContent = title.value;
        // updatedTime 최신화
        const updatedTime = document.querySelector(".time");
        updatedTime!.textContent = response.data.item.updatedAt;
      }
    } else {
      alert("변경된 내용이 없습니다!");
      return;
    }
  } catch (error) {
    console.error("수정내역 전송 에러", error);
  }
};

/* 삭제 <-> 취소 버튼 기능 */
const deleteTodo = (_id: number, deleteButton: HTMLButtonElement, editButton: HTMLButtonElement, title: HTMLInputElement, content: HTMLTextAreaElement) => {
  deleteButton.addEventListener("click", async () => {
    if (deleteButton.textContent === "삭제") {
      TodoDelete(_id);
    } else {
      const detailData = await fetchDetailData(_id);
      title.value = detailData.title;
      content.value = detailData.content;
      cancelEditMode(editButton, deleteButton, title, content);
    }
  });
};

export default TodoUpdate;
