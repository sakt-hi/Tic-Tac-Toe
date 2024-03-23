import React, { useState } from "react";



const GameBoard = ({ onSelectSquare, board }) => {


  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((symbol, colIndex) => (
              <li className="symbol-button-col" key={colIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  className="symbol-button"
                  disabled={symbol !== null}
                >
                  {symbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
};

export default GameBoard;
