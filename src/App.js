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
    this.state = {
      tiles: [
        [1, 2, 3],
        [4, 0, 5],
        [6, 7, 8]
      ],
      isMoving: false,
      swapOrigin: null, 
    }
  }

  moveableTiles = () => {
    const empty = this.findEmptySlot();
    const neighbours = this.neighbours(empty[0], empty[1]);
    neighbours.add(empty.toString());
    return neighbours;
  }

  findEmptySlot = () => {
    const tiles = this.state.tiles;
    let emptyIdx;
    tiles.forEach((row, i) => {
      row.forEach((tile, j) => {
        if (tile === 0) {
          emptyIdx = [i, j]
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

  neighbours = (i, j) => {
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

  handleOnMouseDown(i, j) {
    if (!this.state.isMoving && this.isMoveable(i, j)) {
      this.setState({isMoving: true, swapOrigin: {i, j}})
    }
  }

  handleOnMouseEnter(i, j) {
    if (this.state.isMoving && this.isMoveable(i, j)) {
      this.swapTiles(this.state.swapOrigin, {i, j});
      this.setState({swapOrigin: {i, j}})
    }
  }

  handleOnMouseUp = () => {
    this.setState({isMoving: false})
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
        return (
          <Tile
            className={val === 0 ? 'blank-tile' : 'tile'}
            onMouseDown={() => this.handleOnMouseDown(i, j)}
            onMouseEnter={() => this.handleOnMouseEnter(i, j)}
            onMouseUp={() => this.handleOnMouseUp(i, j)}
            key={val}
            id={val}
          />
        )
      })
    })
  }

  render() {
    return <div className="board">{this.renderTiles()}</div>
  }
}
