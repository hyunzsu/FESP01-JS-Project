import TodoList2 from "./pages/list/TodoList2.js";

const App = async function () {
  const content = document.createElement("div");
  content.setAttribute("id", "app");
  content.appendChild(await TodoList2());
  return content;
};

export default App;
