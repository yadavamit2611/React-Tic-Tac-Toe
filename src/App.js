import { useState } from "react";
import "./styles.css";

let { firstPlayer, SecondPlayer } = ["", ""];
export default function App() {
  const [showTicTac, setShowTicTac] = useState(false);
  return (
    <div className="App">
      <InputNames onValidate={setShowTicTac} />
      <div
        style={{
          display: showTicTac ? "block" : "none"
        }}
      >
        <h1>Tic Tac Toe</h1>
        <Game />
      </div>
    </div>
  );
}

function InputNames({ onValidate }) {
  const [firstName, setFirstName] = useState();
  const [secondName, setSecondName] = useState();
  const [error, setError] = useState("");
  function validateNames() {
    if (firstName === secondName) {
      setError("Names cant be same");
    } else {
      firstPlayer = firstName;
      SecondPlayer = secondName;
      onValidate(true);
    }
  }

  return (
    <div>
      <div>
        <input
          type="text"
          className="user-input"
          placeholder="Add Player 1"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          className="user-input"
          placeholder="Add Player 2"
          value={secondName}
          onChange={(e) => setSecondName(e.target.value)}
        ></input>
      </div>
      <button onClick={validateNames}>Submit</button>
      <div>
        <span style={{ color: "red" }}>{error}</span>
      </div>
    </div>
  );
}

function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  console.log(currentSquares);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ul>{moves}</ul>
      </div>
    </div>
  );
}

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(value) {
    if (!(firstPlayer && SecondPlayer)) {
      alert("Enter players first");
      return;
    }
    if (squares[value] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[value] = "X";
    } else {
      nextSquares[value] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let name = winner === "X" ? firstPlayer : SecondPlayer;
  let status;
  if (winner) {
    status = "Winner: " + name;
  } else {
    status = "Next player: " + (xIsNext ? firstPlayer : SecondPlayer);
  }

  return (
    <div style={{ justifyItems: "center" }}>
      <div className="status">{status}</div>
      <div className="board center">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
