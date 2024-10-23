import React, { useEffect, useState, useRef } from 'react';
import Timer from 'easytimer.js';
import logoBlack from '../assets/logo-black.svg';
import logoWhite from '../assets/logo-white.svg';
import clockBackground from '../assets/clock.svg';

const AnalogTimer = ({ duration, onTimeUp, onMenuChange }) => {
  const timer = useRef(new Timer());
  const minuteHandRef = useRef(null);
  const secondHandRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false); // För hamburgermenyn

  useEffect(() => {
    const currentTimer = timer.current;
    currentTimer.start({ countdown: true, startValues: { minutes: duration } });

    const updateHands = () => {
      const totalSeconds = duration * 60;
      const elapsedSeconds = totalSeconds - currentTimer.getTotalTimeValues().seconds;

      // Beräkna rotationen för minut- och sekundvisarna
      const minuteRotationDegrees = (elapsedSeconds / totalSeconds) * 360 - 90;
      const secondRotationDegrees = (currentTimer.getTimeValues().seconds / 60) * 360 - 90;

      // Uppdatera minutvisaren
      if (minuteHandRef.current) {
        minuteHandRef.current.style.transform = `rotate(${minuteRotationDegrees}deg)`;
        minuteHandRef.current.style.transition = 'transform 1s linear';
      }

      // Uppdatera sekundvisaren
      if (secondHandRef.current) {
        secondHandRef.current.style.transform = `rotate(${secondRotationDegrees}deg)`;
        secondHandRef.current.style.transition = 'transform 1s linear';
      }
    };

    updateHands(); // Initial position update
    currentTimer.addEventListener('secondsUpdated', updateHands);

    currentTimer.addEventListener('targetAchieved', () => {
      onTimeUp();
    });

    return () => {
      currentTimer.removeEventListener('secondsUpdated', updateHands);
      currentTimer.stop();
    };
  }, [duration, onTimeUp]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Byt mellan att öppna och stänga menyn
  };

  return (
    <div className="analog-timer-container">
      {/* Header med rubrik och hamburgermeny */}
      <div className="header">
        <h1>INTERVAL</h1>
        <img
          src={menuOpen ? logoWhite : logoBlack}  // Byt logga beroende på om menyn är öppen
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
      <button className="cancel-button" onClick={() => onMenuChange('set')}>
        Cancel
      </button>

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

export default AnalogTimer;
