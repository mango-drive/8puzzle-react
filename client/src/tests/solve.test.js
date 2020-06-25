import {
  isGoal,
  manhattan,
  generateNeighborArrays,
  hamming,
  Board,
  solve,
  shuffle,
  isSolvable,
  rowOfZeroFromBottom,
  countInversions,
  createSolvablePuzzle,
  createGoalState,
  initializeRandomBoard,
} from "../utils/solve";
import { squarify, getPathToSolution } from "../utils/util";

test("calculates hamming distance", () => {
  let tiles = [
    [1, 3],
    [2, 0],
  ];

  let hammingDistance = hamming(tiles);
  expect(hammingDistance).toEqual(2);

  tiles = [
    [3, 2],
    [1, 0],
  ];

  hammingDistance = hamming(tiles);
  expect(hammingDistance).toEqual(2);

  tiles = [
    [0, 3],
    [1, 2],
  ];

  hammingDistance = hamming(tiles);
  expect(hammingDistance).toEqual(3);

  tiles = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0],
  ];

  hammingDistance = hamming(tiles);
  expect(hammingDistance).toEqual(0);

  tiles = [
    [1, 3, 2],
    [4, 5, 6],
    [7, 8, 0],
  ];

  hammingDistance = hamming(tiles);
  expect(hammingDistance).toEqual(2);
});

test("calculates manhattan distance", () => {
  let tiles = [
    [1, 3],
    [2, 0],
  ];

  let manhattanDistance = manhattan(tiles);
  expect(manhattanDistance).toEqual(4);

  tiles = [[0, 1]];

  tiles = [
    [3, 2],
    [1, 0],
  ];

  manhattanDistance = manhattan(tiles);
  expect(manhattanDistance).toEqual(2);

  tiles = [
    [0, 3],
    [1, 2],
  ];

  manhattanDistance = manhattan(tiles);
  expect(manhattanDistance).toEqual(4);

  tiles = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0],
  ];

  manhattanDistance = manhattan(tiles);
  expect(manhattanDistance).toEqual(0);

  tiles = [
    [1, 3, 2],
    [4, 5, 6],
    [7, 8, 0],
  ];

  manhattanDistance = manhattan(tiles);
  expect(manhattanDistance).toEqual(2);
});

test("identifies goal board", () => {
  let tiles = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0],
  ];

  let rv = isGoal(tiles);
  expect(rv).toEqual(true);

  tiles = [
    [1, 3, 2],
    [4, 5, 6],
    [7, 8, 0],
  ];

  rv = isGoal(tiles);
  expect(rv).toEqual(false);
});

test("generates all arrays with element swapped with neighbours", () => {
  let arr = [
    [0, 1],
    [2, 3],
  ];
  let rv = generateNeighborArrays(arr, { i: 0, j: 0 });
  let expected = [
    [
      [2, 1],
      [0, 3],
    ],
    [
      [1, 0],
      [2, 3],
    ],
  ];
  expect(rv).toEqual(expected);
});

test("counts inversions", () => {
  let arr = [2, 1, 0];
  let expectedInversions = 1;

  expect(countInversions(arr)).toEqual(expectedInversions);

  arr = [3, 0, 1, 2];
  expectedInversions = 2;
  expect(countInversions(arr)).toEqual(expectedInversions);

  arr = [12, 1, 10, 2, 7, 11, 4, 14, 5, 0, 9, 15, 8, 13, 6, 3];
  expectedInversions = 49;

  expect(countInversions(arr)).toEqual(expectedInversions);
  arr = [11, 10, 14, 6, 13, 0, 1, 4, 9, 5, 3, 15, 2, 7, 8, 12];
});

test("should find the row of the empty slot, counting from the bottom", () => {
  let board = [1, 2, 3, 4, 5, 6, 7, 8, 0];
  let rowOfZero = 1; // last row
  expect(rowOfZeroFromBottom(board, 3)).toEqual(rowOfZero);

  board = [3, 0, 1, 2];
  rowOfZero = 2;
  expect(rowOfZeroFromBottom(board, 2)).toEqual(rowOfZero);

  board = [11, 10, 14, 6, 13, 0, 1, 4, 9, 5, 3, 15, 2, 7, 8, 12];
  rowOfZero = 3;
  expect(rowOfZeroFromBottom(board, 4)).toEqual(rowOfZero);

  board = [0, 1, 3, 4, 2, 5, 7, 8, 6];
  rowOfZero = 3;
  expect(rowOfZeroFromBottom(board, 3)).toEqual(rowOfZero);
});

