
import React, {useState} from 'react';
import { areNeighbours, findZero, createBounds, createDefaultPosition, dragWithinBounds } from '../utils/util'
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

  tileContent: {
    position: 'relative',
    float: 'left',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontWeight: 'bold',
    fontSize: '30px'
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
    const {value, position, onMouseDown} = this.props;
    const optionalOnMouseDown = {onMouseDown: onMouseDown}
    return (
      <div style={{...baseStyles.tile, ...position}} {...optionalOnMouseDown}>
        <div className = 'disable-selection' style={baseStyles.tileContent}>{value}</div>
        
      </div>
    )
  }
}

function withDrag(Component) {
  return class extends React.Component {
    // passes absolute position down to component
    constructor(props) {
      super(props);
      console.log("inDrag: false in constructor")

      this.state = {
        position: this.props.defaultPosition,
        inDrag: false,
        prevMouse: {x: 0, y: 0},
        offset: {dx: 0, dy: 0},
      }

      this.handleOnMouseUp = this.handleOnMouseUp.bind(this);
      this.handleOnMouseMove = this.handleOnMouseMove.bind(this)

    }

    componentDidMount() {
      document.addEventListener("mouseup", this.handleOnMouseUp);
      document.addEventListener("mousemove", this.handleOnMouseMove)
    }

    mouseDelta = (event) => {
      const { prevMouse } = this.state;
      return { dx: event.pageX - prevMouse.x, dy: event.pageY - prevMouse.y};
    }

    handleOnMouseDown(e) {
      console.log("inDrag: true")
      this.setState({
        inDrag: true,
        prevMouse: {x: e.pageX, y: e.pageY},
        offset: {dx: 0, dy: 0}
      })
    }

    handleOnMouseMove(e) {
      if (this.state.inDrag) {
        let { position } = this.state;
        const delta = this.mouseDelta(e);
        position = dragWithinBounds(delta, position, this.props.bounds)
        this.setState({
          position: position,
          prevMouse: {x: e.pageX, y: e.pageY}
        })
      }
    }

    handleOnMouseUp() {
      console.log("inDrag: false")
      this.setState({inDrag: false})
    }

    render() {
      return (

        <Component 
          {...this.props} 
          onMouseDown={(e) => this.handleOnMouseDown(e)} 
          onMouseMove={(e) => this.handleOnMouseMove(e)}
          onMouseUp={() => this.handleOnMouseUp()}
          position={this.state.position} 
        />
      )
    }

  }

}

const TileWithDrag = withDrag(Tile);

export const Board2 = ({ initialState }) => {
  const tileSize = 100;
  const [board, setBoard] = useState(initialState);

  const slotIdx = findZero(board);
  const slotUIPosition = createDefaultPosition(slotIdx, tileSize);

  

  const renderBoard = () => {
    return board.map((row, i) => {
      return row.map((value, j) => {

        
        const idx = {i, j}
        const position = createDefaultPosition(idx, tileSize)
        const tile = {value: value, idx: idx, uiPos: position}


        if (i === slotIdx.i && j === slotIdx.j) 
          return <Slot key={0} position={tile.uiPos}></Slot>
          
        if (areNeighbours(slotIdx, tile.idx)) {
          const bounds = createBounds(tile.uiPos, slotUIPosition)
          console.log("bounds for ", idx, bounds)

          return (
            <TileWithDrag key={tile.value} value={tile.value} style = {baseStyles.tile} defaultPosition={tile.uiPos} bounds={bounds}/>
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