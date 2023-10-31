import Header from "../../layout/Header.js";
import Footer from "../../layout/Footer.js";
import TodoDelete from "../delete/TodoDelete.js";

const TodoInfo = async ({ _id }) => {
  try {
    /* 1. 페이지 요소 생성 및 초기 세팅 */
    const pageElements = createPageElements();

    /* 2. 서버에 있는 TODO 상세 데이터 가져옴 */
    const detailData = await fetchDetailData(_id);

    /* 3. 서버에 있는 데이터 값을 각 요소에 넣어줌 */
    setData(pageElements, detailData);

    /* 4. [수정] <-> [저장] 모드 기능 함수 */
    editSaveMode(
      _id,
      detailData,
      pageElements.editButton,
      pageElements.deleteButton,
      pageElements.title,
      pageElements.content
    );

    return pageElements.detailContainer;
  } catch (err) {
    console.log(err.message);
  }
};

/* 페이지 요소 생성 및 초기 세팅 */
const createPageElements = () => {
  const detailContainer = document.createElement("div");
  const title = document.createElement("input");
  const createTime = document.createElement("div");
  const content = document.createElement("input");
  const buttonContainer = document.createElement("div");
  const deleteButton = document.createElement("button");
  const editButton = document.createElement("button");

  detailContainer.setAttribute("id", "page");
  title.setAttribute("disabled", true);
  content.setAttribute("disabled", true);

  deleteButton.textContent = "삭제";
  editButton.textContent = "수정";

  buttonContainer.appendChild(editButton);
  buttonContainer.appendChild(deleteButton);

  detailContainer.appendChild(title);
  detailContainer.appendChild(createTime);
  detailContainer.appendChild(content);
  detailContainer.appendChild(buttonContainer);

  return {
    detailContainer,
    title,
    createTime,
    content,
    editButton,
    deleteButton,
  };
};

/* 상세 내용 받아오는 함수 */
const fetchDetailData = async (_id) => {
  const response = await axios(`http://localhost:33088/api/todolist/${_id}`);
  return response.data.item;
};

/* 받아온 데이터를 요소에 입력해주는 함수 */
const setData = (pageElements, detailData) => {
  pageElements.title.value = detailData.title;
  pageElements.content.value = detailData.content;
  pageElements.createTime.textContent = detailData.createdAt;
};

/* [수정 모드] & [저장 모드] 변경 함수 */
const editSaveMode = (
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

export default TodoInfo;
