import React, { memo, useEffect } from 'react';
import './timer.css';

function Timer({ id, time, start, onStart, onStop, updateTimer }) {
  useEffect(() => {
    let timerId;
    if (start) {
      updateTimer(id);
      timerId = setInterval(updateTimer, 1000, id);
    } else {
      clearInterval(timerId);
    }
    return () => clearInterval(timerId);
  }, [start]);

  const currentMinutes = Math.floor(time / 1000 / 60);
  const currentSeconds = Math.floor((time - currentMinutes * 60 * 1000) / 1000);

  return (
    <div className="timer">
      <button aria-label="кнопка" className="icon icon-play" type="submit" onClick={onStart} />
      <button aria-label="кнопка" className="icon icon-pause" type="submit" onClick={onStop} />
      <span className="task-timer">
        {currentMinutes}:{currentSeconds}
      </span>
    </div>
  );
}

export default memo(Timer);
