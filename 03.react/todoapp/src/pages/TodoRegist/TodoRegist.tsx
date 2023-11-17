import { useRef, useState } from "react";
import axios from "axios";

const TodoRegist = ({ showRegist, setShowRegist }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const imageInput = useRef<HTMLInputElement>(null);

  const handleRegistButton = async () => {
    const response: TodoResponse = await axios.post(
      `http://localhost:33088/api/todolist`,
      {
        title: title,
        content: `${content}*이미지값*${imageSrc}`,
      },
    );
    if (response.data.ok === 0) {
      console.log(response);
    }
  };

  const handleImageButton = () => {
    if (imageInput.current) {
      imageInput.current.click();
    }
  };

  const encodeFileToBase64 = (fileBlob: File) => {
    console.log(fileBlob);
    if (fileBlob) {
      const reader = new FileReader();
      reader.readAsDataURL(fileBlob);
      reader.onload = (e: any) => {
        setImageSrc(reader.result + "");
      };
    } else {
      setImageSrc("");
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
      <div
        style={{ display: showRegist ? "block" : "none" }}
        className="ml-[20px] flex h-[500px] w-[480px] flex-col rounded-[10px] bg-sub p-[30px]"
      >
        <form action="">
          <div className="mb-[10px] ml-[5px] mr-0 mt-0 flex h-[40px] w-[210px] items-center justify-between">
            <button
              onClick={handleRegistButton}
              className="h-[30px] w-[50px] cursor-pointer rounded-[5px] border border-main bg-add text-[18px] font-semibold text-main shadow-none"
            >
              저장
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowRegist(false);
              }}
              className="h-[30px] w-[50px] cursor-pointer rounded-[5px] border border-cancel bg-add text-[18px] font-semibold text-cancel shadow-none"
            >
              취소
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleImageButton();
              }}
              className="h-[30px] w-[90px] cursor-pointer rounded-[5px] border border-main bg-add text-[18px] font-semibold text-main shadow-none"
            >
              image
            </button>
            <input
              className="hidden"
              type="file"
              accept="image/*"
              ref={imageInput}
              multiple={true}
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  encodeFileToBase64(e.target.files[0]);
                }
              }}
            />
          </div>
          <input
            type="text"
            placeholder="TODO 제목을 입력하세요"
            className="order-1 mb-[30px] h-[30px] w-[420px] rounded-[5px] pl-[5px] text-[24px] font-bold"
            maxLength={25}
            value={title}
            onChange={onChangeTitle}
          />
          <textarea
            className="order-2 h-[300px] w-[420px] rounded-[5px] pl-[5px] pt-[10px] text-[20px] font-normal"
            placeholder="TODO 상세 내용을 입력하세요"
            value={content}
            onChange={onChangeContent}
          ></textarea>
        </form>
      </div>
    </section>
  );
};

export default TodoRegist;
