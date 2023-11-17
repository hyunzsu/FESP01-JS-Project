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
      }
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
        className="w-[480px] h-[500px] p-[30px] ml-[20px] flex flex-col rounded-[10px] bg-sub"
      >
        <form action="">
          <div className="w-[210px] h-[40px] flex justify-between items-center mt-0 mr-0 mb-[10px] ml-[5px]">
            <button
              onClick={handleRegistButton}
              className="w-[50px] h-[30px] bg-add text-[18px] font-semibold rounded-[5px] shadow-none cursor-pointer text-main border border-main"
            >
              저장
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowRegist(false);
              }}
              className="w-[50px] h-[30px] bg-add text-[18px] font-semibold rounded-[5px] shadow-none cursor-pointer text-cancel border border-cancel"
            >
              취소
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleImageButton();
              }}
              className="w-[90px] h-[30px] bg-add text-[18px] font-semibold rounded-[5px] shadow-none cursor-pointer text-main border border-main"
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
            className="text-[24px] h-[30px] font-bold mb-[30px] order-1 w-[420px] pl-[5px] rounded-[5px]"
            maxLength={25}
            value={title}
            onChange={onChangeTitle}
          />
          <textarea
            className="text-[20px] h-[300px] font-normal pt-[10px] order-2 w-[420px] pl-[5px] rounded-[5px]"
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
