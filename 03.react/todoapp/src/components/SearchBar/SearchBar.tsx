import axios from 'axios';

const SearchBar = () => {

    const handleSearch = async (e) => {
        const target = e.target.value;

        const response = await axios(`http://localhost:33088/api/todolist`);
        const data = response.data.items;
        
        // 인풋에 입력된 값과 데이터를 대조해 일치하는 값을 반환한다
        const searchResult = data.filter(item => item.title === target);
        return searchResult;
    }

    return <div className="SearchBar">
        <input type="text" placeholder='검색어를 입력해주세요' onBlur={handleSearch}/>
    </div>
}

export default SearchBar;