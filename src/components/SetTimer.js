import React, { useState } from 'react';
import logoBlack from '../assets/logo-black.svg';
import logoWhite from '../assets/logo-white.svg';
import leftArrow from '../assets/left-arrow.svg';
import rightArrow from '../assets/right-arrow.svg';

// SetTimer-komponenten hanterar användarens inställning av minuter och växling mellan Analog/Digital Timer
const SetTimer = ({ onStartTimer, onMenuChange }) => {
  const [minutes, setMinutes] = useState(0);  // Håller koll på antalet minuter användaren väljer
  const [menuOpen, setMenuOpen] = useState(false);  // Hanterar om hamburgermenyn är öppen eller stängd

  // Funktion för att öka minuterna
  const increaseMinutes = () => {
    setMinutes((prev) => prev + 1);
  };

  // Funktion för att minska minuterna, förhindrar att minuterna går under 0
  const decreaseMinutes = () => {
    if (minutes > 0) {
      setMinutes((prev) => prev - 1);
    }
  };

  // Funktion för att öppna/stänga hamburgermenyn
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="set-timer-container">
      {/* Visar svart logga när menyn är stängd */}
      {!menuOpen && (
        <div className="header">
          <img
            src={logoBlack}
            alt="Menu Logo"
            className="menu-logo"
            onClick={toggleMenu}  // Öppnar menyn när loggan klickas
          />
        </div>
      )}

      {/* Timer-justering och startknapp */}
      <div className="set-timer">
        <div className="timer-adjust">
          <img
            src={leftArrow}
            alt="Decrease minutes"
            className="arrow"
            onClick={decreaseMinutes}  // Minskar antalet minuter när vänsterpil klickas
          />
          <span className="minutes-display">{minutes}</span>  {/* Visar nuvarande minuter */}
          <img
            src={rightArrow}
            alt="Increase minutes"
            className="arrow"
            onClick={increaseMinutes}  // Ökar antalet minuter när högerpil klickas
          />
        </div>

        {/* Visar texten "minute" eller "minutes" beroende på det valda minutantalet */}
        {minutes > 0 && (
          <p className="minute-label">
            {minutes === 1 ? 'minute' : 'minutes'}
          </p>
        )}

        {/* Startar timern med det valda minutantalet */}
        <button className="start-button" onClick={() => onStartTimer(minutes)}>
          START TIMER
        </button>
      </div>

      {/* Hamburgermenyinnehåll, visas när menyn är öppen */}
      {menuOpen && (
        <div className="menu-overlay">
          <div className="header">
            <img
              src={logoWhite}
              alt="Menu Logo"
              className="menu-logo"
              onClick={toggleMenu}  // Stänger menyn om loggan klickas igen
            />
          </div>
          <div className="menu-items">
            {/* Byter till Analog eller Digital Timer och stänger menyn */}
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
