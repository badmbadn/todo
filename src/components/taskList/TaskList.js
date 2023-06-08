import React from 'react';

import View from '../view/View';

import './TaskList.css';

function TaskList({ data, onCompleted, onDeleted, onStart, onStop, updateTimer }) {
  const taskList = data.map(({ id, edit, descr, created, start, time, done }) => {
    let className = '';
    if (done) {
      className += 'completed';
    }
    if (edit === 'active') {
      className += '';
    }
    return (
      <li className={className} key={id}>
        <View
          id={id}
          descr={descr}
          created={created}
          done={done}
          onCompleted={() => onCompleted(id)}
          onDeleted={() => onDeleted(id)}
          onStart={() => onStart(id)}
          onStop={() => onStop(id)}
          updateTimer={updateTimer}
          edit={edit}
          start={start}
          time={time}
        />
      </li>
    );
  });

  return <ul className="todo-list">{taskList}</ul>;
}

TaskList.defaultProps = {
  data: [
    {
      descr: 'default',
      done: false,
      id: 3,
      created: Date.now(),
    },
  ],
};

export default TaskList;
