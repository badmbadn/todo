import './App.css';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Header from '../header/Header';
import TaskList from '../taskList/TaskList';
import Footer from '../footer/Footer';

function App() {
  const maxInput = 25;

  const createTodoItem = (descr, time) => {
    const res = {
      descr,
      time,
      start: false,
      done: false,
      id: uuidv4(),
      created: new Date(),
      edit: false,
      mainTimer: null,
    };
    return res;
  };

  const [data, setData] = useState([createTodoItem('task', 200000)]);
  const [filter, setFilter] = useState('all');

  const start = (id) => {
    setData(
      data.map((el) => {
        if (el.id === id) {
          el.start = true;
          if (el.start === true) {
            el.mainTimer = setInterval(() => {
              console.log('df');
              if (el.time <= 0) {
                clearInterval(el.mainTimer);
              }
              el.time -= 1000;
            }, 1000);
          }
        }
        return el;
      })
    );
  };

  const stop = (id) => {
    setData(
      data.map((el) => {
        if (el.id === id) {
          el.start = false;
          if (el.start === false) {
            clearInterval(el.mainTimer);
          }
        }
        return el;
      })
    );
  };

  const changeTodoData = (tasks, id, key) => tasks.map((el) => (el.id === id ? { ...el, [key]: !el[key] } : el));

  const onToggle = (id) => {
    setData(() => changeTodoData(data, id, 'done'));
  };

  const onFilterChange = (name) => {
    setFilter(name);
  };

  const deleteItem = (id) => {
    setData((state) => state.filter((item) => item.id !== id));
  };

  const deleteCompletedItem = () => {
    setData((state) => state.filter((item) => item.done !== true));
  };

  const addTask = (descr, min, sec) => {
    const time = (min * 60 + sec) * 1000;
    const task = createTodoItem();
    setData((state) => [...state, { ...task, descr, time }]);
  };

  const filterTasks = () => {
    if (filter === 'all') return data;
    if (filter === 'active') {
      return data.filter((item) => item.done !== true);
    }
    return data.filter((item) => item.done === true);
  };

  const todoCount = data.filter((el) => !el.done).length;
  return (
    <section className="todoapp">
      <Header addTask={addTask} maxInput={maxInput} />
      <section className="main">
        <TaskList
          data={filterTasks()}
          onDeleted={deleteItem}
          onCompleted={onToggle}
          maxInput={maxInput}
          onStart={start}
          onStop={stop}
        />
        <Footer
          filter={filter}
          onFilterChange={onFilterChange}
          deleteCompletedItem={deleteCompletedItem}
          todoCount={todoCount}
        />
      </section>
    </section>
  );
}

export default App;
