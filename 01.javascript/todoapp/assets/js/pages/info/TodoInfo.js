import Header from "../../layout/Header.js";
import Footer from "../../layout/Footer.js";
import TodoUpdate from "../update/TodoUpdate.js";
// import TodoDelete from "../delete/TodoDelete.js";

const TodoInfo = async ({ _id }) => {
  try {
    /* 1. 페이지 요소 생성 및 초기 세팅 */
    const pageElements = createPageElements();

    /* 2. 서버에 있는 TODO 상세 데이터 가져옴 */
    const detailData = await fetchDetailData(_id);

    /* 3. 서버에 있는 데이터 값을 각 요소에 넣어줌 */
    setData(pageElements, detailData);

    /* 4. Todo Update 수정, 저장 기능 */
    TodoUpdate(
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

  title.setAttribute("class", "title-input");
  title.setAttribute("disabled", true);
  createTime.setAttribute("class", "time");
  content.setAttribute("class", "content-input");
  content.setAttribute("disabled", true);

  detailContainer.setAttribute("class", "info-container");
  buttonContainer.setAttribute("class", "button-container");
  deleteButton.setAttribute("class", "info-button delete");
  editButton.setAttribute("class", "info-button edit");

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

export default TodoInfo;
