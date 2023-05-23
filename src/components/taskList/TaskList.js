import './TaskList.css';
import PropTypes from 'prop-types';

import View from '../view/View';

function TaskList(props) {
  const { data, onDeleted, onCompleted, onStart, onStop } = props;
  const itemTasks = data.map(({ id, done, descr, start, edit, created, time }) => {
    let className = '';
    if (done) {
      className += 'completed';
    }
    if (edit) {
      className += '';
    }
    return (
      <li key={id} className={className}>
        <View
          id={id}
          done={done}
          descr={descr}
          start={start}
          created={created}
          time={Date.now() + time}
          onDeleted={() => onDeleted(id)}
          onCompleted={() => onCompleted(id)}
          onStart={onStart}
          onStop={onStop}
        />
      </li>
    );
  });
  return <ul className="todo-list">{itemTasks}</ul>;
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

TaskList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

export default TaskList;
