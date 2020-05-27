
import React from 'react';
import {findZero, initialiseStyles, neighbours, swap, boundsOfTile, constrainDrag} from './util'
import {Tile} from './Tile'
import '../App.css';
import '../index.css'

export class Board extends React.Component {
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
