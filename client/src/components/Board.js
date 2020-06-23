import React, { useRef, useState, useEffect } from "react";
import { areNeighbours, getSolution } from "../utils/util";

import { cellSize, createGridLayout, baseStyles } from "../styles";
import { motion } from "framer-motion";
import { useInterval } from "../hoc/useInterval";

const tiles = [10, 9, 8, 1, 2, 3, 5, 4, 0, 6, 7, 11, 12, 13, 14, 15,];

export const Board = ({ props }) => {
  const slot = tiles.indexOf(0);
  const [state, setState] = useState({
    tiles,
    slot,
  });

  const dimension = Math.sqrt(state.tiles.length);
  const layout = createGridLayout(dimension, cellSize);

  const [solution, setSolution] = useState();
  const [animateSolution, setAnimateSolution] = useState(false);

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
    animateSolution ? 100 : null
  );

  const onSolution = () => {
    const { tiles } = state;
    setSolution(getSolution(tiles, dimension));
    setAnimateSolution(true);
  };

  const updatePosition = (index) => {
    console.log("clicked");
    let { slot, tiles } = state;
    if (areNeighbours(slot, index, dimension)) {
      // swap the values
      swap(tiles, slot, index);
      // store new slot index
      setState({ tiles, slot: index });
    }
  };

  return (
    <div style={baseStyles.board}>
      <BoardLayout onTileClick={updatePosition} tiles={tiles} layout={layout} />
      <button style={baseStyles.solveButton} onClick={onSolution}>
        Solve
      </button>
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
