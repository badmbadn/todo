import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

import Timer from '../timer/timer';

import './View.css';

function View(props) {
  const { id, done, descr, created, onCompleted, onDeleted, onStart, onStop, updateTimer, start, time } = props;

  return (
    <div className="view">
      <input className="toggle" type="checkbox" readOnly onClick={onCompleted} checked={done} />
      <div className="label">
        <span className="description">{descr}</span>
        <Timer id={id} time={time} start={start} onStart={onStart} onStop={onStop} updateTimer={updateTimer} />
        <div className="created">{`created ${formatDistanceToNow(created, {
          includeSeconds: true,
          addSuffix: true,
        })}`}</div>
      </div>
      <button type="button" aria-label="edit" className="icon icon-edit" />
      <button type="button" className="icon icon-destroy" aria-label="destroy" onClick={onDeleted} />
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
