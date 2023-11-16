import { useState } from 'react';
import { TodoList } from '@/pages/_index';
import { Header, Footer } from '@/layout/_index';
import { DarkModeProvider } from './context/DarkModeContext';

function App() {
  const [todoItem, setTodoItem] = useState([]);

  return (
    <div id='app'>
      <DarkModeProvider>
        <Header setTodoItem={setTodoItem} />
        <TodoList todoItem={todoItem} setTodoItem={setTodoItem} />
        <Footer />
      </DarkModeProvider>
    </div>
  );
}

export default App;