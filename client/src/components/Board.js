import React, { useRef, useState, useEffect } from "react";
import { createGridLayout, findZero, areNeighbours } from "../utils/util";
import { cellSize, baseStyles } from "../styles";
import { motion } from "framer-motion";
import { deepCopy } from "../utils/util";

export class Board extends React.Component {
  constructor(props) {
    super(props);
    const tiles = [1, 0, 2, 4];
    this.dimension = Math.sqrt(tiles.length);
    // TODO get this from style
    this.layout = createGridLayout(this.dimension, cellSize);

    const slot = tiles.indexOf(0);

    this.state = {
      tiles,
      slot,
    };
  }

  updatePosition = (index) => {
    let { slot, tiles} = this.state;
    if (areNeighbours(slot, index, this.dimension)) {
      // swap the values
      this.swap(tiles, slot, index);
      // store new slot index
      slot = index;
      this.setState({ tiles, slot });
    }
  };

  swap = ( arr, i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  render() {
    const { tiles } = this.state;

    return (
      <div style={baseStyles.board}>
        <BoardLayout
          onTileClick={this.updatePosition}
          tiles={tiles}
          layout={this.layout}
        />
      </div>
    );
  }
}

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
  const animation = {x, y}

  return (
    <motion.div style={style} onTap={onTileClick} animate={animation}>
      <div style={baseStyles.tileContent}>{value}</div>
    </motion.div>
  );
};
