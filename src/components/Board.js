
import React from 'react';
import { findZero, neighboursOfZero, initialiseStyles, swap, constrainDrag, calcMaxOffset } from './util'
import {Tile} from './Tile'
import '../App.css';
import '../index.css'

export class Board extends React.Component {
  constructor(props) {
    super(props);

    // 2D array of tile values
    let tiles = [
        [1, 2, 3],
        [4, 0, 5],
        [6, 7, 8],
    ]

    // size of tiles in pixels
    let tileSize = 100;

    // An array representing the visual style of all of the tiles
    let styles = initialiseStyles(tiles, tileSize);

    this.state = {
      tiles: tiles,
      styles: styles,
      tileSize: tileSize,
      selectedTile: null,       // coordinates of the selected tile
      inDragEvent: false,          // true when user moving a tile
      prevMouse: {x: 0, y: 0},  // x, y coordinates of previous mouse
      offset: {dx: 0, dy: 0},   // offset to be applied to the selected style
    } 
  }
 

  /*
  Give the board the ability to listen to DOM onmouseup events that
  occur on the entire document. 
  */
  componentDidMount() {
    document.addEventListener("mouseup", this.handleOnMouseUp);
  }

  renderTiles = () => {
    const {inDragEvent, tiles, styles, offset} = this.state;

    return tiles.map((row, i) => {
      return row.map((tile, j) => {

        const val = tiles[i][j];
        let style = styles[i][j];

        if (inDragEvent) {
          if (this.isSelected({i, j})) {
            style = this.applyOffsetToStyle(style, offset);
          }
          if (val === 0) {
            const newTop = style.top - offset.dy;
            const newLeft = style.left - offset.dx;
            style = {...style, top: newTop, left: newLeft}
          }
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
  /*
  Checks if the tile at coordinate i, j is moveable.
  A tile is moveable if it is a neighbour to the empty slot
  */
  isNeighbourOfEmptySlot = ({i, j}) => {
    const { tiles } = this.state;
    const moveableTiles = neighboursOfZero(tiles);
    return moveableTiles.has(JSON.stringify({i, j}));
  }

  /*
  Handles the start of a tile drag event.
  */
  handleOnMouseDown(i, j, event) {
    const { inDragEvent: isMoving } = this.state;
    const selectedTile = {i, j}

    
    if (!isMoving && this.isNeighbourOfEmptySlot(selectedTile)) {
      const {tiles, styles} = this.state;

      // TODO we are already finding the empty slot in isNeighbourOf...
      // this could be refactored
      const emptySlot = findZero(tiles);
      const maxOffset = calcMaxOffset(tiles, styles, selectedTile);
      
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

  /*
  Handles the end of a drag event.
  */
  handleOnMouseUp = () => {
    const { inDragEvent } = this.state;

    if (inDragEvent) {
      const {selectedTile, emptySlot, offset, maxOffset} = this.state;

      // Arbitrary threshold percentage of maxOffset
      const p = 0.40;
      // Threshold vector. If the offset created by the drag exceeds this threshold,
      // the and the empty slot will be swapped.
      const threshold = { dx: maxOffset.dx * p, dy: maxOffset.dy * p };

      // TODO refactor the threshold functionality.
      if ( Math.abs(offset.dx) > Math.abs(threshold.dx) || Math.abs(offset.dy) > Math.abs(threshold.dy) ) {
        this.swapTiles(selectedTile, emptySlot)
      }

      // Drag event handled.
      this.setState({inDragEvent: false})
    }
  } 
  
  mouseDelta = (event) => {
    const { prevMouse } = this.state;
    return { dx: event.pageX - prevMouse.x, dy: event.pageY - prevMouse.y};
  }

  handleOnMouseMove = (e) => {
    if (this.state.inDragEvent) {
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


  applyOffsetToStyle(style, offset) {
    const newTop = style.top + offset.dy;
    const newLeft = style.left + offset.dx;
    style = { ...style, top: newTop, left: newLeft };
    return style;
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
