import React, { useRef, useState, useEffect } from "react";
import { areNeighbours, getPathToSolution } from "../utils/util";

import { cellSize, createGridLayout, baseStyles } from "../styles";
import { motion } from "framer-motion";
import { useInterval } from "../hoc/useInterval";
import { createSolvablePuzzle } from "../utils/solve";

export const Game = () => {
  const [dim, setDim] = useState(3);

  const [initialTiles, setInitialTiles] = useState(createSolvablePuzzle(dim));

  const onNewGame = () => {
    setInitialTiles(createSolvablePuzzle(dim));
  };

  return (
    <div style={{ height: "100%", display: "grid" }}>
      <Board tiles={initialTiles}></Board>
      <button onClick={onNewGame}>New Game</button>
    </div>
  );
};

export const Board = ({ tiles }) => {
  const [state, setState] = useState({
    tiles,
    slot: tiles.indexOf(0),
  });

  useEffect(() => {
    setState({ tiles, slot: tiles.indexOf(0) });
  }, [ tiles ]);

  const dimension = Math.sqrt(state.tiles.length);
  const layout = createGridLayout(dimension, cellSize);

  const [solution, setSolution] = useState();
  const [animateSolution, setAnimateSolution] = useState(false);

  const moveInterval = 130; // ms

  useInterval(
    () => {
      if (solution === undefined || solution.length == 0) {
        setAnimateSolution(false);
      } else {
        const move = solution.shift();
        let tile1d = move.i * dimension + move.j;
        updatePosition(tile1d);
      }
    },
    // use the interval only when animating.
    animateSolution ? moveInterval : null
  );

  const onSolution = () => {
    const { tiles } = state;
    setSolution(getPathToSolution(tiles, dimension));
    setAnimateSolution(true);
  };

  const updatePosition = (index) => {
    console.log("Clicked on", index);
    let { slot, tiles } = state;
    console.log("State before", slot, tiles);
    if (areNeighbours(slot, index, dimension)) {
      // swap the values
      swap(tiles, slot, index);
      // store new slot index
      setState({ tiles, slot: index });
      console.log("Swapped", slot, index);
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
