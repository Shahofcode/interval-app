import React, { useState } from 'react';

const SetTimer = ({ onStartTimer }) => {
  const [minutes, setMinutes] = useState(0);

  return (
    <div className="set-timer">
      <h2>Set Timer</h2>
      <input
        type="number"
        value={minutes}
        onChange={(e) => setMinutes(Number(e.target.value))}
        placeholder="Enter minutes"
      />
      <button onClick={() => onStartTimer(minutes)}>Start Timer</button>
    </div>
  );
};

export default SetTimer;
