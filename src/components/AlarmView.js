import React from 'react';
import alarmClockIcon from '../assets/times-up.svg';
import ellipse2 from '../assets/Ellipse 2.svg';
import ellipse3 from '../assets/Ellipse 3.svg';
import ellipse4 from '../assets/Ellipse 4.svg';
import ellipse5 from '../assets/Ellipse 5.svg';

const AlarmView = ({ onReset }) => {
  return (
    <div className="alarm-view">
      {/* Ellipserna bakom klockan */}
      <img src={ellipse5} alt="Ellipse 5" className="ellipse ellipse-5" />
      <img src={ellipse4} alt="Ellipse 4" className="ellipse ellipse-4" />
      <img src={ellipse3} alt="Ellipse 3" className="ellipse ellipse-3" />
      <img src={ellipse2} alt="Ellipse 2" className="ellipse ellipse-2" />

      {/* Alarmklockan i mitten */}
      <img src={alarmClockIcon} alt="Alarm Clock" className="alarm-clock" />

      {/* Texten och knappen */}
      <h1 className="alarm-text">Times Up!</h1>
      <button className="alarm-button" onClick={onReset}>
        SET NEW TIMER
      </button>
    </div>
  );
};

export default AlarmView;
