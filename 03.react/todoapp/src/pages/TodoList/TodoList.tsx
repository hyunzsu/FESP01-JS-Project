// import { TodoInfo, TodoRegist } from "../_index";

const TodoList = () => {
  return (
    <div>
      <div className="contents-container">
        <div className="list-container">
          <button className="regist-button">할 일 추가하기</button>
          <ul className="todolist">
            <li id="23" className="todo-item">
              <input className="checkbox-item" type="checkbox" />
              <span className="title-item">새로운 할 일1231232342</span>
            </li>
            <li id="25" className="todo-item">
              <input className="checkbox-item" type="checkbox" />
              <span className="title-item checked">123</span>
            </li>
          </ul>
        </div>
        <section></section>
        {/* <TodoInfo />
      <TodoRegist /> */}
      </div>
    </div>
  );
};

export default TodoList;
