import React, { useEffect, useState } from 'react';
import Timer from 'easytimer.js';
import logoBlack from '../assets/logo-black.svg';
import logoWhite from '../assets/logo-white.svg';

const AnalogTimer = ({ duration, onTimeUp, onMenuChange }) => {
  const [time, setTime] = useState({ minutes: duration, seconds: 0 });
  const [menuOpen, setMenuOpen] = useState(false); // För hamburgermenyn
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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Byt mellan att öppna och stänga menyn
  };

  const handleMenuChange = (newView) => {
    onMenuChange(newView); // Navigera till ny vy
    setMenuOpen(false); // Stäng menyn efter navigering
  };

  return (
    <div className="analog-timer-container">
      {/* Flexbox-rad för rubriken och hamburgermenyn */}
      <div className="header">
        <h1>INTERVAL</h1>
        <img
          src={menuOpen ? logoWhite : logoBlack}  // Vit logga när menyn är öppen
          alt="Menu Logo"
          className="menu-logo"
          onClick={toggleMenu}
        />
      </div>

      {/* Analog timer klocka */}
      <div className="analog-timer">
        <div className="clock">
          <div className="hand minute" style={{ transform: `rotate(${time.minutes * 6}deg)` }}></div>
          <div className="hand second" style={{ transform: `rotate(${time.seconds * 6}deg)` }}></div>
        </div>
        <button className="cancel-button" onClick={() => onMenuChange('set')}>
          Cancel
        </button>
      </div>

      {/* Hamburgermeny innehåll */}
      {menuOpen && (
        <div className="menu-overlay">
          <div className="menu-items">
            <button onClick={() => handleMenuChange('analog')}>Analog Timer</button>
            <button onClick={() => handleMenuChange('digital')}>Digital Timer</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalogTimer;
