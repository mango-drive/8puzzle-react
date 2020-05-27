
import {
  filterByAllowableDirection,
  DIRECTIONS,
  findZero,
  directionOfZero,
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
