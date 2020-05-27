import React from 'react';
import logo from './logo.svg';
import {findZero, initialiseStyles, neighbours, swap, boundsOfTile, constrainDrag} from './util'
import './App.css';
import './index.css'

function App() {
  return (
    <Board/>
  );
}

export default App;

class Tile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      // outer div for the card
      <div
        className={this.props.className}
        style={this.props.style}
        onMouseDown={this.props.onMouseDown}
      >
        <div className='tile-content disable-selection'>{this.props.id}</div>
      </div>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);

    // tiles should be past in as props later
    let tiles = [
        [1, 2, 3],
        [4, 0, 5],
        [6, 7, 8],
    ]

    let tileSize = 100;
    let styles = initialiseStyles(tiles, tileSize);
    this.state = {
      tiles: tiles,
      styles: styles,
      isMoving: false,
      selectedTile: null, 
      prevMouse: {x: 0, y: 0},
    }
  }


  moveableTiles = () => {
    const emptySlot = findZero(this.state.tiles);
    return neighbours(this.state.tiles, emptySlot);
  }

  componentDidMount() {
    document.addEventListener("mouseup", this.handleOnMouseUp);
  }

  isMoveable = ({i, j}) => {
    const moveableTiles = this.moveableTiles();
    return moveableTiles.has(JSON.stringify({i, j}));
  }

  handleOnMouseDown(i, j, event) {
    if (!this.state.isMoving && this.isMoveable({i, j})) {
      this.setState({
          isMoving: true, 
          selectedTile: {i, j},
          prevMouse: {x: event.pageX, y: event.pageY}
        })
    }
  }

  handleOnMouseUp = () => {
    this.setState({isMoving: false})
  }

  dragTile = (tile, mouseDelta) => {
      const {i, j} = tile;
      const {dx, dy} = mouseDelta;

      // copy the styles state
      const styles = this.state.styles.slice();
      // select the tile to drag
      let dragTarget = styles[i][j];

      // position update
      dragTarget = {...dragTarget, top: dragTarget.top + dy, left: dragTarget.left + dx}
      const slotIdx = findZero(this.state.tiles);
      const slotStyle = styles[slotIdx.i][slotIdx.j];
      dragTarget = constrainDrag(dragTarget, slotStyle)
      console.log(dragTarget)


      // update the state
      styles[i][j] = dragTarget;
      this.setState({styles: styles})
  }

  mouseDelta = (event) => {
    const { prevMouse } = this.state;
    return { dx: event.pageX - prevMouse.x, dy: event.pageY - prevMouse.y};
  }

  handleOnMouseMove = (e) => {
    if (this.state.isMoving) {
      const { selectedTile } = this.state;
      this.dragTile(selectedTile, this.mouseDelta(e))
      this.setState({prevMouse: {x: e.pageX, y: e.pageY}})
    }
  }

  swapTiles = (from, to) => {
    let tiles = this.state.tiles.slice();
    swap(tiles, from, to);
    this.setState({ tiles: tiles})
  };

  isSelected = ({i, j}) => {
    const {selectedTile} = this.state;
    return i === selectedTile.i && j === selectedTile.j;
  }

  renderTiles = () => {
    const {tiles, styles,} = this.state;

    return tiles.map((row, i) => {
      return row.map((tile, j) => {

        const val = tiles[i][j];
        const style = styles[i][j];


        return (
          <Tile
            className={`${val === 0 ? "moveable blank-tile": "moveable tile"}`}
            onMouseDown={(e) => this.handleOnMouseDown(i, j, e)}
            onMouseEnter={(e) => this.handleOnMouseEnter(i, j)}
            onMouseUp={(e) => this.handleOnMouseUp(i, j)}
            key={val}
            id={val}
            style = {style}
          />
        )
      })
    })
  }

  render() {
    return <div 
            className="board"
            onMouseMove={(e) => this.handleOnMouseMove(e)}
            >
              {this.renderTiles()}
            </div>
  }
}

class Moveable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: { top: 0, left: 0 },
      isMoving: false,
      prevMouse: { x: 0, y: 0}
    }
  }

  handleOnMouseDown(event) {
    const startY = event.pageY;
    this.setState({isMoving: true, start: {y: startY}});
  }

  handleOnMouseUp(event) {
    this.setState({isMoving: false})
  }

  handleOnMouseMove(event) {
    if (this.state.isMoving) {
      const mouseY = event.pageY;
      const offsetY = mouseY - this.state.prevMouse.y;
      const top = this.state.style.top + offsetY;
      this.setState({style: {top: top}, start: {y: mouseY}});
    }
  }

  render() {
    return (
      <div 
        className="tile moveable" 
        onMouseDown={(e) => this.handleOnMouseDown(e)}
        onMouseUp={(e) => this.handleOnMouseUp(e)}
        onMouseMove={(e) => this.handleOnMouseMove(e)}
        style = {this.state.style}
      >
      </div>
    )
  }

}