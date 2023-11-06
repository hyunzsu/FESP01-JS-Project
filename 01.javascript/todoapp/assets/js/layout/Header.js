const Header = function () {
  /* Header 컴포넌트 UI 생성 */
  const headerNode = document.createElement("header");
  const h1 = document.createElement("h1");
  const headerTitle = document.createTextNode("TODO");
  h1.appendChild(headerTitle);

  const filterBtns = document.createElement("div");
  const allBtn = document.createElement("button");
  allBtn.innerHTML = "All";
  allBtn.className = "active";
  const activeBtn = document.createElement("button");
  activeBtn.innerHTML = "Active";
  const completedBtn = document.createElement("button");
  completedBtn.innerHTML = "Completed";
  filterBtns.appendChild(allBtn);
  filterBtns.appendChild(activeBtn);
  filterBtns.appendChild(completedBtn);

  /* Filter 기능 */
  function filter(active, completed, target) {
    const todoList = document.querySelectorAll("input[type=checkbox]");
    const infoContainer = document.querySelector(".info-container");
    const registContainer = document.querySelector(".regist-container");
    const focusItem = document.querySelector(".focus-item");

    // 필터 버튼 색상 추가
    const buttons = filterBtns.querySelectorAll("button");
    buttons.forEach((item) => {
      if (target === item) {
        item.classList.add("active");
      } else {
        item.removeAttribute("class");
      }
    });

    // 필터링 기능
    todoList.forEach((todo) => {
      if (!todo.checked) {
        todo.parentNode.style.display = active ? "flex" : "none";
      } else {
        todo.parentNode.style.display = completed ? "flex" : "none";
      }
    });

    // infoContainer가 null일 경우 에러방지
    if (infoContainer) {
      infoContainer.style.display = "none";
      focusItem?.classList.remove("focus-item");
    }

    // registContainer가 null일 경우 에러방지
    if (registContainer) {
      registContainer.style.display = "none";
    }
  }
  allBtn.addEventListener("click", (e) => {
    filter(true, true, e.target);
  });
  activeBtn.addEventListener("click", (e) => filter(true, false, e.target));
  completedBtn.addEventListener("click", (e) => filter(false, true, e.target));

  headerNode.appendChild(h1);
  headerNode.appendChild(filterBtns);
  return headerNode;
};

export default Header;
