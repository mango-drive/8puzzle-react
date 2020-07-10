import React, { useState } from "react";
import { baseStyles } from "../styles";
import { Board } from "./Board";
import { createSolvablePuzzle } from "../utils/solve";

import { Row, Container } from "react-bootstrap";

export const Game = () => {
  const [width, setWidth] = useState(3);

  const [initialTiles, setInitialTiles] = useState(createSolvablePuzzle(width));
  const [inSolutionAnimation, setInSolutionAnimation] = useState(false);

  const handleNewGame = () => {
    setInitialTiles(createSolvablePuzzle(width));
  };

  const handleOnSolve = () => {
    setInSolutionAnimation(true);
  };

  const handleOnSolutionAnimationComplete = () => {
    setInSolutionAnimation(false);
  };

  const handleOnDimensionChange = (incrementDirection) => {
    const newWidth = width + incrementDirection;
    if (newWidth > 1 && newWidth < 4) {
      setWidth(newWidth);
      setInitialTiles(createSolvablePuzzle(newWidth));
    }
  };

  return (
    <div style={baseStyles.game}>
      <Board
        tiles={initialTiles}
        width={width}
        inSolutionAnimation={inSolutionAnimation}
        onSolutionAnimationComplete={handleOnSolutionAnimationComplete}
      ></Board>
      <button onClick={handleNewGame}>New Game</button>
      <button style={baseStyles.solveButton} onClick={handleOnSolve}>
        Solve
      </button>
      <button style={{ gridRow: 5 }} onClick={() => handleOnDimensionChange(1)}>
        +
      </button>
      <button
        style={{ gridRow: 6 }}
        onClick={() => handleOnDimensionChange(-1)}
      >
        -
      </button>
    </div>
  );
};
