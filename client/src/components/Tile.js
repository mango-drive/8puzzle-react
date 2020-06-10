
import React, {useState} from 'react';
import { areNeighbours, findZero, neighboursOfIdx } from '../utils/util'
import '../index.css'

const baseStyles = {
  tile: {
    width: 100,
    height: 100,
    position: 'absolute',
    backgroundColor:"#DFCFBE",
    border: "0.5px solid black",
    borderRadius: "7px"
  }, 

  blankTile: {
    width: 100,
    height: 100,
    opacity: 0,
    position: 'absolute'
  }
}

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
    const {value, position, onMouseMove, onMouseDown} = this.props;
    const optionalOnMouseDown = {onMouseMove: onMouseMove, onMouseDown: onMouseDown}
    return (
      <div style={{...baseStyles.tile, ...position}} {...optionalOnMouseDown}>{value}</div>
    )
  }
}

function withDrag(Component) {
  return class extends React.Component {
    // passes absolute position down to component
    // infers from bounds whether component can move X, Y
    constructor(props) {
      super(props);

      this.state = {
        position: this.props.defaultPosition,
        inDrag: false,
        prevMouse: {x: 0, y: 0},
        offset: {dx: 0, dy: 0}
      }

      
    }

    mouseDelta = (event) => {
      const { prevMouse } = this.state;
      return { dx: event.pageX - prevMouse.x, dy: event.pageY - prevMouse.y};
    }

    handleOnMouseDown(e) {
      this.setState({
        inDrag: true,
        prevMouse: {x: e.pageX, y: e.pageY},
        offset: {dx: 0, dy: 0}
      })
    }

    handleOnMouseMove(e) {
      if (this.state.inDrag) {
        console.log("dragging")
        let { offset, position } = this.state;
        const {dx, dy} = this.mouseDelta(e);

        position.top += dy;
        position.left += dx;

        

        this.setState({
          position: position,
          prevMouse: {x: e.pageX, y: e.pageY}
        })
      }
    }

    render() {
      return (
        <Component 
          onMouseDown={(e) => this.handleOnMouseDown(e)} 
          onMouseMove={(e) => this.handleOnMouseMove(e)}
          position={this.state.position} 
          {...this.props} 
        />
      )
    }

  }

}

const TileWithDrag = withDrag(Tile);

export const Board2 = ({ initialState }) => {
  const tileSize = 100;
  const [board, setBoard] = useState(initialState);

  const zeroPos = findZero(board);

  const renderBoard = () => {
    return board.map((row, i) => {
      return row.map((value, j) => {

        
        const position = {top: i*tileSize, left: j*tileSize};
        const tile = {value: value, pos: {i, j}, uiPos: position}


        if (i === zeroPos.i && j === zeroPos.j) 
          return <Slot key={0} position={tile.uiPos}></Slot>
        if (areNeighbours(zeroPos, tile.pos)) {
          console.log("Rendering tile with drag", tile.value)
          const bounds = {
            top: 0,
            bottom: 1000,
            left: 0,
            right: 1000
          }

          return (
            <TileWithDrag key={tile.value} value={tile.value} defaultPosition={tile.uiPos} bounds={bounds}/>
          )
        } else {
          return <Tile key={tile.value} value={tile.value} position={tile.uiPos}/>
        }

      })
    })
  }

  return (
    <div>{renderBoard()}</div>
  )
}