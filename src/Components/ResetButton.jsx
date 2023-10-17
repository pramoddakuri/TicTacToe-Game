import React from 'react';
import { GameState } from './GameState';

export const ResetButton = (props) => {
  const { gameState, handleResetGame } = props;
  if (gameState === GameState.inProgress) return <></>;
  return (
    <button className='reset-button' onClick={() => handleResetGame()}>Reset</button>
  );
};
