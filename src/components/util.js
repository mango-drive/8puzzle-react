
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

    return neighbours;
}

export const areNeighbours = (arr, idx1, idx2) => {
  const neighboursOfIdx1 = neighbours(arr, idx1);
  return neighboursOfIdx1.has(JSON.stringify(idx2));
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


export const calcMaxOffset = (arr, styles, idx) => {
  const slotIdx = findZero(arr);
  const slotPos = styles[slotIdx.i][slotIdx.j];
  const {i, j} = idx;
  const tilePos = styles[i][j];
  const dx = slotPos.left - tilePos.left;
  const dy = slotPos.top - tilePos.top;
  return {dx, dy}
}

export const constrainDrag = (offset, tile, tiles, styles) => {
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
