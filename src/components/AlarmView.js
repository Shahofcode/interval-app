import React from 'react';

const AlarmView = ({ onReset }) => {
  return (
    <div className="alarm-view">
      <h1>Time's Up!</h1>
      <button onClick={onReset}>Go to Set Timer</button>
    </div>
  );
};

export default AlarmView;