test("should identify solvable board: odd dimension", () => {
  let boards = [
    [1, 2, 3, 4, 5, 6, 7, 8, 0],
    [0, 1, 3, 4, 2, 5, 7, 8, 6],
    [1, 7, 6, 4, 2, 8, 5, 3, 0],
  ];

  for (const b of boards) {
    const dimension = Math.sqrt(b.length);
    expect(isSolvable(b, dimension)).toEqual(true);
  }
});

test("should identify solvable board: even dimension", () => {
  let boards = [
    [1, 2, 3, 0],
    [1, 2, 0, 3],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 13, 14, 15, 12],
    [11, 10, 14, 6, 13, 0, 1, 4, 9, 5, 3, 15, 2, 7, 8, 12],
  ];

  for (const b of boards) {
    const dimension = Math.sqrt(b.length);
    expect(isSolvable(b, dimension)).toEqual(true);
  }
});

test("should identify unsolvable board: odd dimension", () => {
  let boards = [
    [1, 2, 3, 4, 6, 5, 7, 8, 0],
    [8, 6, 7, 2, 5, 4, 1, 3, 0],
  ];

  for (const b of boards) {
    const dimension = Math.sqrt(b.length);
    expect(isSolvable(b, dimension)).toEqual(false);
  }
});

test("should identify unsolvable board: even dimension", () => {
  let boards = [
    [1, 0, 2, 3],
    [0, 1, 2, 3],
    [3, 2, 1, 0],
    [3, 2, 4, 8, 1, 6, 0, 12, 5, 10, 7, 11, 9, 13, 14, 15],
    [13, 10, 11, 6, 5, 7, 4, 8, 1, 12, 14, 9, 3, 15, 2, 0],
    [3, 1, 13, 5, 9, 12, 0, 10, 15, 11, 7, 6, 8, 2, 4, 14]
  ];

  for (const b of boards) {
    const dimension = Math.sqrt(b.length);
    expect(isSolvable(b, dimension)).toEqual(false);
  }
});

test("should show equal distribution of odd and even solveable/unsolveable boards", () => {
  // create boards of different sizes.
  const n = 100000;
  const boards = [];
  const min = 2;
  const max = 6;
  for (let dim = 2; dim < 5; dim++) {
    let counts = [0, 0];
    for (let i = 0; i < n; i++) {
      const board = initializeRandomBoard(dim);
      counts[+isSolvable(board)]++;
    }
    console.log("solveable, unsolveable counts for dim= ", dim, ": ", counts)
  }
});

test("should create odd + even solvable boards", () => {
  // create boards of different sizes.
  const n = 100000;
  const boards = [];
  const min = 2;
  const max = 6;
  for (let i = 0; i < n; i++) {
    const dimension = Math.floor(Math.random() * (max - min) + min);
    const board = createSolvablePuzzle(dimension);
    boards.push(board);
  }

  for (const b of boards) {
    const dimension = Math.sqrt(b.length);
    expect(isSolvable(b, dimension)).toEqual(true);
  }
});

test("should solve odd and even solvable boards", () => {
  // Generate 1000 small boards
  let n = 1000;
  const min = 2;
  const max = 3;
  for (let i = 0; i < n; i++) {
    const dimension = Math.floor(Math.random() * (max - min) + min);
    const board = createSolvablePuzzle(dimension);
    const solution = getPathToSolution(board, dimension);
    const lastState = solution[solution.length - 1].board.tiles;

    expect(lastState).toEqual(squarify(createGoalState(dimension), dimension));
  }

  const board = [11, 10, 14, 6, 13, 0, 1, 4, 9, 5, 3, 15, 2, 7, 8, 12];
  // const solution = getSolution(board, 4)
  // const lastState = solution[solution.length - 1].board.tiles;
});
