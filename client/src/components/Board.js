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
  const [state, setState] = useState({
    tiles,
    slot: tiles.indexOf(0),
  });

  useEffect(() => {
    setState({
      tiles,
      slot: tiles.indexOf(0),
    });
  }, [tiles]);

  const [solution, setSolution] = useState();
  useEffect(() => {
    if (inSolutionAnimation) {
      const {tiles} = state;
      setSolution(getPathToSolution(tiles));
    }
  }, [inSolutionAnimation]);

  const moveInterval = 130; // ms

  useInterval(
    () => {
      if (solution === undefined || solution.length === 0) {
        onSolutionAnimationComplete();
      } else {
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
