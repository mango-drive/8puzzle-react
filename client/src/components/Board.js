import React, { useRef, useState, useEffect } from "react";
import { areNeighbours, getPathToSolution } from "../utils/util";

import { cellSize, createGridLayout, baseStyles } from "../styles";
import { motion } from "framer-motion";
import { useInterval } from "../hoc/useInterval";
import { createSolvablePuzzle } from "../utils/solve";
import { SolveButton } from "./SolveButton";

export const Game = () => {
  const [dim, setDim] = useState(3);

  const [initialTiles, setInitialTiles] = useState(createSolvablePuzzle(dim));
  const [inSolutionAnimation, setInSolutionAnimation] = useState(false);

  const handleNewGame = () => {
    setInitialTiles(createSolvablePuzzle(dim));
  };

  const handleOnSolve = () => {
    setInSolutionAnimation(true);
  };

  const handleOnSolutionAnimationComplete = () => {
    setInSolutionAnimation(false);
  };

  return (
    <div style={{ height: "100%", display: "grid" }}>
      <Board
        tiles={initialTiles}
        inSolutionAnimation={inSolutionAnimation}
        onSolutionAnimationComplete={handleOnSolutionAnimationComplete}
      ></Board>
      <button onClick={handleNewGame}>New Game</button>
      <button onClick={handleOnSolve}>Solve</button>
    </div>
  );
};

export const Board = ({
  tiles,
  inSolutionAnimation,
  onSolutionAnimationComplete,
}) => {
  const [state, setState] = useState({
    tiles,
    slot: tiles.indexOf(0),
  });

  const [solution, setSolution] = useState();

  useEffect(() => {
    setState({ tiles, slot: tiles.indexOf(0) });
  }, [tiles]);

  useEffect(() => {
    if (inSolutionAnimation) {
      startSolutionAnimation();
    }
  }, [inSolutionAnimation]);

  const dimension = Math.sqrt(state.tiles.length);
  const layout = createGridLayout(dimension, cellSize);

  const moveInterval = 130; // ms

  useInterval(
    () => {
      if (solution === undefined || solution.length == 0) {
        onSolutionAnimationComplete();
      } else {
        const move = solution.shift();
        let tile1d = move.i * dimension + move.j;
        updatePosition(tile1d);
      }
    },
    // use the interval only when animating.
    inSolutionAnimation ? moveInterval : null
  );

  const startSolutionAnimation = () => {
    const { tiles } = state;
    setSolution(getPathToSolution(tiles, dimension));
  };

  const updatePosition = (index) => {
    let { slot, tiles } = state;
    if (areNeighbours(slot, index, dimension)) {
      // swap the values
      swap(tiles, slot, index);
      // store new slot index
      setState({ tiles, slot: index });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <BoardLayout
        onTileClick={updatePosition}
        style={baseStyles.board}
        tiles={tiles}
        layout={layout}
      />
      {/* <button style={baseStyles.solveButton}>Solve</button> */}
    </div>
  );
};

const BoardLayout = ({ tiles, layout, onTileClick }) => {
  return tiles.map((value, i) => {
    return (
      <Tile
        key={value.toString()}
        pos={layout[i]}
        value={value}
        onTileClick={() => onTileClick(i)}
      />
    );
  });
};

const Tile = ({ value, pos, onTileClick }) => {
  let style = value ? baseStyles.tile : baseStyles.blankTile;
  const [x, y] = pos;

  return (
    <motion.div style={style} onTap={onTileClick} animate={{ x, y }}>
      <div style={baseStyles.tileContent}>{value}</div>
    </motion.div>
  );
};

const swap = (arr, i, j) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};
