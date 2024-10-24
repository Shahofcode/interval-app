import React, { useEffect, useState, useRef } from 'react';
import Timer from 'easytimer.js';
import logoBlack from '../assets/logo-black.svg';
import logoWhite from '../assets/logo-white.svg';

const DigitalTimer = ({ duration, onTimeUp, onMenuChange }) => {
  const [time, setTime] = useState({ minutes: duration, seconds: 0 });
  const timer = useRef(new Timer());
  const [menuOpen, setMenuOpen] = useState(false); // För hamburgermenyn

  useEffect(() => {
    // Startar timern med rätt antal minuter
    const currentTimer = timer.current;
    currentTimer.start({ countdown: true, startValues: { minutes: duration } });

    // Uppdaterar tid varje sekund
    currentTimer.addEventListener('secondsUpdated', () => {
      const { minutes, seconds } = currentTimer.getTimeValues();
      setTime({ minutes, seconds });
    });

    // När timern når noll
    currentTimer.addEventListener('targetAchieved', () => {
      onTimeUp();
    });

    // Städa upp vid avmontering
    return () => {
      currentTimer.stop();
    };
  }, [duration, onTimeUp]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Byt mellan att öppna och stänga menyn
  };

  return (
    <div className="digital-timer-container">
      {/* Header med rubrik och hamburgermeny */}
      <div className="header">
        <h1>interval</h1>
        <img
          src={menuOpen ? logoWhite : logoBlack}  // Byt logga beroende på om menyn är öppen
          alt="Menu Logo"
          className="menu-logo"
          onClick={toggleMenu}
        />
      </div>

      {/* Tiden i digitalt format */}
      <div className="digital-timer">
        <h1>{`${time.minutes} : ${time.seconds < 10 ? '0' : ''}${time.seconds}`}</h1>
        <button className="cancel-button" onClick={() => onMenuChange('set')}>ABORT TIMER</button>
      </div>

      {/* Hamburgermeny innehåll */}
      {menuOpen && (
        <div className="menu-overlay">
          <div className="header">
            <img
              src={logoWhite}  // Vit logga när menyn är öppen
              alt="Menu Logo"
              className="menu-logo"
              onClick={toggleMenu}
            />
          </div>
          <div className="menu-items">
            <button onClick={() => onMenuChange('analog')}>Analog Timer</button>
            <button onClick={() => onMenuChange('digital')}>Digital Timer</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DigitalTimer;
