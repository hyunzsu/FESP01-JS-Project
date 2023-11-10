import { useState } from "react";

const Header = () => {
  /* 
  // 필터 함수
  function filter(active: boolean, completed: boolean, target: EventTarget) {
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
      const todoParent = todo.parentNode as HTMLLIElement;
      const todoChild = todo as HTMLInputElement;
      if (!todoChild.checked) {
        todoParent.style.display = active ? "flex" : "none";
      } else {
        todoParent.style.display = completed ? "flex" : "none";
      }
    });

    // infoContainer가 null일 경우 에러방지
    if (infoContainer) {
      infoContainer!.style.display = "none";
      focusItem?.classList.remove("focus-item");
    }

    // registContainer가 null일 경우 에러방지
    if (registContainer) {
      registContainer.style.display = "none";
    }
  }

  allBtn.addEventListener("click", (e) => {
    filter(true, true, e.target as HTMLButtonElement);
  });

  activeBtn.addEventListener("click", (e) =>
    filter(true, false, e.target as HTMLButtonElement)
  );

  completedBtn.addEventListener("click", (e) =>
    filter(false, true, e.target as HTMLButtonElement)
  );
 */

  function filter(e) {
    console.log(e.target);
  }

  return (
    <header>
      <h1>TODO</h1>
      <div>
        <button className="active" onClick={filter}>
          All
        </button>
        <button onClick={filter}>Active</button>
        <button onClick={filter}>Completed</button>
      </div>
    </header>
  );
};

export default Header;
