
import {
  filterByAllowableDirection,
  DIRECTIONS,
  findZero,
  directionOfZero,
  bounds,
  initialiseStyles,
} from './util'


test('makes vertical delta equal 0 when AD is horizontal', () => {
  const mouseDelta = {dx: 10, dy: 10};
  const allowableDirection = DIRECTIONS.LEFT;
  
  const filteredDelta = filterByAllowableDirection(mouseDelta, allowableDirection);
  expect(filteredDelta).toEqual({dx: 10, dy: 0});
})

test('makes horizontal delta equal 0 when AD is vertical', () => {
  const mouseDelta = {dx: 10, dy: 120};
  const allowableDirection = DIRECTIONS.UP;
  
  const filteredDelta = filterByAllowableDirection(mouseDelta, allowableDirection);
  expect(filteredDelta).toEqual({dx: 0, dy: 120});
})

test('makes up delta equal 0 when AD is down', () => {
  const mouseDelta = {dx: 10, dy: 11};
  const allowableDirection = DIRECTIONS.DOWN;
  const filteredDelta = filterByAllowableDirection(mouseDelta, allowableDirection);
  expect(filteredDelta).toEqual({dx: 0, dy: 0});
})

test('makes down delta equal 0 when AD is up', () => {
  const mouseDelta = {dx: 22, dy: -1};
  const allowableDirection = DIRECTIONS.UP;
  const filteredDelta = filterByAllowableDirection(mouseDelta, allowableDirection);
  expect(filteredDelta).toEqual({dx: 0, dy: 0});
})

test('makes down delta equal when AD is down', () => {
  const mouseDelta = {dx: 22, dy: -15};
  const allowableDirection = DIRECTIONS.DOWN;
  const filteredDelta = filterByAllowableDirection(mouseDelta, allowableDirection);
  expect(filteredDelta).toEqual({dx: 0, dy: -15});
})

test('makes left delta equal 0 when AD is right', () => {
  const mouseDelta = {dx: 22, dy: -1};
  const allowableDirection = DIRECTIONS.RIGHT;
  const filteredDelta = filterByAllowableDirection(mouseDelta, allowableDirection);
  expect(filteredDelta).toEqual({dx: 0, dy: 0});
})

test('findZero', () => {
  const arr = [
    [1, 0],
    [2, 3]
  ]
  const zeroIdx = findZero(arr);
  expect(zeroIdx).toEqual({i: 0, j: 1});
})

test('Returns left when 0 is to the left', () => {
  const arr = [
    [0, 1]
  ];

  const idx = {i: 0, j: 1}
  const direction = directionOfZero(arr, idx);

  expect(direction).toEqual(DIRECTIONS.LEFT);
})

test('Returns right when 0 is to the right', () => {
  const arr = [
    [1, 0]
  ];

  const idx = {i: 0, j: 0}
  const direction = directionOfZero(arr, idx);

  expect(direction).toEqual(DIRECTIONS.RIGHT);
})

test('Returns down when 0 is down', () => {
  const arr = [
    [1],
    [0]
  ];
  const idx = {i: 0, j: 0}
  const direction = directionOfZero(arr, idx);
  expect(direction).toEqual(DIRECTIONS.DOWN);
})

test('Returns up when 0 is up', () => {
  const arr = [
    [0],
    [1]
  ];
  const idx = {i: 1, j: 0}
  const direction = directionOfZero(arr, idx);
  expect(direction).toEqual(DIRECTIONS.UP);
})

test('Returns top bounds when zero is above', () => {
  const tileSize = 10;
  const arr = [
    [0],
    [1]
  ]
  const styles = initialiseStyles(arr, tileSize);
  const {topMin} = bounds(arr, styles, {i: 1, j: 0})
  expect(topMin).toEqual(0)
})

test('Returns top bounds when zero is below', () => {
  const tileSize = 10;
  const arr = [
    [1],
    [0]
  ]

  const styles = initialiseStyles(arr, tileSize);
  const {topMax} = bounds(arr, styles, {i: 1, j: 0})

  expect(topMax).toEqual(10)
})

test('Returns top bounds when zero is left', () => {
  const tileSize = 10;
  const arr = [
    [0, 1]
  ]

  const styles = initialiseStyles(arr, tileSize);
  const {topMax} = bounds(arr, styles, {i: 0, j: 1})
  expect(topMax).toEqual(0)
})

test('Returns top bounds when zero is right', () => {
  const tileSize = 10;
  const arr = [
    [1,0]
  ]

  const styles = initialiseStyles(arr, tileSize);
  const {topMax} = bounds(arr, styles, {i: 0, j: 0})
  expect(topMax).toEqual(0)
})
