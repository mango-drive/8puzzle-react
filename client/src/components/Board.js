
import React from 'react';
import { 
  areNeighbours, 
  findZero, 
  createDefaultPosition,
  deepCopy,
  swap
} from '../utils/util'
import { solve, parseSolution } from '../utils/solve'
import { withMoveAnimation }  from '../hoc/withMoveAnimation'
import {Tile, Slot} from './Tile'
import { baseStyles } from '../styles'

export class Board extends React.Component {
  constructor(props) {
    super(props);

    const board = [[1, 0],
                   ];

    const slotIdx = findZero(board);

    this.handleMoveComplete = this.handleMoveComplete.bind(this)

    const { solveAction } = this.props;

    let solution;
    if (solveAction) {
      solution = solve(board);
      console.log(solution)
    }

    this.state = {
        board: board,
        slotIdx: slotIdx,
        solving: solveAction,
    }
  }

  componentWillReceiveProps() {
    const { solveAction } = this.props;
    const solution = solve(this.state.board);
    const tilesToMove = parseSolution(solution)
    this.setState({ solving: this.props.solveAction, tilesToMove: tilesToMove, tileToMove: tilesToMove[0], moveIdx: 0})
  }

  handleMoveComplete(idx) {
    console.log("animation complete")
    const { board, slotIdx, } = this.state;
    const newBoard = deepCopy(board);
    swap(newBoard, idx, slotIdx);

    this.setState( {
      board: newBoard,
      slotIdx: findZero(newBoard)
    })

  }


  render() {
    const { board, slotIdx, tileToMove, solving } = this.state;
    console.log("Board solving", tileToMove);
    return (
      <BoardRepresentation board={board} 
                          slotIdx={slotIdx}
                          tileToMove={tileToMove}
                          handleMoveComplete={this.handleMoveComplete}
      />
    )
  }
}

export const BoardRepresentation = ({ board, slotIdx, tileToMove, handleMoveComplete }) => {
  const TileWithAnimation = withMoveAnimation(Tile);

  const tileSize = 100;

  const slotUIPosition = createDefaultPosition(slotIdx, tileSize);

  const isSlot = ({i, j}) => i === slotIdx.i && j === slotIdx.j;
  const isMove = ({i, j}) => tileToMove && i === tileToMove.i && j === tileToMove.j;

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

        if (isMove(idx)) {
          console.log("with animation", tile.value)
          return (
            <TileWithAnimation key={tile.value} 
                          value={tile.value} 
                          position={tile.uiPos} 
                          targetPosition = {slotUIPosition}
                          handleOnMoveComplete = {handleMoveComplete}
                          animate={true}
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