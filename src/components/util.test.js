
import {
  filterByAllowableDirection,
  DIRECTIONS,
  findZero,
  calcMaxOffset,
  initialiseStyles,
  areNeighbours,
  neighboursOfIdx,
  constrainDrag,
} from './util'

test('findZero', () => {
  const arr = [
    [1, 0],
    [2, 3]
  ]
  const zeroIdx = findZero(arr);
  expect(zeroIdx).toEqual({i: 0, j: 1});
})

test('neighboursOfIdx', () => {
  let arr = [
    [1, 0],
    [2, 3]
  ]
  let neighbourArray = neighboursOfIdx(arr, {i: 0, j: 1});
  let expected = [
    {i: 1, j: 1},
    {i: 0, j: 0}
  ]
  expect(neighbourArray).toEqual(expected);

  arr = [
    [1, 2, 3],
    [4, 0, 5],
    [6, 7, 8]
  ]
  neighbourArray = neighboursOfIdx(arr, {i: 1, j: 1});
  expected = [
    {i: 2, j: 1},
    {i: 1, j: 2},
    {i: 0, j: 1},
    {i: 1, j: 0}
  ]
  expect(neighbourArray).toEqual(expected);

})

test('areNeighbours', () => {
  const arr = [
    [1, 0],
    [2, 3]
  ]

  const idx1 = {i: 0, j: 0};
  const idx2 = {i: 1, j: 0};
  expect(areNeighbours(arr, idx1, idx2)).toEqual(true);
})

test('maxOffset Returns top bounds when zero is above', () => {
  const tileSize = 10;
  const arr = [
    [0],
    [1]
  ]
  const styles = initialiseStyles(arr, tileSize);
  const {dy} = calcMaxOffset(arr, styles, {i: 1, j: 0})
  expect(dy).toEqual(-10)
})

test('maxOffset Returns top bounds when zero is below', () => {
  const tileSize = 10;
  const arr = [
    [1],
    [0]
  ]

  const styles = initialiseStyles(arr, tileSize);
  const {dy} = calcMaxOffset(arr, styles, {i: 0, j: 0})

  expect(dy).toEqual(10)
})

test('maxOffset Returns top bounds when zero is left', () => {
  const tileSize = 10;
  const arr = [
    [0, 1]
  ]

  const styles = initialiseStyles(arr, tileSize);
  const {dy} = calcMaxOffset(arr, styles, {i: 0, j: 1})
  expect(dy).toEqual(0)
})

test('maxOffset Returns top bounds when zero is right', () => {
  const tileSize = 10;
  const arr = [
    [1,0]
  ]

  const styles = initialiseStyles(arr, tileSize);
  const {dy} = calcMaxOffset(arr, styles, {i: 0, j: 0})
  expect(dy).toEqual(0)
})


test('maxOffset Returns left min bounds when zero is right', () => {
  const tileSize = 10;
  const arr = [
    [1,0]
  ]

  const styles = initialiseStyles(arr, tileSize);
  const {dx} = calcMaxOffset(arr, styles, {i: 0, j: 0})
  expect(dx).toEqual(10)
})

test('constrainOffset when empty is to the right', () => {
  const tileSize = 10;
  const arr = [
    [1,0]
  ]

  const styles = initialiseStyles(arr, tileSize);

  let offset = {dx: 11, dy: 12};
  let tile = {i: 0, j: 0}

  offset = constrainDrag(offset, tile, arr, styles )

  expect(offset).toEqual({dx: 10, dy: 0})

})

test('constrainOffset on a 9x9', () => {
  const tileSize = 10;
  const arr = [
    [1, 2, 3],
    [4, 0, 5],
    [6, 7, 8]
  ]

  const styles = initialiseStyles(arr, tileSize);

  let tile = {i: 0, j: 1}
  let maxOffset = calcMaxOffset(arr, styles, tile);
  expect(maxOffset).toEqual({dx: 0, dy: 10})

  tile = {i: 2, j: 1}
  maxOffset = calcMaxOffset(arr, styles, tile);
  expect(maxOffset).toEqual({dx: 0, dy: -10})
  
  let offset = {dx: 11, dy: 12};
  offset = constrainDrag(offset, tile, arr, styles )
  expect(offset).toEqual({dx: 0, dy: 0})

  offset = {dx: -50, dy: 120};
  maxOffset = calcMaxOffset(arr, styles, tile);
  expect(maxOffset).toEqual({dx: 0, dy: -10})
  offset = constrainDrag(offset, tile, arr, styles )
  expect(offset).toEqual({dx: 0, dy: 0})
})
