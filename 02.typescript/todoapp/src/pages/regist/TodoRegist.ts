import axios from "axios";

// 할일 등록
const TodoRegist = function () {
  const registContainer = document.createElement("div");
  const btnContainer = document.createElement("div");
  const saveBtn = document.createElement("button");
  const cancelBtn = document.createElement("button");
  const inputTitle = document.createElement("input");
  const textAreaContent = document.createElement("textarea");
  const todoRegistForm = document.createElement("form");

  registContainer.setAttribute("class", "regist-container");
  btnContainer.setAttribute("class", "button-container");

  saveBtn.setAttribute("class", "regist-buttons save");
  cancelBtn.setAttribute("class", "regist-buttons cancel");

  registContainer.style.display = "none";
  saveBtn.innerHTML = "저장";
  saveBtn.type = "submit";
  cancelBtn.innerHTML = "취소";

  inputTitle.setAttribute("class", "regist-title");
  inputTitle.setAttribute("maxlength", "25");
  textAreaContent.setAttribute("class", "regist-content");
  inputTitle.setAttribute("placeholder", "TODO 제목을 입력하세요");
  textAreaContent.setAttribute("placeholder", "TODO 상세 내용을 입력하세요");

  btnContainer.appendChild(saveBtn);
  btnContainer.appendChild(cancelBtn);

  todoRegistForm.appendChild(btnContainer);
  todoRegistForm.appendChild(inputTitle);
  todoRegistForm.appendChild(textAreaContent);

  todoRegistForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const titleValue = inputTitle.value;
    const contentValue = textAreaContent.value;
    if (titleValue && contentValue) {
      try {
        const response = await axios.post(
          "http://localhost:33088/api/todolist",
          {
            title: titleValue,
            content: contentValue,
          }
        );
        if (response.status === 200) {
          inputTitle.value = "";
          textAreaContent.value = "";
          window.location.reload();
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      alert("제목과 내용을 모두 작성해주세요.");
    }
  });

  cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    registContainer.style.display = "none";
    inputTitle.value = "";
    textAreaContent.value = "";
  });

  registContainer.appendChild(todoRegistForm);

  return registContainer;
};

export default TodoRegist;
