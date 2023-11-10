import axios from "axios";

/* fetchDetailData는 상세정보를 불러오는 함수 */
const fetchDetailData = async (_id: number) => {
  try {
    const response = await axios(`http://localhost:33088/api/todolist/${_id}`);
    return response.data.item;
  } catch (error) {
    console.error("데이터를 불러오지 못했습니다", error);
  }
};

export default fetchDetailData;
