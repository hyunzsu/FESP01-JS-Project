import { useState, useEffect } from 'react';
import axios from 'axios';
import TodoDelete from '../../utils/TodoDelete';

interface TodoInfoProps {
  id: number;
}

const TodoInfo = (props: TodoInfoProps) => {
  const id = props.id;
  const [isUpdate, setIsUpdate] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [isDone, setIsDone] = useState(false);
  const [updateTime, setUpdateTime] = useState('');

  let item: TodoItem;
  let textSrc;

  const getTodoDetail = async () => {
    try {
      const response: TodoResponse = await axios.get(
        `http://localhost:33088/api/todolist/${id}`
      );
      if (response.data.ok === 1) {
        item = response.data.item;
        textSrc = item.content.split('*이미지값*')[0];
        setTitle(item.title);
        setContent(textSrc);
        setImageSrc(item.content.split('*이미지값*')[1]);
        setIsDone(item.done);
        setUpdateTime(item.updatedAt);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getTodoDetail();
  }, [id]);

  const handleUpdateButton = async () => {
    setIsUpdate(!isUpdate);
    if (isUpdate === true) {
      const response: TodoResponse = await axios.patch(
        `http://localhost:33088/api/todolist/${id}`,
        {
          title: title,
          content: textSrc,
          done: isDone,
        }
      );
      if (response.data.ok === 1) {
        item = response.data.item;
      }
    }
  };

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target instanceof HTMLInputElement) {
      setTitle(event.target.value);
    }
  };
  const onChangeContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target instanceof HTMLTextAreaElement)
      setContent(event.target.value);
  };

  return (
    <section>
      <div className="w-[480px] h-[500px] p-[30px] ml-[20px] flex flex-col rounded-[10px] bg-sub">
        <input
          type="text"
          placeholder="TODO 제목을 입력하세요"
          className="text-[24px] h-[30px] font-[700] mb-[6px] order-2 w-[420px] pl-[5px] rounded-[5px] focus:shadow-custom"
          disabled={isUpdate === true ? false : true}
          maxLength={25}
          value={title}
          onChange={onChangeTitle}
        />
        <div className="text-[12px] font-[400] mt-0 mr-0 mb-[10px] ml-[8px] order-3">
          {updateTime}
        </div>
        {imageSrc && (
          <img
            className="rounded-[30px] w-[100px] h-[100px] m-auto p-[5px] order-4"
            src={imageSrc}
            alt="Image"
          />
        )}
        <textarea
          className="text-[20px] h-[300px] font-[400] order-5 pt-[10px] w-[420px] pl-[5px] rounded-[5px] focus:shadow-custom"
          placeholder="TODO 상세 내용을 입력하세요"
          disabled={isUpdate === true ? false : true}
          value={content}
          onChange={onChangeContent}
        ></textarea>
        <div className="w-[110px] h-[40px] flex justify-between items-center mb-[10px] ml-[5px]">
          <button
            onClick={handleUpdateButton}
            className="w-[50px] h-[30px] bg-add text-[18px] font-[600] rounded-[5px] shadow-none cursor-pointer text-main border-solid border-main border-[1px]"
          >
            {isUpdate === false ? '수정' : '완료'}
          </button>
          <button
            onClick={() => {
              TodoDelete(id);
            }}
            className="w-[50px] h-[30px] bg-add text-[18px] font-[600] rounded-[5px] shadow-none cursor-pointer text-cancel border-solid border-cancel border-[1px]"
          >
            삭제
          </button>
        </div>
      </div>
    </section>
  );
};

export default TodoInfo;
