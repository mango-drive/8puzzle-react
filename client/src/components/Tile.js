
import React, {useState} from 'react';
import { areNeighbours, findZero, createBounds, createDefaultPosition } from '../utils/util'
import {withMoveAnimation} from './withMoveAnimation'
import { withDrag } from './withDrag'
import { baseStyles } from './styles'
import '../index.css'

const Slot = (props) => {
  return (
    // renders tile in position
    <div 
      style={{...baseStyles.blankTile, ...props.position}}
    ></div>
  )
}

class Tile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    // onClick coming from withMoveAnimation
    const {value, position, onMouseDown, onClick} = this.props;
    console.log("Rendering ", value, position);
    const optionalMouseHandlers = {onClick: onClick, onMouseDown: onMouseDown}
    const optionalAnimation = { ...this.props.additionalStyles }
    console.log(optionalAnimation)
    return (
      <div style={{...baseStyles.tile, ...position, ...optionalAnimation}} {...optionalMouseHandlers}>
        <div className = 'disable-selection' style={baseStyles.tileContent}>{value}</div>
      </div>
    )
  }
}

const TileWithDrag = withDrag(Tile);
const TileWithAnimation = withMoveAnimation(Tile);

export const Board2 = ({ initialState }) => {
  const tileSize = 100;
  const [board, setBoard] = useState(initialState);

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
            <TileWithDrag key={tile.value} value={tile.value} style = {baseStyles.tile} defaultPosition={tile.uiPos} bounds={bounds}/>
          )
        } else {
          return (
            <Tile key={tile.value} value={tile.value} position={tile.uiPos}/>
          )
        }
      })
    })
  }

  return (
    <div>
      {renderBoard()}
      <TileWithAnimation key={12} value={12} position={ {top: 600, left: 100} }/>
    </div>

  )
}