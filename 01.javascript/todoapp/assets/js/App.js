import Footer from "./layout/Footer.js";
import Header from "./layout/Header.js";
import TodoList2 from "./pages/list/TodoList2.js";

const App = async function () {
  const content = document.createElement("div");
  content.setAttribute("id", "app");
  content.appendChild(Header("TODO"));
  content.appendChild(await TodoList2());
  content.appendChild(Footer());
  return content;
};

export default App;
