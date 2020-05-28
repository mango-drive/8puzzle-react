
import React from 'react';
import {findZero, neighboursOfZero, initialiseStyles, swap, constrainDrag, calcMaxOffset} from './util'
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
      tileSize: tileSize,
      isMoving: false,
      selectedTile: null, 
      prevMouse: {x: 0, y: 0},
      offset: {dx: 0, dy: 0},
    }
  }

  componentDidMount() {
    document.addEventListener("mouseup", this.handleOnMouseUp);
  }

  isMoveable = ({i, j}) => {
    const moveableTiles = neighboursOfZero(this.state.tiles);
    return moveableTiles.has(JSON.stringify({i, j}));
  }

  handleOnMouseDown(i, j, event) {
    const selectedTile = {i, j}
    if (!this.state.isMoving && this.isMoveable(selectedTile)) {
      const {tiles, styles} = this.state;
      const maxOffset = calcMaxOffset(tiles, styles, selectedTile);
      const emptySlot = findZero(tiles);

      this.setState({
          isMoving: true, 
          selectedTile: selectedTile,
          emptySlot: emptySlot,
          prevMouse: {x: event.pageX, y: event.pageY},
          offset: {dx: 0, dy: 0},
          maxOffset: maxOffset,
      })
    }
  }

  handleOnMouseUp = () => {
    const {isMoving} = this.state;

    if (isMoving) {
      const {selectedTile, emptySlot, offset, maxOffset} = this.state;
      const p = 0.40;

      const threshold = { dx: maxOffset.dx * p, dy: maxOffset.dy * p };
      if ( Math.abs(offset.dx) > Math.abs(threshold.dx) || Math.abs(offset.dy) > Math.abs(threshold.dy) ) {
        this.swapTiles(selectedTile, emptySlot)
      }
      this.setState({isMoving: false})
    }
  }

  mouseDelta = (event) => {
    const { prevMouse } = this.state;
    return { dx: event.pageX - prevMouse.x, dy: event.pageY - prevMouse.y};
  }

  handleOnMouseMove = (e) => {
    if (this.state.isMoving) {
      const { selectedTile, styles, tiles} = this.state;
      let {offset} = this.state;

      let {dx, dy} = this.mouseDelta(e);
      offset.dx += dx;
      offset.dy += dy;
      offset = constrainDrag(offset, selectedTile, tiles, styles);

      const prevM = {x: e.pageX, y: e.pageY}
      this.setState({offset: offset, prevMouse: prevM})
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
    const {isMoving, tiles, styles, offset} = this.state;

    return tiles.map((row, i) => {
      return row.map((tile, j) => {

        const val = tiles[i][j];
        let style = styles[i][j];

        if (isMoving && this.isSelected({i, j})) {
            const newTop = style.top + offset.dy;
            const newLeft = style.left + offset.dx;
            style = {...style, top: newTop, left: newLeft}
        }

        if (isMoving && val === 0 ) {
            const newTop = style.top - offset.dy;
            const newLeft = style.left - offset.dx;
            style = {...style, top: newTop, left: newLeft}
        }

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
            style = {{width: 1000}}
            onMouseMove={(e) => this.handleOnMouseMove(e)}
            >
              {this.renderTiles()}
            </div>
  }
}
