import { solve } from "./solve";

export const createGridLayout = (n, cellSize) => {
  const layout = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const x = j * cellSize;
      const y = i * cellSize;
      layout.push([x, y]);
    }
  }
  return layout;
};

export const initialiseStyles = (arr, size) => {
  let styles = arr.map((tileRow, i) => {
    return tileRow.map((tile, j) => {
      const top = i * size;
      const left = j * size;
      return { top: top, left: left, width: size };
    });
  });
  return styles;
};

export const findZero = (arr) => {
  let emptyIdx;
  arr.forEach((row, i) => {
    row.forEach((tile, j) => {
      if (tile === 0) {
        emptyIdx = { i, j };
      }
    });
  });
  return emptyIdx;
};

export const neighboursOfIdx = (arr, { i, j }) => {
  const directions = [
    [1, 0], // down
    [0, 1], // right
    [-1, 0], // up
    [0, -1], // left
  ];

  let neighbours = [];

  directions.forEach(([di, dj]) => {
    const neighbourIdx = { i: i + di, j: j + dj };
    if (isValidIdx(arr, neighbourIdx)) {
      neighbours.push(neighbourIdx);
    }
  });

  return neighbours;
};

export const curriedComparator = (idx1, comparator) => {
  return (idx2) => {
    return comparator(idx1, idx2);
  };
};

export const areNeighbours = (idx1, idx2, dimension) => {
  const diff = Math.abs(idx1 - idx2);
  console.log(diff, dimension);
  const rowNeighbourDiff = 1;
  const colNeighbourDiff = dimension;
  return diff === rowNeighbourDiff || diff === colNeighbourDiff;
};

export const isValidIdx = (arr, { i, j }) => {
  const n = arr.length;
  if (i < 0 || i >= n) return false;
  const m = arr[i].length;
  return 0 <= j && j < m;
};

export const swap = (arr, from, to) => {
  const { i, j } = from;
  const { i: x, j: y } = to;

  let tmp = arr[i][j];
  arr[i][j] = arr[x][y];
  arr[x][y] = tmp;
};

export const deepCopy = (arr) => {
  const newArray = arr.map((a) => {
    return a.slice();
  });
  return newArray;
};

export const createDefaultPosition = ({ i, j }, size) => {
  return { top: i * size, left: j * size };
};

export const createBounds = (tilePos, slotPos) => {
  return {
    top: Math.min(tilePos.top, slotPos.top),
    bottom: Math.max(tilePos.top, slotPos.top),
    left: Math.min(tilePos.left, slotPos.left),
    right: Math.max(tilePos.left, slotPos.left),
  };
};

export const dragWithinBounds = (delta, position, bounds) => {
  const { dx, dy } = delta;

  position.top += dy;
  position.left += dx;

  position.top = Math.max(bounds.top, position.top);
  position.left = Math.max(bounds.left, position.left);
  position.top = Math.min(bounds.bottom, position.top);
  position.left = Math.min(bounds.right, position.left);

  return position;
};

const squarify = (arr1D, dimension) => {
  const arr2D = [];
  for (let i = 0; i < dimension; i++) {
    const row = [];
    for (let j = 0; j < dimension; j++) {
      row.push(arr1D[i * dimension + j]);
    }
    arr2D.push(row);
  }
  return arr2D;
};

export const getSolution = (tiles, dimension) => {
  const squareArr = squarify(tiles, dimension);
  return solve(squareArr);
};

