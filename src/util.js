
export const findEmptySlot = (tiles) => {
    let emptyIdx;
    tiles.forEach((row, i) => {
      row.forEach((tile, j) => {
        if (tile.id === 0) {
          emptyIdx = {i, j}
        }
      })
    });
    return emptyIdx;
}

export const neighbours = (tiles, {i, j}) => {
    const directions = [
      [1, 0], // up
      [0, 1], // right
      [-1, 0], // down
      [0, -1], // up
    ]

    let neighbours = {}

    // iterate over directions and add indices that are in bounds to the set
    directions.forEach( ({dx, dy}) => {
      const neighbourIdx = {i: i+dx, j: j+dy}
      if(isValidIdx(tiles.length, neighbourIdx)) {
        neighbours.push(neighbourIdx)
      }
    })

    return neighbours;
}

export const isValidIdx = (n, {i, j}) => {
    return 0 <= i && i <= n && 0 <= j && j <= n;
}