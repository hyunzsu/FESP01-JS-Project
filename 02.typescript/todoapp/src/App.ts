import Footer from "./layout/Footer";
import Header from "./layout/Header/Header";
import TodoList from "./pages/list/TodoList";

const App = async function () {
  const content = document.createElement("div");
  content.setAttribute("id", "app");
  content.appendChild(Header());
  content.appendChild(await TodoList());
  content.appendChild(Footer());
  return content;
};

export default App;
