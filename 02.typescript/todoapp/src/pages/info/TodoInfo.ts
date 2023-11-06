import TodoUpdate from "../update/TodoUpdate";
import fetchDetailData from "../fetch/fetchDetailData";
import getErrorMessage from "../../utils/Error";

const TodoInfo = async (_id: number) => {
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
      pageElements.editButton,
      pageElements.deleteButton,
      pageElements.title,
      pageElements.content
    );

    return pageElements.detailContainer;
  } catch (err) {
    console.log(getErrorMessage(err));
  }
};

/* 페이지 요소 생성 및 초기 세팅 */
const createPageElements = () => {
  const detailContainer = document.createElement("div");

  const title = document.createElement("input");
  const createTime = document.createElement("div");
  const content = document.createElement("textarea");
  const buttonContainer = document.createElement("div");
  const deleteButton = document.createElement("button");
  const editButton = document.createElement("button");

  title.setAttribute("class", "title-input");
  // 확인해보기(-)
  title.setAttribute("disabled", "true");
  title.setAttribute("maxlength", "25");
  createTime.setAttribute("class", "time");
  content.setAttribute("class", "content-textarea");
  // 확인해보기(-)
  content.setAttribute("disabled", "true");

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

interface PageElements {
  detailContainer: HTMLDivElement;
  title: HTMLInputElement;
  createTime: HTMLDivElement;
  content: HTMLTextAreaElement;
  editButton: HTMLButtonElement;
  deleteButton: HTMLButtonElement;
}

/* 받아온 데이터를 요소에 입력해주는 함수 */
const setData = (pageElements: PageElements, detailData: TodoItem) => {
  pageElements.title.value = detailData.title;
  pageElements.content.value = detailData.content;
  pageElements.createTime.textContent = detailData.updatedAt;
};

export default TodoInfo;