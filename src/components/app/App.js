import './App.css';
import React, { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Header from '../header/Header';
import TaskList from '../taskList/TaskList';
import Footer from '../footer/Footer';

function App() {
  const maxInput = 25;

  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('all');
  const [filtered, setFiltered] = useState(data);

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

  const createTodoItem = (descr, time) => {
    const res = {
      descr,
      time,
      id: uuidv4(),
      edit: 'active',
      done: false,
      created: new Date(),
      startTime: null,
      start: false,
    };
    return res;
  };

  const addTask = (descr, min, sec) => {
    const time = (min * 60 + sec) * 1000;
    const newItem = createTodoItem(descr, time);
    setData((data) => [...data, newItem]);
  };

  const changeTodoData = (tasks, id, key) => tasks.map((el) => (el.id === id ? { ...el, [key]: !el[key] } : el));

  const onToggle = (id) => {
    setData(() => changeTodoData(data, id, 'done'));
  };

  const deleteItem = (id) => {
    setData((state) => state.filter((item) => item.id !== id));
  };

  const updateTimer = useCallback(
    (id) => {
      const index = data.findIndex((el) => el.id === id);
      if (data[index].start === true) {
        if (data[index].time <= 1000) {
          setData((data) => {
            const newTaskData = data.slice(0);
            newTaskData[index].time = 0;
            newTaskData[index].startTime = null;
            newTaskData[index].start = false;
            return newTaskData;
          });
        } else {
          const now = new Date().getTime();
          setData((data) => {
            const newTaskData = data.slice(0);
            newTaskData[index].time = data[index].time - (now - data[index].startTime);
            newTaskData[index].startTime = now;
            return newTaskData;
          });
        }
      }
    },
    [data]
  );

  const onStart = (id) => {
    const index = data.findIndex((el) => el.id === id);
    if (data[index].start === false) {
      const now = new Date().getTime();
      setData((data) => {
        const newTaskData = data.slice(0);
        newTaskData[index].start = true;
        newTaskData[index].startTime = now;
        return newTaskData;
      });
    }
  };

  const onStop = (id) => {
    const index = data.findIndex((el) => el.id === id);
    if (data[index].start === true) {
      const now = new Date().getTime();
      setData((data) => {
        const newTaskData = data.slice(0);
        newTaskData[index].start = false;
        newTaskData[index].time -= now - newTaskData[index].startTime;
        newTaskData[index].startTime = now;
        return newTaskData;
      });
    }
  };

  const deleteCompletedItem = () => {
    setData((state) => state.filter((item) => item.done !== true));
  };

  const onFilterChange = (name) => {
    setFilter(name);
  };

  const todoCount = data.filter((el) => !el.done).length;

  return (
    <section className="todoapp">
      <Header addTask={addTask} maxInput={maxInput} />
      <section className="main">
        <TaskList
          data={filtered}
          onCompleted={onToggle}
          onDeleted={deleteItem}
          onStart={onStart}
          onStop={onStop}
          updateTimer={updateTimer}
        />
        <Footer
          tasks={data}
          filter={filter}
          onFilterChange={onFilterChange}
          todoCount={todoCount}
          deleteCompletedItem={deleteCompletedItem}
        />
      </section>
    </section>
  );
}

export default App;
