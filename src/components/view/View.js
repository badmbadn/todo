import { formatDistanceToNow } from 'date-fns';
import './View.css';
import PropTypes from 'prop-types';

import Timer from '../timer/timer';

function View(props) {
  const { id, done, descr, mainTimer, created, time, onCompleted, onDeleted, start, onStart, onStop } = props;

  const onStartManage = () => {
    onStart(id);
  };

  const onStopManage = () => {
    onStop(id);
  };

  return (
    <div className="view">
      <input className="toggle" type="checkbox" checked={done} readOnly onClick={onCompleted.bind(this)} />
      <div className="label">
        <div className="description">{descr}</div>
        <Timer
          time={time}
          mainTimer={mainTimer}
          id={id}
          start={start}
          onStart={onStartManage}
          onStop={onStopManage}
          done={done}
          onDeleted={onDeleted}
        />
        <div className="created">
          {`created ${formatDistanceToNow(created, {
            includeSeconds: true,
            addSuffix: true,
          })}`}
        </div>
      </div>
      <button type="button" aria-label="edit" className="icon icon-edit" />
      <button type="button" aria-label="destroy" className="icon icon-destroy" onClick={onDeleted} />
    </div>
  );
}

View.propTypes = {
  done: PropTypes.bool,
  descr: PropTypes.string,
  created: PropTypes.instanceOf(Date),
};

View.defaultProps = {
  done: false,
  descr: 'default',
  created: Date.now(),
};

export default View;
