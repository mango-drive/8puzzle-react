
import React from 'react';
import { 
  areNeighbours, 
  findZero, 
  createBounds, 
  createDefaultPosition 
} from '../utils/util'

import { withMoveAnimation }  from './withMoveAnimation'

import {Tile, Slot} from './Tile'

import { baseStyles } from './styles'

export class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        board: [[1, 4, 2],
                [3, 0, 5],
                [6, 7, 8]] 
    }
  }

  handleMoveComplete(idx) {
    console.log("Move complete: ", idx)
  }

  render() {
    return <BoardRepresentation board={this.state.board} 
                                handleMoveComplete={this.handleMoveComplete}
            />
  }
}

export const BoardRepresentation = ({ board, handleMoveComplete }) => {
  const TileWithAnimation = withMoveAnimation(Tile);

  const tileSize = 100;

  const slotIdx = findZero(board);
  const slotUIPosition = createDefaultPosition(slotIdx, tileSize);

  const isSlot = ({i, j}) => i === slotIdx.i && j === slotIdx.j;

  const renderBoard = () => {
    return board.map((row, i) => {
      return row.map((value, j) => {
        const idx = {i, j}
        const position = createDefaultPosition(idx, tileSize)
        const tile = {value: value, idx: idx, uiPos: position}

        if (isSlot(idx)) 
          return ( 
            <Slot key={0} position={tile.uiPos}></Slot> 
          )

        if (areNeighbours(slotIdx, tile.idx)) {
          const bounds = createBounds(tile.uiPos, slotUIPosition)
          return (
            <TileWithAnimation key={tile.value} 
                          value={tile.value} 
                          idx = {idx}
                          style = {baseStyles.tile} 
                          position={tile.uiPos} 
                          targetPosition = {slotUIPosition}
                          handleOnMoveComplete = {handleMoveComplete}
            />
          )
        } else {
          return (
            <Tile key={tile.value} value={tile.value} position={tile.uiPos}/>
          )
        }
      })
    })
  }

  // 12: test tile, delete when done
  return (
    <div>
      {renderBoard()}
    </div>
  )
}