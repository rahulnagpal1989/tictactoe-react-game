import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

const rowStyle = {
	display: "flex",
};

const squareStyle = {
	width: "60px",
	height: "60px",
	backgroundColor: "#ddd",
	margin: "4px",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	fontSize: "20px",
	color: "white",
};

const boardStyle = {
	backgroundColor: "#eee",
	width: "208px",
	alignItems: "center",
	justifyContent: "center",
	display: "flex",
	flexDirection: "column",
	border: "3px #eee solid",
};

const containerStyle = {
	display: "flex",
	alignItems: "center",
	flexDirection: "column",
};

const instructionsStyle = {
	marginTop: "5px",
	marginBottom: "5px",
	fontWeight: "bold",
	fontSize: "16px",
};

const buttonStyle = {
	marginTop: "15px",
	marginBottom: "16px",
	width: "80px",
	height: "40px",
	backgroundColor: "#8acaca",
	color: "white",
	fontSize: "16px",
};

function Square({ pos, squareClick, defaultMark }) {
	return (
		<div className="square" style={squareStyle} onClick={() => squareClick(pos)}>
			{defaultMark[pos]}
		</div>
	);
}

function Board({ squareClick, defaultMark, reset, count, won }) {
	return (
		<div style={containerStyle} className="gameBoard">
			<div id="statusArea" className="status" style={instructionsStyle}>
				Next player: <span>{count % 2 === 0 ? "O" : "X"}</span>
			</div>
			<div id="winnerArea" className="winner" style={instructionsStyle}>
				Winner: <span>{won === null ? "None" : won}</span>
			</div>
			<button style={buttonStyle} onClick={reset}>
				Reset
			</button>
			<div style={boardStyle}>
				<div className="board-row" style={rowStyle}>
					<Square pos={0} squareClick={squareClick} defaultMark={defaultMark} />
					<Square pos={1} squareClick={squareClick} defaultMark={defaultMark} />
					<Square pos={2} squareClick={squareClick} defaultMark={defaultMark} />
				</div>
				<div className="board-row" style={rowStyle}>
					<Square pos={3} squareClick={squareClick} defaultMark={defaultMark} />
					<Square pos={4} squareClick={squareClick} defaultMark={defaultMark} />
					<Square pos={5} squareClick={squareClick} defaultMark={defaultMark} />
				</div>
				<div className="board-row" style={rowStyle}>
					<Square pos={6} squareClick={squareClick} defaultMark={defaultMark} />
					<Square pos={7} squareClick={squareClick} defaultMark={defaultMark} />
					<Square pos={8} squareClick={squareClick} defaultMark={defaultMark} />
				</div>
			</div>
		</div>
	);
}

function Game() {
	const [count, setCount] = useState(1);
	const [won, setWon] = useState(null);
	const [defaultMark, setDefaultMark] = useState([null, null, null, null, null, null, null, null, null]);
	const reset = () => {
		setCount(1);
		setWon(null);
		setDefaultMark([null, null, null, null, null, null, null, null, null]);
	};
	const squareClick = (pos) => {
		if (won === null && defaultMark[pos] === null) {
			if (count % 2 === 0) {
				defaultMark[pos] = "O";
			} else {
				defaultMark[pos] = "X";
			}
			let result = checkResult(defaultMark);
			if (result !== null) {
				setWon(result);
			}
			setCount(count + 1);
		}
	};

	const checkResult = (defaultMark) => {
		if (defaultMark[0] !== null && defaultMark[0] === defaultMark[1] && defaultMark[1] === defaultMark[2]) {
			return defaultMark[0];
		} else if (defaultMark[3] !== null && defaultMark[3] === defaultMark[4] && defaultMark[4] === defaultMark[5]) {
			return defaultMark[3];
		} else if (defaultMark[6] !== null && defaultMark[6] === defaultMark[7] && defaultMark[7] === defaultMark[8]) {
			return defaultMark[6];
		} else if (defaultMark[0] !== null && defaultMark[0] === defaultMark[3] && defaultMark[3] === defaultMark[6]) {
			return defaultMark[0];
		} else if (defaultMark[1] !== null && defaultMark[1] === defaultMark[4] && defaultMark[4] === defaultMark[7]) {
			return defaultMark[1];
		} else if (defaultMark[2] !== null && defaultMark[2] === defaultMark[5] && defaultMark[5] === defaultMark[8]) {
			return defaultMark[2];
		} else if (defaultMark[0] !== null && defaultMark[0] === defaultMark[4] && defaultMark[4] === defaultMark[8]) {
			return defaultMark[0];
		} else if (defaultMark[2] !== null && defaultMark[2] === defaultMark[4] && defaultMark[4] === defaultMark[6]) {
			return defaultMark[2];
		}
		return null;
	};
	return (
		<div className="game">
			<div className="game-board">
				<Board squareClick={squareClick} defaultMark={defaultMark} reset={reset} count={count} won={won} />
			</div>
		</div>
	);
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Game />);
