import './App.css';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Header from '../header/Header';
import TaskList from '../taskList/TaskList';
import Footer from '../footer/Footer';

function App() {
  const maxInput = 25;

  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState(data);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    function renderFilter() {
      if (filter === 'all') {
        setFiltered(data);
      } else if (filter === 'active') {
        const newArray = data.filter((item) => item.done !== true);
        setFiltered(newArray);
      } else {
        const newArray = data.filter((item) => item.done === true);
        setFiltered(newArray);
      }
    }
    renderFilter();
  }, [filter, data]);

  const start = (id) => {
    setData((prevData) =>
      prevData.map((el) => {
        if (el.id === id && !el.done) {
          el.start = true;
          el.mainTimer = setInterval(() => {
            setData((prevData) =>
              prevData.map((task) => {
                if (task.id === id) {
                  if (!task.done) {
                    // проверка на отписку от таймера console.log('tick taimer');
                    if (task.time <= 0) {
                      clearInterval(task.mainTimer);
                    }
                    task.time -= 1000;
                  } else {
                    clearInterval(task.mainTimer);
                  }
                }
                return task;
              })
            );
          }, 1000);
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
          clearInterval(el.mainTimer);
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

  const addTask = (descr, min, sec) => {
    const time = (min * 60 + sec) * 1000;
    const task = createTodoItem(descr, time);
    setData([...data, task]);
  };

  const todoCount = data.filter((el) => !el.done).length;

  return (
    <section className="todoapp">
      <Header addTask={addTask} maxInput={maxInput} />
      <section className="main">
        <TaskList
          data={filtered}
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
