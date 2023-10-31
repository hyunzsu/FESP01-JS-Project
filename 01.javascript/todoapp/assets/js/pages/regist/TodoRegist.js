// 할일 등록

const TodoRegist = function () {
  const page = document.createElement("div");
  page.setAttribute("class", "todo-regist");
  page.style.display = "none";
  const saveBtn = document.createElement("button");
  saveBtn.innerHTML = "저장";
  saveBtn.type = "submit";
  const cancelBtn = document.createElement("button");
  cancelBtn.innerHTML = "취소";
  const inputTitle = document.createElement("input");
  const inputContent = document.createElement("input");

  const todoRegistForm = document.createElement("form");
  todoRegistForm.appendChild(saveBtn);
  todoRegistForm.appendChild(cancelBtn);
  todoRegistForm.appendChild(inputTitle);
  todoRegistForm.appendChild(inputContent);

  todoRegistForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const titleValue = inputTitle.value;
    const contentValue = inputContent.value;
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
          inputContent.value = "";
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
    page.style.display = "none";
    inputTitle.value = "";
    inputContent.value = "";
  });

  page.appendChild(todoRegistForm);

  return page;
};

export default TodoRegist;
