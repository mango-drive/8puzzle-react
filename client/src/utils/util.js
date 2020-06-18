
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

export const neighboursOfIdx = (arr, {i, j}) => {
    const directions = [
      [1, 0], // down
      [0, 1], // right
      [-1, 0], // up
      [0, -1], // left
    ]

    let neighbours = [];

    // iterate over directions and add indices that are in bounds to the set
    directions.forEach( ([di, dj]) => {
      const neighbourIdx = {i: i+di, j: j+dj}
      if(isValidIdx(arr, neighbourIdx)) {
        neighbours.push(neighbourIdx);
      }
    })

    return neighbours;
}

export const areNeighbours = (idx1, idx2) => {
  if (idx1.i === idx2.i) 
    return Math.abs(idx1.j - idx2.j) === 1;
  if (idx1.j === idx2.j)
    return Math.abs(idx1.i - idx2.i) === 1;
  return false;
}

export const isValidIdx = (arr, {i, j}) => {
    const n = arr.length;
    if (i < 0 || i >= n) return false;
    const m = arr[i].length
    return 0 <= j && j < m;
}

export const swap = (arr, from, to) => {
    const {i, j} = from;
    const {i: x, j: y} = to;

    let tmp = arr[i][j];
    arr[i][j] = arr[x][y];
    arr[x][y] = tmp;
}

export const deepCopy = (arr) => {
  const newArray = arr.map((a) => {
    return a.slice();
  })
  return newArray;
}

export const createDefaultPosition= ({i, j}, size) => {
  return {top: i*size, left: j*size};
}

export const createBounds = (tilePos, slotPos) => {
  return {
    top: Math.min(tilePos.top, slotPos.top),
    bottom: Math.max(tilePos.top, slotPos.top),
    left: Math.min(tilePos.left, slotPos.left),
    right: Math.max(tilePos.left, slotPos.left),
  }
}

export const dragWithinBounds = (delta, position, bounds)  => {
  const {dx, dy} = delta;

  position.top += dy;
  position.left += dx;

  position.top = Math.max(bounds.top, position.top)
  position.left = Math.max(bounds.left, position.left);
  position.top = Math.min(bounds.bottom, position.top);
  position.left = Math.min(bounds.right, position.left);

  return position;
}
