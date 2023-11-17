import { useState, useEffect } from "react";
import axios from "axios";
import TodoDelete from "../../utils/TodoDelete";

interface TodoInfoProps {
  id: number;
}

const TodoInfo = (props: TodoInfoProps) => {
  const id = props.id;
  const [isUpdate, setIsUpdate] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [updateTime, setUpdateTime] = useState("");

  let item: TodoItem;
  let textSrc: string;

  const getTodoDetail = async () => {
    try {
      const response: TodoResponse = await axios.get(
        `http://localhost:33088/api/todolist/${id}`,
      );
      if (response.data.ok === 1) {
        item = response.data.item;
        textSrc = item.content.split("*이미지값*")[0];
        setTitle(item.title);
        setContent(textSrc);
        setImageSrc(item.content.split("*이미지값*")[1]);
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
        },
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
      <div className="ml-[20px] flex h-[500px] w-[480px] flex-col rounded-[10px] bg-sub p-[30px]">
        <input
          type="text"
          placeholder="TODO 제목을 입력하세요"
          className="order-2 mb-[6px] h-[30px] w-[420px] rounded-[5px] pl-[5px] text-[24px] font-[700] focus:shadow-custom"
          disabled={isUpdate === true ? false : true}
          maxLength={25}
          value={title}
          onChange={onChangeTitle}
        />
        <div className="order-3 mb-[10px] ml-[8px] mr-0 mt-0 text-[12px] font-[400]">
          {updateTime}
        </div>
        {imageSrc && (
          <img
            className="order-4 m-auto h-[100px] w-[100px] rounded-[30px] p-[5px]"
            src={imageSrc}
            alt="Image"
          />
        )}
        <textarea
          className="order-5 h-[300px] w-[420px] rounded-[5px] pl-[5px] pt-[10px] text-[20px] font-[400] focus:shadow-custom"
          placeholder="TODO 상세 내용을 입력하세요"
          disabled={isUpdate === true ? false : true}
          value={content}
          onChange={onChangeContent}
        ></textarea>
        <div className="mb-[10px] ml-[5px] flex h-[40px] w-[110px] items-center justify-between">
          <button
            onClick={handleUpdateButton}
            className="h-[30px] w-[50px]  cursor-pointer rounded-[5px] border-[1px] border-solid border-main bg-add text-[18px] font-[600] text-main shadow-none"
          >
            {isUpdate === false ? "수정" : "완료"}
          </button>
          <button
            onClick={() => {
              TodoDelete(id);
            }}
            className="h-[30px] w-[50px] cursor-pointer rounded-[5px] border-[1px] border-solid border-cancel bg-add text-[18px] font-[600] text-cancel shadow-none"
          >
            삭제
          </button>
        </div>
      </div>
    </section>
  );
};

export default TodoInfo;
