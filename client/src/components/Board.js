import React, { useState, useEffect } from "react";
import { areNeighbours, getPathToSolution } from "../utils/util";

import { cellSize, createGridLayout, baseStyles } from "../styles";
import { motion } from "framer-motion";
import { useInterval } from "../hoc/useInterval";

export const Board = ({
  tiles,
  width,
  inSolutionAnimation,
  onSolutionAnimationComplete,
}) => {
  // Board state
  const [state, setState] = useState({
    tiles,
    slot: tiles.indexOf(0),
  });

  // Update board state when tile prop changes (for new game)
  useEffect(() => {
    setState({
      tiles,
      slot: tiles.indexOf(0),
    });
  }, [tiles]);

  // Solution initial state
  const [solution, setSolution] = useState();
  // Search for solution when inSolutionAnimation prop
  // switches from false to true
  useEffect(() => {
    if (inSolutionAnimation) {
      const { tiles } = state;
      setSolution(getPathToSolution(tiles));
    }
  }, [inSolutionAnimation]);

  // Solution Animation
  const moveInterval = 130; // ms
  useInterval(
    // Callback that gets called every interval
    () => {
      // If the path to the solution is empty, we are done
      if (solution === undefined || solution.length === 0) {
        onSolutionAnimationComplete();
      } else {
        // Pop next move and cause GUI update
        const move = solution.shift();
        let tile1d = move.i * width + move.j;
        updatePosition(tile1d);
      }
    },
    // use the interval only when animating.
    inSolutionAnimation ? moveInterval : null
  );

  const updatePosition = (index) => {
    let { slot, tiles } = state;
    if (areNeighbours(slot, index, width)) {
      // swap the values
      swap(tiles, slot, index);
      // store new slot index
      setState({ tiles, slot: index });
    }
  };

  return (
    <div style={baseStyles.board}>
      <BoardLayout
        onTileClick={updatePosition}
        tiles={state.tiles}
        width={width}
      />
    </div>
  );
};

const BoardLayout = ({ tiles, width, onTileClick }) => {
  const [layout, setLayout] = useState(createGridLayout(width, cellSize));
  useEffect(() => {
    setLayout(createGridLayout(width, cellSize));
  }, [width]);

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
