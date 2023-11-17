import { useRef, useState } from "react";
import axios from "axios";

const TodoRegist = ({ showRegist, setShowRegist }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const imageInput = useRef(null);

  const handleRegistButton = async () => {
    const response: TodoResponse = await axios.post(
      `http://localhost:33088/api/todolist`,
      {
        title: title,
        content: `${content}76*이미지값*${imageSrc}`,
      }
    );
    if (response.data.ok === 0) {
      console.log(response);
    }
  };

  const handleImageButton = () => {
    imageInput.current.click();
  };

  const encodeFileToBase64 = (fileBlob: any) => {
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
        className="regist-container"
      >
        <form action="">
          <div className="button-container">
            <button
              onClick={handleRegistButton}
              className="regist-buttons save"
            >
              저장
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowRegist(false);
              }}
              className="regist-buttons cancel"
            >
              취소
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleImageButton();
              }}
              className="regist-buttons image"
            >
              image
            </button>
            <input
              className="image-input"
              type="file"
              accept="image/*"
              ref={imageInput}
              multiple={true}
              onChange={(e) => {
                encodeFileToBase64(e.target.files[0]);
              }}
            />
          </div>
          <input
            type="text"
            placeholder="TODO 제목을 입력하세요"
            className="regist-title"
            maxLength={25}
            value={title}
            onChange={onChangeTitle}
          />
          <textarea
            className="regist-content"
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
