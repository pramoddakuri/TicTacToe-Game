import React from 'react';

const Tile = (props) => {
  const { value, className, onClick, playerTurn } = props;
  let hoverClass = null;
  if (value == null && playerTurn != null) {
    hoverClass = `${playerTurn.toLowerCase()}-hover`;
  }
  return (
    <div onClick={onClick} className={`tile ${className} ${hoverClass}`}>
      {value}
    </div>
  );
};

export default Tile;
