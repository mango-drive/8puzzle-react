import React, { useRef, useState, useEffect } from "react";
import { createGridLayout, findZero, areNeighbours, swap } from "../utils/util";
import { cellSize, baseStyles } from "../styles";
import { motion } from "framer-motion";
import { deepCopy } from "../utils/util";

export class Board extends React.Component {
  constructor(props) {
    super(props);
    this.dimension = 2;
    // TODO get this from style
    this.layout = createGridLayout(this.dimension, cellSize);

    const tiles = [
      [1, 0],
      [3,4]
    ];
    const slot = findZero(tiles);

    this.state = {
      tiles,
      slot,
    };
  }

  updatePosition = (index) => {

    let { slot } = this.state;
    if (areNeighbours(slot, index)) {
      const newTiles = deepCopy(this.state.tiles);
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
  const tileList = [];
  tiles.forEach((row, i) => {
    row.forEach((value, j) => {
      tileList.push(
        <Tile
          key={value.toString()}
          pos={layout[i][j]}
          value={value}
          onTileClick={() => onTileClick({ i, j })}
        />
      )
    })
  })

  console.log(tileList)

  return tileList;
};

const Tile = ({ value, pos, onTileClick }) => {


  let style = value ? baseStyles.tile : baseStyles.blankTile;
  const [x,y] = pos;

  const prevPosRef = useRef();
  useEffect(() => {
    console.log("useEffect called for ", value)
    prevPosRef.current = pos;
  });
  const prevPos = prevPosRef.current;
  const [xPrev, yPrev] = prevPos ? prevPos : [null, null];
  console.log("prevPos for ", value, ": ", prevPos)
  const animation = prevPos ? { x, y } : {x, y};

  return (
    <motion.div style={style} onTap={onTileClick} animate={animation}>
      <div style={baseStyles.tileContent}>{value}</div>
    </motion.div>
  );
};
