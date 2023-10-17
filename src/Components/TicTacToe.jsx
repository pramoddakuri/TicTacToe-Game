import React, { useEffect, useState } from 'react';
import Board from './Board';
import { GameOver } from './GameOver';
import { GameState } from './GameState';
import { ResetButton } from './ResetButton';
import ClickSoundAsset from '../Sounds/clickSound.wav';
import GameOverSoundAsset from '../Sounds/gameOver.wav';

const clickSound = new Audio(ClickSoundAsset);
clickSound.volume = 0.2;
const gameOverSound = new Audio(GameOverSoundAsset);
gameOverSound.volume = 0.5;

const PLAYER_X = 'X';
const PLAYER_O = 'O';

const winningCombinations = [
  //Rows
  { combo: [0, 1, 2], strikeClass: 'strike-row-1' },
  { combo: [3, 4, 5], strikeClass: 'strike-row-2' },
  { combo: [6, 7, 8], strikeClass: 'strike-row-3' },

  //Columns
  { combo: [0, 3, 6], strikeClass: 'strike-column-1' },
  { combo: [1, 4, 7], strikeClass: 'strike-column-2' },
  { combo: [2, 5, 8], strikeClass: 'strike-column-3' },

  //Diagonals
  { combo: [0, 4, 8], strikeClass: 'strike-diagonal-1' },
  { combo: [2, 4, 6], strikeClass: 'strike-diagonal-2' },
];

const checkWinner = (tiles, setStrikeClass, setGameState) => {
  winningCombinations.map((comb) => {
    const { combo, strikeClass } = comb;
    const tile0 = tiles[combo[0]];
    const tile1 = tiles[combo[1]];
    const tile2 = tiles[combo[2]];
    if (tile0 !== null && tile0 === tile1 && tile0 === tile2) {
      setStrikeClass(strikeClass);
      if (tile0 === PLAYER_O) {
        setGameState(GameState.playerOWins);
      } else {
        setGameState(GameState.playerXWins);
      }
      return;
    }
  });

  const areAllTilesFilled = tiles.every((tile) => tile !== null);
  if (areAllTilesFilled) {
    setGameState(GameState.draw);
  }
};

export const TicTacToe = () => {
  const [tiles, setTiles] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
  const [strikeClass, setStrikeClass] = useState();
  const [gameState, setGameState] = useState(GameState.inProgress);

  const handleTileClick = (index) => {
    if(gameState !== GameState.inProgress) return;
    if (tiles[index] !== null) return;
    const newTiles = [...tiles];
    newTiles[index] = playerTurn;
    setTiles(newTiles);
    if (playerTurn === PLAYER_X) {
      setPlayerTurn(PLAYER_O);
    } else {
      setPlayerTurn(PLAYER_X);
    }
  };

  const handleResetGame = () => {
    setTiles(Array(9).fill(null));
    setStrikeClass(null);
    setGameState(GameState.inProgress);
    setPlayerTurn(PLAYER_X);
  }

  useEffect(()=> {
    if(tiles.some((tile) => tile !== null)){
      clickSound.play();
    }
  }, [tiles])

  useEffect(()=>{
    if(gameState !== GameState.inProgress){
      gameOverSound.play();
    }
  },[gameState])

  useEffect(() => {
    checkWinner(tiles, setStrikeClass, setGameState);
  }, [tiles]);

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <Board
        playerTurn={playerTurn}
        handleTileClick={handleTileClick}
        tiles={tiles}
        strikeClass={strikeClass}
      />
      <GameOver gameState={gameState} />
      <ResetButton gameState={gameState} handleResetGame={handleResetGame}/>
    </div>
  );
};
