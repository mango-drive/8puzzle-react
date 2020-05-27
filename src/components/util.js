
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


export const boundsOfTile = (tiles, styles, tileIdx) => {
  const tileStyle = styles[tileIdx.i][tileIdx.j]

  const slotIdx = findZero(tiles);
  const slotStyle = styles[slotIdx.i][slotIdx.j]

  const topMin = Math.min(tileStyle.top, slotStyle.top);
  const topMax = Math.max(tileStyle.top, slotStyle.top);

  const leftMin = Math.min(tileStyle.left, slotStyle.left);
  const leftMax = Math.max(tileStyle.left, slotStyle.left);

  return {topMin, topMax, leftMin, leftMax}
}

export const constrainDrag = (dragTarget, bounds) => {
  dragTarget.top = Math.max(dragTarget.top, bounds.topMin);
  dragTarget.top = Math.min(dragTarget.top, bounds.topMax);

  dragTarget.left = Math.max(dragTarget.left, bounds.leftMin);
  dragTarget.left = Math.min(dragTarget.left, bounds.leftMax);

  return dragTarget;
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

