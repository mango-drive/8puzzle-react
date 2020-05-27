
export const findZero = (tiles) => {
    let emptyIdx;
    tiles.forEach((row, i) => {
      row.forEach((tile, j) => {
        console.log(tile)
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

    neighbours.add(JSON.stringify({i, j}));
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