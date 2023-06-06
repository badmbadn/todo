import './timer.css';
import React, { useEffect, useRef } from 'react';
import Countdown from 'react-countdown';

const renderer = ({ minutes, seconds, completed }) => {
  if (completed) {
    return <span>время вышло</span>;
  }

  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  return <span>{`${minutes}:${formattedSeconds}`}</span>;
};

function Timer({ time, start, onStart, onStop }) {
  const countDown = useRef(null);

  useEffect(
    () => () => {
      if (countDown.current) {
        clearInterval(countDown.current);
      }
    },
    []
  );

  const countDownRef = (countdown) => {
    if (countdown) {
      countDown.current = countdown.getApi();
    }
  };

  const play = () => {
    countDown.current.start();
    onStart();
  };

  const stop = () => {
    countDown.current.pause();
    onStop();
  };

  return (
    <div className="timer">
      <button aria-label="кнопка" className="icon icon-play" type="submit" onClick={play} />
      <button aria-label="кнопка" className="icon icon-pause" type="submit" onClick={stop} />
      <Countdown ref={countDownRef} date={time} renderer={renderer} autoStart={start} />
    </div>
  );
}

export default Timer;
