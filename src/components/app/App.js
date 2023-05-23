/* eslint-disable class-methods-use-this */
import './App.css';
import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Header from '../header/Header';
import TaskList from '../taskList/TaskList';
import Footer from '../footer/Footer';

const filterTasks = (items, filter) => {
  switch (filter) {
    case 'all':
      return items;
    case 'active':
      return items.filter((task) => !task.done);
    case 'completed':
      return items.filter((task) => task.done);
    default:
      return items;
  }
};

class App extends Component {
  maxInput = 20;

  constructor(props) {
    super(props);
    this.state = {
      data: [this.createTodoItem('task1', 100000)],
      filter: 'all',
    };
  }

  componentWillUnmount() {
    clearInterval(this.mainTimer);
  }

  createTodoItem = (descr, time) => {
    const res = {
      descr,
      time,
      start: false,
      done: false,
      id: uuidv4(),
      created: new Date(),
      edit: false,
    };
    return res;
  };

  start = (id) => {
    const { data } = this.state;
    const idx = data.findIndex((todo) => todo.id === id);
    const task = data[idx];
    if (!task.start) {
      task.start = true;
      task.mainTimer = setInterval(() => {
        if (task.time <= 0) {
          clearInterval(task.mainTimer);
        }
        task.time -= 1000;
        data[id] = task;
      }, 1000);
    }
  };

  stop = (id) => {
    const { data } = this.state;
    const idx = data.findIndex((todo) => todo.id === id);
    const task = data[idx];
    if (task.start) {
      task.start = false;
      clearInterval(task.mainTimer);
    }
  };

  onToggle = (id) => {
    this.setState(({ data }) => {
      const idx = data.findIndex((todo) => todo.id === id);
      const newTask = { ...data[idx], done: !data[idx].done };
      return {
        data: [...data.slice(0, idx), newTask, ...data.slice(idx + 1)],
      };
    });
  };

  onFilterChange = (name) => {
    this.setState({
      filter: name,
    });
  };

  deleteItem = (id) => {
    this.setState(({ data }) => {
      const idx = data.findIndex((todo) => todo.id === id);
      return {
        data: [...data.slice(0, idx), ...data.slice(idx + 1)],
      };
    });
  };

  deleteCompletedItem = () => {
    const { data } = this.state;
    data.forEach((task) => {
      if (task.done) {
        this.deleteItem(task.id);
      }
    });
  };

  addTask = (descr, min, sec) => {
    const time = (min * 60 + sec) * 1000;
    const task = this.createTodoItem(descr, time);
    this.setState((state) => ({
      data: [...state.data, task],
    }));
  };

  render() {
    const { data, filter } = this.state;
    const visibleTasks = filterTasks(data, filter);
    const todoCount = data.filter((el) => !el.done).length;
    return (
      <section className="todoapp">
        <Header addTask={this.addTask} maxInput={this.maxInput} />
        <section className="main">
          <TaskList
            data={visibleTasks}
            onDeleted={this.deleteItem}
            onCompleted={this.onToggle}
            maxInput={this.maxInput}
            onStart={this.start}
            onStop={this.stop}
          />
          <Footer
            filter={filter}
            onFilterChange={this.onFilterChange}
            deleteCompletedItem={this.deleteCompletedItem}
            todoCount={todoCount}
          />
        </section>
      </section>
    );
  }
}

export default App;
