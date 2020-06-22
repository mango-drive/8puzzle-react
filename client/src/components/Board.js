import React, { useRef, useState, useEffect } from "react";
import { createGridLayout, findZero, areNeighbours, swap } from "../utils/util";
import { cellSize, baseStyles } from "../styles";
import { motion } from "framer-motion";
import {deepCopy} from '../utils/util'

export class Board extends React.Component {
  constructor(props) {
    super(props);
    this.dimension = 4;
    // TODO get this from style
    this.layout = createGridLayout(this.dimension, cellSize);

    const tiles = [
      [1, 2, 3, 9],
      [4, 5, 6, 10],
      [0, 7, 8, 11],
      [12, 13, 14, 15],
    ];
    const slot = findZero(tiles);

    this.state = {
      tiles,
      slot,
    };
  }

  updatePosition = (index) => {
    console.log(index, "clicked");
    let { slot } = this.state;
    if (areNeighbours(slot, index)) {
      let newTiles = deepCopy(this.state.tiles)
      console.log(newTiles)
      // swap the values
      swap(newTiles, slot, index);
      // store new slot index
      slot = index;
      this.setState({ tiles: newTiles, slot });
    }
  };

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
  return tiles.map((row, i) => {
    return row.map((value, j) => {
      const pos = layout[i][j];

      const animation = { x: pos[0], y: pos[1] };
          console.log("animation for ", value, " is", animation)
      return (
        <motion.div key={value} animate={animation} onTap={() => onTileClick({i, j})}>
          <Tile
            key={value}

            value={value}
          />
        </motion.div>
      );
    });
  });
};

const Tile = ({ value }) => {
  let style = value ? baseStyles.tile : baseStyles.blankTile;

  return (
    <div style={style}>
      <div style={baseStyles.tileContent}>{value}</div>
    </div>
  );
};
