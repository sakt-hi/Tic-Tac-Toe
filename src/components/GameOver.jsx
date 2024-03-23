import React from 'react'
import WinnerIcon from '../assets/WinnerIcon'
import DrawIcon from '../assets/DrawIcon'

const GameOver = ({winner,restart}) => {
  return (
    <div className='game-over'>
        <div className="winning-image">
            {winner && <WinnerIcon />}
            {!winner && <DrawIcon />}
        </div>
        <h3>Game Over</h3>
        {winner && <p>{winner} won!</p>}
        {!winner && <p>It&apos;s a draw!</p>}
        <button className='play-again' onClick={restart}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 3V8M21 8H16M21 8L18 5.29168C16.4077 3.86656 14.3051 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.2832 21 19.8675 18.008 20.777 14" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
            Play again
        </button>       
    </div>
  )
}

export default GameOver