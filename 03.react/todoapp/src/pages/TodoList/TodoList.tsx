import { useState, useEffect } from "react";
import axios from "axios";
import { TodoInfo, TodoRegist } from "@/pages/_index";
import { initializeTodoList } from "@/utils/_index";

const TodoList = ({ todoItem, setTodoItem }) => {
  const [pageView, setPageView] = useState({});
  const [showRegist, setShowRegist] = useState(false);

  useEffect(() => {
    initializeTodoList(setTodoItem);
  }, []);

  // 체크박스 업데이트 시 PATCH 통신
  const updateCheckBox = async (e, id) => {
    const target = e.target;

    try {
      await axios.patch(`http://localhost:33088/api/todolist/${id}`, {
        done: target!.checked,
      });
      initializeTodoList();
    } catch (err) {
      console.error(err);
    }
  };

  const openTodoRegist = () => {
    setPageView({ view: "todoRegist" });
    setShowRegist(true);
  };

  const openTodoInfo = (id) => {
    setPageView({ view: "todoInfo", id: id });
  };

  return (
    <div>
      <div className="contents-container">
        <div className="list-container">
          <button className="regist-button" onClick={openTodoRegist}>
            할 일 추가하기
          </button>
          <ul className="todolist">
            {todoItem.map((item) => (
              <li
                key={item._id}
                id={item._id}
                className="todo-item"
                onClick={() => openTodoInfo(item._id)}
              >
                <input
                  className="checkbox-item"
                  type="checkbox"
                  checked={item.done}
                  onChange={(e) => updateCheckBox(e, item._id)}
                />
                <span
                  className={item.done ? "checked title-item" : "title-item"}
                >
                  {item.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
        {pageView.view === "todoRegist" && <TodoRegist showRegist={showRegist} setShowRegist={setShowRegist} />}
        {pageView.view === "todoInfo" && <TodoInfo id={pageView.id} />}
      </div>
    </div>
  );
};

export default TodoList;
