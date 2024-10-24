import React from 'react';
import logoBlack from '../assets/logo-black.svg';
import logoWhite from '../assets/logo-white.svg';

const DigitalTimer = ({ time, onTimeUp, onMenuChange }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="digital-timer-container">
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
              src={logoWhite}
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
