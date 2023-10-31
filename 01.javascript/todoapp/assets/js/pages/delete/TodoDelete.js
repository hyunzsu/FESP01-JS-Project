// /todolist/{_id}

const TodoDelete = async (_id) => {
  console.log(_id);
  try {
    const response = await axios.delete(
      `http://localhost:33088/api/todolist/${_id}`
    );
    console.log(response);
  } catch (err) {
    console.log(err.message);
  }
};

export default TodoDelete;
