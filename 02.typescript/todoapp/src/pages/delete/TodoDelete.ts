import axios from "axios";
import getErrorMessage from "../../utils/Error";

/* TodoDelete는 Todo를 제거하기 위한 함수, 매개변수로 통신에 필요한 _id값을 전달받아 사용한다 */
const TodoDelete = async (_id: number) => {
  try {
    // Axios로 Delete 요청을 보냄
    const response = await axios.delete(
      `http://localhost:33088/api/todolist/${_id}`
    );
    // 삭제에 성공했을 경우 새로고침을 하여 UI를 렌더링
    if (response.status === 200) {
      window.location.reload();
    }
  } catch (err) {
    console.log(getErrorMessage(err));
  }
};

export default TodoDelete;