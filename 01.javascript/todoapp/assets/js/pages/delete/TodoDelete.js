const TodoDelete = async (_id) => {
  console.log(_id);
  try {
    const response = await axios.delete(
      `http://localhost:33088/api/todolist/${_id}`
    );
    console.log(response);
    if (response.status === 200) {
      window.location.reload();
    }
  } catch (err) {
    console.log(err.message);
  }
};

export default TodoDelete;
