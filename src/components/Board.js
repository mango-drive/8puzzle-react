
import React from 'react';
import { 
  findZero, 
  areNeighbours, 
  initialiseStyles, 
  swap, 
  constrainDrag, 
  calcMaxOffset 
} from './util'
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

    // Coordinates of the empty slot
    let emptySlot = findZero(tiles); 

    this.state = {
      tiles: tiles,
      styles: styles,
      tileSize: tileSize,
      emptySlot: emptySlot,
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
  Handles the start of a tile drag event.
  Stores the current offset and boundaries of the drag in the state.
  */
  handleOnMouseDown(i, j, event) {
    // Tile that was clicked on by the user
    const selectedTile = {i, j}
    const { inDragEvent, tiles, emptySlot } = this.state;

    // Allow neighbours of the empty slot to be dragged
    if (!inDragEvent && areNeighbours(tiles, emptySlot, selectedTile)) {
      const { styles } = this.state;

      // Calculate the boundaries of the drag
      const maxOffset = calcMaxOffset(tiles, styles, selectedTile);
      
      this.setState({
          inDragEvent: true, 
          selectedTile: selectedTile,
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
      // the selected tile and the empty slot will be swapped.
      const threshold = { dx: maxOffset.dx * p, dy: maxOffset.dy * p };

      // TODO refactor this conditional
      if ( Math.abs(offset.dx) > Math.abs(threshold.dx) || Math.abs(offset.dy) > Math.abs(threshold.dy) ) {
        // Threshold exceeded
        this.swapTiles(selectedTile, emptySlot)
        const newEmptySlot = Object.assign({}, selectedTile);
        this.setState({ selectedTile: null, emptySlot: newEmptySlot });
      }

      // Drag event handled.
      this.setState({inDragEvent: false})
    }
  } 
  
  /*
  Calculates the vector difference between the current and previous mouse position
  */
  // TODO: refactor mouseDelta, we could be using offset relative to original mouse position
  mouseDelta = (event) => {
    const { prevMouse } = this.state;
    return { dx: event.pageX - prevMouse.x, dy: event.pageY - prevMouse.y};
  }

  handleOnMouseMove = (e) => {
    const { inDragEvent } = this.state;
    if (inDragEvent) {
      const { selectedTile, styles, tiles} = this.state;
      let {offset} = this.state;

      let {dx, dy} = this.mouseDelta(e);
      // TODO refactor mouseDelta
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
            onMouseMove={(e) => this.handleOnMouseMove(e)}
            >
            {this.renderTiles()}
            </div>
  }
}
