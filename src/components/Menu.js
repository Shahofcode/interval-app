import React from 'react';

const Menu = ({ onMenuChange }) => {
  return (
    <div className="menu">
      <button onClick={() => onMenuChange('analog')}>Analog View</button>
      <button onClick={() => onMenuChange('digital')}>Digital View</button>
    </div>
  );
};

export default Menu;
