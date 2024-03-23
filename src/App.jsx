import { useState, useEffect } from 'react'
import './App.css'
import Player from './components/Player'
import GameBoard from './components/GameBoard'
import Log from './components/Log';
import { WINNING_COMBINATIONS } from './winningCombinations';
import GameOver from './components/GameOver';
import Github from './assets/github.svg';

function deriveActivePlayer(gameTurn){
  let currentPlayer = 'X';

  if(gameTurn.length>0 && gameTurn[0].player==='X'){
    currentPlayer = 'O'
  }

  return currentPlayer;

}

function deriveGameboard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map(array=>[...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard
}

function deriveWinner(gameBoard, players){
  let winner = null;

  for (const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }

  }

  return winner
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const PLAYERS ={
  X:'Player 1',
  O:'Player 2'
}

function App() {
  const [players, setPlayers] = useState(PLAYERS)
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameboard(gameTurns);
  const winner = deriveWinner(gameBoard,players);
  const hasDraw = gameTurns.length === 9 && !winner;
  const isStarted = gameTurns.length;
  const [reMatch, setReMatch] = useState(false)

  function handleSelectSquare(rowIndex, colIndex){
    setGameTurns(prevTurns =>{
      const currentPlayer = deriveActivePlayer(prevTurns)

      const updatedTurns = [{
        square: {row:rowIndex, col:colIndex},player:currentPlayer
      },...prevTurns]

      return updatedTurns
    })
  }

  function handlePlayAgain(){
    setGameTurns([])
    setReMatch(true)
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayers=>{
      return{
        ...prevPlayers,
        [symbol]:newName
      }
    })
  }

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Cancel the event as returning a string will prompt the user
      event.preventDefault();
      // Chrome requires returnValue to be set
      event.returnValue = '';
    };

    if(gameTurns.length>0){
      // Add event listener when component mounts
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [gameTurns]);

  return (
    <main>
      <h1>Tic Tac Toe Game</h1>
      <div className="game-container">
        <ol className="" id="players">
          <Player
            initialName={PLAYERS.X}
            symbol={"X"}
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
            isStarted={isStarted}
            reMatch={reMatch}
          />
          <div className="vr"></div>
          <Player
            initialName={PLAYERS.O}
            symbol={"O"}
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
            isStarted={isStarted}
            reMatch={reMatch}
          />
        </ol>
      </div>
      <div className="board-log-wrap">
        <Log turns={gameTurns} startPlayer={players['X']} />
        <div className="board-container">
          {(winner || hasDraw) && (
            <div className="winner-info">
              <GameOver winner={winner} restart={handlePlayAgain} />
            </div>
          )}
          <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
        </div>
      </div>
      <div className="credits">
        <p>Developed by</p>
        <a href="https://github.com/sakt-hi" target='_blank' className="dev">
          <img className='github-icon' src={Github} alt="" srcset="" />
          <h3>Sakthivel G</h3>
        </a>
      </div>
    </main>
  );
}

export default App
