import React, { useEffect, useState } from 'react';
import Timer from 'easytimer.js';
import Menu from './Menu';

const DigitalTimer = ({ duration, onTimeUp, onMenuChange }) => {
  const [time, setTime] = useState({ minutes: duration, seconds: 0 });
  const timer = new Timer();

  useEffect(() => {
    // Startar timern med rätt antal minuter
    timer.start({ countdown: true, startValues: { minutes: duration } });

    // Uppdaterar tid varje sekund
    timer.addEventListener('secondsUpdated', () => {
      const { minutes, seconds } = timer.getTimeValues();
      setTime({ minutes, seconds });
    });

    // När timern når noll
    timer.addEventListener('targetAchieved', () => {
      onTimeUp();
    });

    // Städa upp vid avmontering
    return () => {
      timer.stop();
    };
  }, [duration, onTimeUp]);

  return (
    <div className="digital-timer">
      <h1>{`${time.minutes} : ${time.seconds < 10 ? '0' : ''}${time.seconds}`}</h1>
      <Menu onMenuChange={onMenuChange} />
      <button onClick={() => onMenuChange('set')}>Cancel</button>
    </div>
  );
};

export default DigitalTimer;
