/* eslint-disable react/no-did-update-set-state */
import './timer.css';
import { useState } from 'react';
import Countdown from 'react-countdown';

const renderer = ({ minutes, seconds, completed }) => {
  if (completed) {
    return <span>time is over</span>;
  }
  return <span>{`${minutes}:${seconds}`}</span>;
};

function Timer({ time, start, onStart, onStop }) {
  let countDown = null;

  const [timer] = useState(time);
  const [come, SetStart] = useState(start);

  const countDownRef = (countdown) => {
    if (countdown) {
      countDown = countdown.getApi();
    }
  };

  const play = () => {
    countDown.start();
    onStart();
    SetStart(true);
  };

  const stop = () => {
    countDown.pause();
    onStop();
    SetStart(false);
  };

  return (
    <div className="timer">
      <button aria-label="button" className="icon icon-play" type="submit" onClick={play} />
      <button aria-label="button" className="icon icon-pause" type="submit" onClick={stop} />
      <Countdown ref={countDownRef} date={timer} renderer={renderer} autoStart={come} />
    </div>
  );
}

export default Timer;
