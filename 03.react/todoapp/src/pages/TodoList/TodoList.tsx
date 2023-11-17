import { useState, useEffect } from 'react';
import axios from 'axios';
import { TodoInfo, TodoRegist } from '@/pages/_index';
import { initializeTodoList } from '@/utils/_index';

const TodoList = ({ todoItem, setTodoItem }) => {
  const [pageView, setPageView] = useState({});
  const [showRegist, setShowRegist] = useState(false);
  const completedCount: number = todoItem.filter((item) => item.done).length;

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
      initializeTodoList(setTodoItem);
    } catch (err) {
      console.error(err);
    }
  };

  const openTodoRegist = () => {
    setPageView({ view: 'todoRegist' });
    setShowRegist(true);
  };

  const openTodoInfo = (id) => {
    setPageView({ view: 'todoInfo', id: id });
  };

  return (
    <div>
      <div className='w-[1040px] h-[550px] flex flex-col flex-wrap'>
        <div className='w-[500px] flex flex-col item-center pl-5'>
          <button
            className='w-[480px] h-[60px] text-add text-[20px] font-semibold bg-main flex items-center justify-center border-none rounded-[10px] mb-2.5 cursor-pointer'
            onClick={openTodoRegist}
          >
            할 일 추가하기
          </button>
          <p className='text-main font-bold text-left self-start m-1 text-2xl'>
            {completedCount} / {todoItem.length} tasks
          </p>
          <div
            className='bg-sub h-[30px] rounded-[10px] '
            style={{ width: `${100}%` }}
          >
            <div
              className='bg-main h-[30px] rounded-[10px]'
              style={{ width: `${(completedCount / todoItem.length) * 100}%` }}
            >
              {' '}
            </div>
          </div>
          <ul className='w-[480px] max-h-[420px] overflow-auto'>
            {todoItem.map((item) => (
              <li
                key={item._id}
                id={item._id}
                className='flex h-[60px] my-[10px] border-[1px] border-solid border-border text-[20px] items-center rounded-[10px] cursor-pointer text-text after:inline-block after:w-[10px] after:h-[17px] after:empty-content'
                onClick={() => openTodoInfo(item._id)}
              >
                <input
                  className='w-[20px] h-[20px] mx-[20px] cursor-pointer leading-normal'
                  type='checkbox'
                  checked={item.done}
                  onChange={(e) => updateCheckBox(e, item._id)}
                />
                <span
                  className={`
    ${item.done ? 'line-through' : ''} 
    title-item overflow-hidden w-390 whitespace-nowrap overflow-ellipsis
  `}
                >
                  {item.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
        {pageView.view === 'todoRegist' && (
          <TodoRegist showRegist={showRegist} setShowRegist={setShowRegist} />
        )}
        {pageView.view === 'todoInfo' && <TodoInfo id={pageView.id} />}
      </div>
    </div>
  );
};

export default TodoList;
