import Header from "../../layout/Header.js";
import Footer from "../../layout/Footer.js";

const TodoInfo = async ({ _id }) => {
  try {
    const response = await axios(`http://localhost:33088/api/todolist/${_id}`);
    const item = response.data.item;

    const page = document.createElement("div");
    page.setAttribute("id", "page");

    const title = document.createElement("div");
    const content = document.createElement("div");
    const createTime = document.createElement("div");
    const buttonContainer = document.createElement("div");

    const deleteButton = document.createElement("button");
    const editButton = document.createElement("button");

    title.textContent = `${item.title}`;
    content.textContent = `${item.content}`;
    createTime.textContent = `${item.createdAt}`;
    deleteButton.textContent = "삭제";
    editButton.textContent = "수정";

    buttonContainer.appendChild(editButton);
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
