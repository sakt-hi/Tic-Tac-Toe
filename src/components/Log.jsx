import React from 'react'

const instructions =[
    'Tic-Tac-Toe is played on a 3x3 grid',
    'Players can mark spaces with their symbol - X or O',
    'First to get three of their symbols in a row, column or diagonal, wins',
    'Draw if grid fills up.'
]

const Log = ({turns, startPlayer}) => {
  return (
    <div className="log-container">
        {turns.length>0 && <div className="log-moves">
            <h3>Player's Moves</h3>
            <ol id="logs">
            {turns.map(turn=>
                <li key={`${turn.square.row}${turn.square.col}`} >{turn.player} selected ({turn.square.row},{turn.square.col})</li>    
            )}
            </ol>
        </div>}
        {turns.length ===0 && <div className="instructions">
            <h3>Game Instructions</h3>
            <ul>
                {instructions.map((item,index)=>(
                    <li className='ins-list' key={index}>{item}</li>
                ))}
            </ul>
            <h4>{startPlayer}: Click an empty cell to start.</h4>
        </div>}
    </div>
  )
}

export default Log