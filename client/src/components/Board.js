
import React from 'react';
import { 
  areNeighbours, 
  calcMaxOffset,
  constrainDrag, 
  deepCopy,
  findZero, 
  initialiseStyles, 
  swap, 
} from '../utils/util'

import { solve } from '../utils/solve'

import {Tile} from './Tile'
import '../App.css';
import '../index.css'

export class Board extends React.Component {
  constructor(props) {
    super(props);

    // 2D array of tile values
    let tiles = [
        [1, 0, 3],
        [4, 5, 7],
        [6, 2, 8],
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
      inDragEvent: false,       // true when user moving a tile
      prevMouse: {x: 0, y: 0},  // x, y coordinates of previous mouse
      offset: {dx: 0, dy: 0},   // offset to be applied to the selected style
    } 
  }
 

  /*
  Give the board the ability to listen to DOM onmouseup events that
  occur on the entire document. onMouseUp events are used to end a tile drag gesture.
  */
  componentDidMount() {
    document.addEventListener("mouseup", this.handleOnMouseUp);
  }

  handleOnClick() {
      const { tiles } = this.state;
      const solution = solve(tiles);
      let i = 0;
      for (const state of solution) {
          const { tiles } = state.board;
          this.renderMove(tiles, i);
          i++;
      }
  }

  renderMove(tiles, i) {
      setTimeout(() => {
          this.setState({tiles: tiles});
      }, 200 * i);
  }

  render() {
    const { tiles, tileSize } = this.state;
    const size = tiles.length * tileSize;
    const style = {width: size, height: size}
    return (
      <div>
        <div style={style} className="board" onMouseMove={(e) => this.handleOnMouseMove(e)}>
          { this.renderTiles() }
        </div>
        <button 
            style={{ width: 100, height: 100, fontSize: 24}}
            onClick = { () => this.handleOnClick()}
        >Solve
        </button>
      </div>
    )
  }

  renderTiles = () => {
    const {inDragEvent, tiles, styles, offset} = this.state;

    return tiles.map((row, i) => {
      return row.map((tile, j) => {

        const tileVal = tiles[i][j];
        let tileStyle = styles[i][j];

        if (inDragEvent) {
          // Render the selected tile with a bounded offset calculated
          // based on user's mouse position
          if (this.isSelected({i, j})) {
            tileStyle = this.applyDragOffset(tileStyle, offset);
          }
        }

        return (
          <Tile
            className={`${tileVal === 0 ? "moveable blank-tile": "moveable tile"}`}
            onMouseDown={(e) => this.handleOnMouseDown(i, j, e)}
            key={tileVal}
            id={tileVal}
            style = {tileStyle}
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
      
      // Store the initial drag conditions in the state
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
  */
  handleOnMouseMove = ( e ) => {
    const { inDragEvent } = this.state;
    if ( inDragEvent ) {
      const newOffset = this.dragTileWithinBounds(e);
      const prevM = { x: e.pageX, y: e.pageY };
      this.setState({ offset: newOffset, prevMouse: prevM });
    }
  }

  mouseDelta = (event) => {
    const { prevMouse } = this.state;
    return { dx: event.pageX - prevMouse.x, dy: event.pageY - prevMouse.y};
  }

  dragTileWithinBounds = ( event ) => {
      const { selectedTile, styles, tiles } = this.state;
      let { offset } = this.state;
      const {dx, dy} = this.mouseDelta(event);
      // TODO refactor this so that the offset update is all done
      // in constrainDrag, so that constrainDrag's signature looks like:
      // constrainDrag(offset, mouseDelta);
      // Add the mouse delta to the tile offset
      offset.dx += dx;
      offset.dy += dy;
      // Ensure final offset is within bounds
      offset = constrainDrag (
        offset,
        selectedTile,
        tiles,
        styles
      )
      return offset
  }

  /*
  Handles the end of a drag event.
  */
  handleOnMouseUp = () => {
    const { inDragEvent } = this.state;
    if ( inDragEvent ) {
      this.swapIfThresholdExceeded();
      this.setState( {inDragEvent: false} )
    }
  } 

  swapIfThresholdExceeded = () => {
    const { selectedTile, emptySlot, offset, maxOffset } = this.state;

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
      this.resetStateAfterDragEnd(newEmptySlot);
    }
  }

  resetStateAfterDragEnd = (newEmpty) => {
    this.setState( {
      emptySlot: newEmpty,
      selectedTile: null,
      maxOffset: null,
      prevMouse: null,
      offset: null,
    })
  }


  /*
  */
  swapTiles = (from, to) => {
    const { tiles } = this.state;
    let newTiles = deepCopy(tiles);
    swap(newTiles, from, to);
    this.setState({ tiles: newTiles})
  };

  isSelected = ({i, j}) => {
    const { selectedTile } = this.state;
    return selectedTile && i === selectedTile.i && j === selectedTile.j;
  }

  applyDragOffset(style, offset) {
    const newTop = style.top + offset.dy;
    const newLeft = style.left + offset.dx;
    style = { ...style, top: newTop, left: newLeft };
    return style;
  }
}
