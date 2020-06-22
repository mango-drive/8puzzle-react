import React, { useRef, useState, useEffect } from "react";
import { createGridLayout, findZero, areNeighbours } from "../utils/util";
import { cellSize, baseStyles } from "../styles";
import { motion } from "framer-motion";
import { deepCopy } from "../utils/util";
import {useInterval} from "../hoc/useInterval"

const tiles = [1, 0, 3, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
export const Board = ({ props }) => {

  const slot = tiles.indexOf(0);
  const [state, setState] = useState({
    tiles,
    slot
  });

  const dimension = Math.sqrt( state.tiles.length );
  const layout = createGridLayout(dimension, cellSize);

  const [solve, setSolve] = useState(false);


  useInterval(() => {
    console.log("solving");
  }, solve ? 500 : null)


  const updatePosition = (index) => {
    let { slot, tiles } = this.state;
    if (areNeighbours(slot, index, this.dimension)) {
      // swap the values
      this.swap(tiles, slot, index);
      // store new slot index
      this.setState({ tiles, slot: index });
    }
  };

  const swap = (arr, i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  };

  return (
    <div style={baseStyles.board}>
      <BoardLayout onTileClick={updatePosition} tiles={tiles} layout={layout} />
      <button style ={baseStyles.solveButton} onClick={() => setSolve(true)}>Solve</button>
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
  const animation = { x, y };

  return (
    <motion.div style={style} onTap={onTileClick} animate={animation}>
      <div style={baseStyles.tileContent}>{value}</div>
    </motion.div>
  );
};
