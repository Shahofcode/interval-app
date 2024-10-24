import React, { useState } from 'react';
import logoBlack from '../assets/logo-black.svg';
import logoWhite from '../assets/logo-white.svg';
import leftArrow from '../assets/left-arrow.svg';
import rightArrow from '../assets/right-arrow.svg';

const SetTimer = ({ onStartTimer, onMenuChange }) => {
  const [minutes, setMinutes] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const increaseMinutes = () => {
    setMinutes((prev) => prev + 1);
  };

  const decreaseMinutes = () => {
    if (minutes > 0) {
      setMinutes((prev) => prev - 1);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="set-timer-container">
      {/* Svart logga utanför menyn när menyn är stängd */}
      {!menuOpen && (
        <div className="header">
          <img
            src={logoBlack}
            alt="Menu Logo"
            className="menu-logo"
            onClick={toggleMenu}
          />
        </div>
      )}

      {/* Huvudinnehåll för att justera minuter och starta timern */}
      <div className="set-timer">
        <div className="timer-adjust">
          <img
            src={leftArrow}
            alt="Decrease minutes"
            className="arrow"
            onClick={decreaseMinutes}
          />
          <span className="minutes-display">{minutes}</span>
          <img
            src={rightArrow}
            alt="Increase minutes"
            className="arrow"
            onClick={increaseMinutes}
          />
        </div>

        {/* Visa texten bara om minuterna är större än 0 */}
        {minutes > 0 && (
          <p className="minute-label">
            {minutes === 1 ? 'minute' : 'minutes'}
          </p>
        )}

        <button className="start-button" onClick={() => onStartTimer(minutes)}>
          START TIMER
        </button>
      </div>

      {/* Hamburgermeny innehåll */}
      {menuOpen && (
        <div className="menu-overlay">
          <div className="header">
            <img
              src={logoWhite}
              alt="Menu Logo"
              className="menu-logo"
              onClick={toggleMenu}
            />
          </div>
          <div className="menu-items">
            {/* Hantera växling mellan Analog och Digital Timer */}
            <button onClick={() => { onMenuChange('analog'); toggleMenu(); }}>
              ANALOG TIMER
            </button>
            <button onClick={() => { onMenuChange('digital'); toggleMenu(); }}>
              DIGITAL TIMER
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetTimer;
