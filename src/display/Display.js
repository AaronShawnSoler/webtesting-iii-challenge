import React from 'react';

const Display = ({ closed, locked }) => {
  const closedClass = `led ${closed ? 'red-led' : 'green-led'}`;
  const lockedClass = `led ${locked ? 'red-led' : 'green-led'}`;

  return (
    <div data-testid='displayPanel' className="display panel">
      <div data-testid='lockColor' className={lockedClass}>{locked ? 'Locked' : 'Unlocked'}</div>
      <div data-testid='closedColor' className={closedClass}>{closed ? 'Closed' : 'Open'}</div>
    </div>
  );
};

Display.defaultProps = {
  closed: false,
  locked: false,
};

export default Display;
