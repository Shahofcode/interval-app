import React, { useEffect, useRef, useState } from 'react';
import logoBlack from '../assets/logo-black.svg';
import logoWhite from '../assets/logo-white.svg';
import clockBackground from '../assets/clock.svg';

const AnalogTimer = ({ time, onTimeUp, onMenuChange, onAbortTimer }) => {
  const minuteHandRef = useRef(null);
  const secondHandRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Total tid i sekunder från minuter och sekunder
    const totalSeconds = time.minutes * 60 + time.seconds;

    // Beräkna rotationen för minutvisaren
    // Minutvisaren ska rotera kontinuerligt, så vi tar hänsyn till både minuter och sekunder
    const minuteRotationDegrees = ((time.minutes * 60 + time.seconds) / 3600) * 360 - 90;
    
    // Sekundvisaren roterar baserat på sekunder
    const secondRotationDegrees = (time.seconds / 60) * 360 - 90;

    // Uppdatera minutvisaren
    if (minuteHandRef.current) {
      minuteHandRef.current.style.transform = `rotate(${minuteRotationDegrees}deg)`;
    }

    // Uppdatera sekundvisaren
    if (secondHandRef.current) {
      secondHandRef.current.style.transform = `rotate(${secondRotationDegrees}deg)`;

    }
  }, [time]); // Uppdatera varje gång tiden ändras

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="analog-timer-container">
      {/* Header med rubrik och hamburgermeny */}
      <div className="header">
        <h1>interval</h1>
        <img
          src={menuOpen ? logoWhite : logoBlack}
          alt="Menu Logo"
          className="menu-logo"
          onClick={toggleMenu}
        />
      </div>

      {/* Klockans bakgrund och visare */}
      <div className="clock-wrapper">
        <img src={clockBackground} alt="Clock background" className="clock-background" />
        <div className="clock">
          {/* Minutvisare */}
          <div
            ref={minuteHandRef}
            className="hand minute-hand"
            style={{ transform: 'rotate(-90deg)' }}
          ></div>
          {/* Sekundvisare */}
          <div
            ref={secondHandRef}
            className="hand second-hand"
            style={{ transform: 'rotate(-90deg)' }}
          ></div>
        </div>
      </div>

      {/* Endast Cancel-knappen */}
      <button className="cancel-button" onClick={onAbortTimer}>
        ABORT TIMER
      </button>

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
            <button onClick={() => onMenuChange('analog')}>
              ANALOG TIMER
            </button>
            <button onClick={() => onMenuChange('digital')}>DIGITAL TIMER</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalogTimer;
