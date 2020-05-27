import React from 'react';
import logo from './logo.svg';
import {findEmptySlot, neighbours} from './util'
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
        onMouseEnter={this.props.onMouseEnter}
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
    let styles = tiles.map((tileRow, i) => {
      return tileRow.map((tile, j) => {
        const top = i * tileSize;
        const left = j * tileSize;
        return {top: top, left: left, width: tileSize}
      })
    })

    console.log(tiles)
    this.state = {
      tiles: tiles,
      styles: styles,
      isMoving: false,
      selectedTile: null, 
      start: {top: 0, left: 0},
      offset: {top: 0, left: 0}
    }
  }

  moveableTiles = () => {
    const empty = findEmptySlot(this.state.tiles);
    const neighboursArray = neighbours(empty);
    neighbours.push(empty);
    return neighbours;
  }


  componentDidMount() {
    document.addEventListener("mouseup", this.handleOnMouseUp);
  }

  isMoveable = (i, j) => {
    const moveableTiles = this.moveableTiles();
    return moveableTiles.has([i, j].toString());
  }


  handleOnMouseDown(i, j, event) {
    
    if (!this.state.isMoving && this.isMoveable(i, j)) {
      console.log("mouse down on moveable tile")
      const startY = event.pageY;
      const startX = event.pageX;
      this.setState({
          isMoving: true, 
          swapOrigin: {i, j},
          start: {left: startX, top: startY}
        })
    }
  }

  handleOnMouseEnter(i, j) {
    // if (this.state.isMoving && this.isMoveable(i, j)) {
    //   this.swapTiles(this.state.swapOrigin, {i, j});
    //   this.setState({swapOrigin: {i, j}})
    // }
  }

  handleOnMouseUp = () => {
    this.setState({isMoving: false})
  }



  handleOnMouseMove = (e) => {
    if (this.state.isMoving) {
      console.log("mouse moved")
      const { selectedTile: swapOrigin } = this.state;

      const mouseX = e.pageX;
      const mouseY = e.pageY;

      const offsetX = mouseX - this.state.start.left;
    }

  }

  swapTiles = (from, to) => {
    const {i, j} = from;
    const {i: x, j: y} = to;

    let tiles = this.state.tiles.slice();
    let temp = tiles[i][j];
    tiles[i][j] = tiles[x][y];
    tiles[x][y] = temp;

    this.setState({ tiles: tiles })
  };

  renderTiles = () => {
    return this.state.tiles.map((row, i) => {
      return row.map((tile, j) => {
        const val = this.state.tiles[i][j];
        const style = this.state.styles[i][j];
        console.log("Rendering tile")

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
      start: { x: 0, y: 0}
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
      const offsetY = mouseY - this.state.start.y;
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