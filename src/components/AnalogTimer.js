import React, { useEffect, useRef, useState } from 'react';
import logoBlack from '../assets/logo-black.svg';
import logoWhite from '../assets/logo-white.svg';
import clockBackground from '../assets/clock.svg';

// AnalogTimer-komponenten visar en analog klocka och hanterar vybyten via hamburgermenyn
const AnalogTimer = ({ time, onTimeUp, onMenuChange, onAbortTimer }) => {
  const minuteHandRef = useRef(null);  // Skapar en referens för minutvisaren
  const secondHandRef = useRef(null);  // Skapar en referens för sekundvisaren
  const [menuOpen, setMenuOpen] = useState(false);  // Hanterar om hamburgermenyn är öppen eller stängd

  useEffect(() => {
    // Total tid i sekunder från både minuter och sekunder
    const totalSeconds = time.minutes * 60 + time.seconds;

    // Beräkna rotationen för minutvisaren
    // Minutvisaren tar hänsyn till både minuter och sekunder för smidig rotation
    const minuteRotationDegrees = ((time.minutes * 60 + time.seconds) / 3600) * 360 - 90;

    // Beräkna rotationen för sekundvisaren
    const secondRotationDegrees = (time.seconds / 60) * 360 - 90;

    // Uppdatera minutvisaren med korrekt rotation
    if (minuteHandRef.current) {
      minuteHandRef.current.style.transform = `rotate(${minuteRotationDegrees}deg)`;
    }

    // Uppdatera sekundvisaren med korrekt rotation
    if (secondHandRef.current) {
      secondHandRef.current.style.transform = `rotate(${secondRotationDegrees}deg)`;
    }
  }, [time]);  // Effekt körs varje gång 'time' uppdateras

  // Funktion för att öppna/stänga hamburgermenyn
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="analog-timer-container">
      {/* Header med rubrik och hamburgermeny */}
      <div className="header">
        <h1>interval</h1>
        <img
          src={menuOpen ? logoWhite : logoBlack}  // Byter logga beroende på om menyn är öppen eller stängd
          alt="Menu Logo"
          className="menu-logo"
          onClick={toggleMenu}  // Öppnar/stänger menyn vid klick
        />
      </div>

      {/* Klockans bakgrund och visare */}
      <div className="clock-wrapper">
        <img src={clockBackground} alt="Clock background" className="clock-background" />
        <div className="clock">
          {/* Minutvisare */}
          <div
            ref={minuteHandRef}  // Referens för minutvisaren
            className="hand minute-hand"
            style={{ transform: 'rotate(-90deg)' }}  // Startposition vid klockan 12
          ></div>
          {/* Sekundvisare */}
          <div
            ref={secondHandRef}  // Referens för sekundvisaren
            className="hand second-hand"
            style={{ transform: 'rotate(-90deg)' }}  // Startposition vid klockan 12
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
              onClick={toggleMenu}  // Stänger menyn om loggan klickas
            />
          </div>
          <div className="menu-items">
            {/* Byter vy mellan Analog och Digital Timer och stänger menyn */}
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
