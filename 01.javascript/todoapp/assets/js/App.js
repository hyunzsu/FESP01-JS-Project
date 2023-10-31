import Footer from "./layout/Footer.js";
import Header from "./layout/Header.js";
import TodoList from "./pages/list/TodoList.js";

const App = async function () {
  const content = document.createElement("div");
  content.setAttribute("id", "app");
  content.appendChild(Header("TODO"));
  content.appendChild(await TodoList());
  content.appendChild(Footer());
  return content;
};

export default App;
