
export const DIRECTIONS = {
  UP: {x: 0, y: 1},
  LEFT: {x: 1, y: 0},
  DOWN: {x: 0, y: -1},
  RIGHT: {x: -1, y: 0},
}

export const initialiseStyles = (arr, size) => {
    let styles = arr.map((tileRow, i) => {
      return tileRow.map((tile, j) => {
        const top = i * size;
        const left = j * size;
        return {top: top, left: left, width: size}
      })
    })
    return styles;
}

export const findZero = (arr) => {
    let emptyIdx;
    arr.forEach((row, i) => {
      row.forEach((tile, j) => {
        if (tile === 0) {
          emptyIdx = {i, j}
        }
      })
    });
    return emptyIdx;
}

export const neighbours = (arr, {i, j}) => {
    const directions = [
      [1, 0], // up
      [0, 1], // right
      [-1, 0], // down
      [0, -1], // up
    ]

    let neighbours = new Set()

    // iterate over directions and add indices that are in bounds to the set
    directions.forEach( ([dx, dy]) => {
      const neighbourIdx = {i: i+dx, j: j+dy}
      if(isValidIdx(arr.length, neighbourIdx)) {
        neighbours.add(JSON.stringify(neighbourIdx));
      }
    })

    console.log("neighbours", neighbours)

    return neighbours;
}

export const  neighboursOfZero = (arr) => {
    const emptySlot = findZero(arr);
    return neighbours(arr, emptySlot);
}

export const isValidIdx = (n, {i, j}) => {
    return 0 <= i && i <= n && 0 <= j && j <= n;
}

export const swap = (arr, from, to) => {
    const {i, j} = from;
    const {i: x, j: y} = to;

    let tmp = arr[i][j];
    arr[i][j] = arr[x][y];
    arr[x][y] = tmp;
}

export const filterByAllowableDirection = (delta, allowableDirection) => {
  let {dx, dy} = delta;
  const {x, y} = allowableDirection;

  dx = dx * x > 0 ? dx : 0;
  dy = dy * y > 0 ? dy : 0;

  return {dx: dx, dy: dy};
}

export const directionOfZero = (arr, idx) => {
  const {i: iOfZero, j: jOfZero} = findZero(arr);
  const {i, j} = idx;
  return {x: j - jOfZero, y: i - iOfZero};
}


export const calcMaxOffset = (arr, styles, idx) => {

  const slotIdx = findZero(arr);

  // TODO if slot is not in neighbours, allow a small maxOffset
  // and animate a return 

  const slotPos = styles[slotIdx.i][slotIdx.j];

  const {i, j} = idx;
  const tilePos = styles[i][j];
  
  const dx = slotPos.left - tilePos.left;
  const dy = slotPos.top - tilePos.top;

  return {dx, dy}
}



export const constrainOffset = (offset, tile, tiles, styles) => {
  const maxOffset = calcMaxOffset(tiles, styles, tile);

  if (Math.sign(maxOffset.dx) !== Math.sign(offset.dx)) {
    offset.dx = 0;
  } else if (Math.abs(offset.dx) > Math.abs(maxOffset.dx)) {
    offset.dx = maxOffset.dx;
  }

  if (Math.sign(maxOffset.dy) !== Math.sign(offset.dy)) {
    offset.dy = 0;
  } else if (Math.abs(offset.dy) > Math.abs(maxOffset.dy)) {
    offset.dy = maxOffset.dy;
  }

  return offset;
}

export const constrainDrag = (offset, maxOffset) => {

}

export const dragTile = (tile, mouseDelta) => {
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

