const Header = function (title) {
  const headerNode = document.createElement("header");
  const h1 = document.createElement("h1");
  const headerTitle = document.createTextNode(title);
  h1.appendChild(headerTitle);

  const filterBtns = document.createElement("div");
  const allBtn = document.createElement("button");
  allBtn.innerHTML = "All";
  const activeBtn = document.createElement("button");
  activeBtn.innerHTML = "Active";
  const completedBtn = document.createElement("button");
  completedBtn.innerHTML = "Completed";
  filterBtns.appendChild(allBtn);
  filterBtns.appendChild(activeBtn);
  filterBtns.appendChild(completedBtn);

  function filter(active, completed) {
    const todoList = document.querySelectorAll("input[type=checkbox]");
    const infoContainer = document.querySelector(".info-container");

    todoList.forEach((todo) => {
      if (!todo.checked) {
        todo.parentNode.style.display = active ? "flex" : "none";
      } else {
        todo.parentNode.style.display = completed ? "flex" : "none";
      }
    });

    infoContainer.style.display = "none";
  }
  allBtn.addEventListener("click", () => filter(true, true));
  activeBtn.addEventListener("click", () => filter(true, false));
  completedBtn.addEventListener("click", () => filter(false, true));

  headerNode.appendChild(h1);
  headerNode.appendChild(filterBtns);
  return headerNode;
};

export default Header;
