"use client"
// components/TicTacToe.tsx
import React, { useState } from "react";

const TicTacToe: React.FC = () => {
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (index: number) => {
    if (calculateWinner(board) || board[index]) {
      return;
    }

    const newBoard = board.slice();
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const handleTryAgain = () => {
    setBoard(initialBoard);
    setXIsNext(true);
  };

  const renderSquare = (index: number) => {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : board.every((square) => square)
    ? "It's a draw!"
    : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <div className="game">
      <div className="status">{status}</div>
      <div className="board">
        {Array(3)
          .fill(null)
          .map((_, row) => (
            <div key={row} className="board-row">
              {Array(3)
                .fill(null)
                .map((_, col) => renderSquare(row * 3 + col))}
            </div>
          ))}
      </div>
      <button className="try-again" onClick={handleTryAgain}>
        Try Again
      </button>
    </div>
  );
};

function calculateWinner(squares: (string | null)[]): string | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

export default TicTacToe;






