import React from 'react';
import logo from './logo.svg';
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
      swapOrigin: null, 
      start: {top: 0, left: 0}
    }
  }

  moveableTiles = () => {
    const empty = this.findEmptySlot();
    const neighbours = this.neighbours(empty);
    neighbours.add(empty.toString());
    return neighbours;
  }

  findEmptySlot = () => {
    const tiles = this.state.tiles;
    let emptyIdx;
    tiles.forEach((row, i) => {
      row.forEach((tile, j) => {
        if (tile.id === 0) {
          emptyIdx = {i, j}
        }
      })
    });

    return emptyIdx;
  }

  componentDidMount() {
    document.addEventListener("mouseup", this.handleOnMouseUp);
  }

  isMoveable = (i, j) => {
    const moveableTiles = this.moveableTiles();
    return moveableTiles.has([i, j].toString());
  }

  neighbours = ({i, j}) => {
    const directions = [
      [1, 0], // up
      [0, 1], // right
      [-1, 0], // down
      [0, -1], // up
    ]

    let neighbours = new Set()

    // iterate over directions and add indices that are in bounds to the set
    directions.forEach( ([dx, dy]) => {
      const neighbourIdx = [i+dx, j+dy]
      if(this.isValidIdx(neighbourIdx[0], neighbourIdx[1])) {
        neighbours.add(neighbourIdx.toString())
      }
    })

    return neighbours;
  }

  isValidIdx = (i, j) => {
    return 0 <= i && i <= this.state.tiles.length && 0 <= j && j <= this.state.tiles[0].length;
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
      const { swapOrigin } = this.state;

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

    let styles = this.state.styles.slice();
    temp = styles[i][j];
    styles[i][j] = styles[x][y];
    styles[x][y] = temp;

    this.setState({ tiles: tiles, styles: styles})
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