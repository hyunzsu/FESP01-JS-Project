import axios from "axios";
import { initializeTodoList } from "@/utils/_index";

const SearchBar = ({ setTodoItem }) => {
  const handleSearch = async (e) => {
    const target = e.target.value;

    if (target) {
      const response = await axios(`http://localhost:33088/api/todolist`);
      const data = response.data.items;

      // 인풋에 입력된 값과 데이터를 대조해 일치하는 값을 반환한다
      const searchResult = data.filter((item) => item.title === target);
      setTodoItem(searchResult);
    } else {
      initializeTodoList(setTodoItem);
    }
  };

  return (
    <div className="flex items-center w-[500px] h-[40px] border border-orange rounded-[10px] py-0 px-[10px]">
      <input
        className="text-[#282828]"
        type="text"
        placeholder="검색어를 입력해주세요"
        onBlur={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
