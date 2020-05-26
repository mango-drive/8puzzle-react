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
        <div className='tile-content'>{this.props.id}</div>
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
      swapOrigin: null
    }
  }

  componentDidMount() {
    document.addEventListener("mouseup", this.handleOnMouseUp);
  }

  handleOnMouseDown(i, j) {
    if (!this.state.isMoving && this.state.tiles[i][j] == 0) {
      this.setState({isMoving: true, swapOrigin: {i, j}})
    }
  }

  handleOnMouseEnter(i, j) {
    if (this.state.isMoving) {
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
