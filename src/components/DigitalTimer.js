import React, { useEffect, useRef, useState } from 'react';
import logoBlack from '../assets/logo-black.svg';
import logoWhite from '../assets/logo-white.svg';

// DigitalTimer-komponenten visar tiden i digitalt format och hanterar vybyten via hamburgermenyn
const DigitalTimer = ({ time, onTimeUp, onMenuChange, onAbortTimer }) => {
  const [menuOpen, setMenuOpen] = useState(false);  // Hanterar om hamburgermenyn är öppen eller stängd
  const timer = useRef(null);  

  useEffect(() => {
  }, [time]);  // Uppdateras varje gång time ändras

  // Funktion för att öppna/stänga hamburgermenyn
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);  // Växlar mellan att öppna och stänga menyn
  };

  return (
    <div className="digital-timer-container">
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

      {/* Tiden i digitalt format */}
      <div className="digital-timer">
        <h1>{`${time.minutes} : ${time.seconds < 10 ? '0' : ''}${time.seconds}`}</h1>  {/* Visar minuter och sekunder */}
        <button className="cancel-button" onClick={onAbortTimer}>
          ABORT TIMER  {/* Knappar för att avbryta timern */}
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
              onClick={toggleMenu}  // Stänger menyn om loggan klickas
            />
          </div>
          <div className="menu-items">
            {/* Byter vy mellan Analog och Digital Timer och stänger menyn */}
            <button onClick={() => onMenuChange('analog')}>ANALOG TIMER</button>
            <button onClick={() => onMenuChange('digital')}>DIGITAL TIMER</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DigitalTimer;
