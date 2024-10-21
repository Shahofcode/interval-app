import React, { useEffect, useState } from 'react';
import Timer from 'easytimer.js';
import Menu from './Menu';

const AnalogTimer = ({ duration, onTimeUp, onMenuChange }) => {
  const [time, setTime] = useState({ minutes: duration, seconds: 0 });
  const timer = new Timer();

  useEffect(() => {
    // Startar timern med rätt antal minuter
    timer.start({ countdown: true, startValues: { minutes: duration } });

    // Uppdaterar tid för varje sekund
    timer.addEventListener('secondsUpdated', () => {
      const { minutes, seconds } = timer.getTimeValues();
      setTime({ minutes, seconds });
    });

    // När timern når noll
    timer.addEventListener('targetAchieved', () => {
      onTimeUp();
    });

    // Avsluta timer när komponenten avmonteras
    return () => {
      timer.stop();
    };
  }, [duration, onTimeUp]);

  return (
    <div className="analog-timer">
      <div className="clock">
        <div className="hand minute" style={{ transform: `rotate(${time.minutes * 6}deg)` }}></div>
        <div className="hand second" style={{ transform: `rotate(${time.seconds * 6}deg)` }}></div>
      </div>
      <Menu onMenuChange={onMenuChange} />
      <button onClick={() => onMenuChange('set')}>Cancel</button>
    </div>
  );
};

export default AnalogTimer;
