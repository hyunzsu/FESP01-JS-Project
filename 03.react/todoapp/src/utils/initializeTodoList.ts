import axios from 'axios';

const initializeTodoList = async (setTodoItem) => {
    try {
      const response = await axios("http://localhost:33088/api/todolist");
      const { items } = response.data;
      setTodoItem(items);
    } catch (err) {
      console.error(err);
    }
  };

export default initializeTodoList;