import { useState, useEffect, MouseEvent } from 'react';
import axios from 'axios';
import { HiMoon, HiSun } from 'react-icons/hi';
import { useDarkMode } from '../../context/DarkModeContext';
import { SearchBar } from '@/components/_index';

const Header = ({ setTodoItem }) => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [activeButton, setActiveButton] = useState('All');

  useEffect(() => {
    UpdateTodoList();
  }, [activeButton]);

  const filter = (e: MouseEvent<HTMLButtonElement>) => {
    setActiveButton(e.target.textContent);
  };

  // 필터기능
  const UpdateTodoList = async () => {
    try {
      const response = await axios('http://localhost:33088/api/todolist');
      const { items } = response.data;
      if (activeButton === 'All') {
        setTodoItem(items);
      } else if (activeButton === 'Active') {
        setTodoItem(items.filter((item) => !item.done));
      } else if (activeButton === 'Completed') {
        setTodoItem(items.filter((item) => item.done));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <button onClick={toggleDarkMode} className='darkmode'>
        {!darkMode && <HiMoon />}
        {darkMode && <HiSun />}
      </button>
      <h1>TODO</h1>
      <SearchBar setTodoItem={setTodoItem}/>
      <div>
        {['All', 'Active', 'Completed'].map((item, index) => {
          return (
            <button
              key={index}
              onClick={filter}
              className={item === activeButton ? 'active' : ''}
            >
              {item}
            </button>
          );
        })}
      </div>
    </header>
  );
};

export default Header;
