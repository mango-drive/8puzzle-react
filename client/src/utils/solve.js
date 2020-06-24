import { swap, neighboursOfIdx, deepCopy, findZero } from "./util";

import PriorityQueue from "./PriorityQueue";

export const hamming = (arr) => {
  let count = 0;
  const n = arr.length;

  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < n; ++j) {
      const val = arr[i][j];
      if (val !== 0) {
        const pos = i * n + j + 1;
        if (val !== pos) count++;
      }
    }
  }
  return count;
};

export const manhattan = (arr) => {
  let manhattan = 0;
  const n = arr.length;

  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < n; ++j) {
      const val = arr[i][j];
      if (val !== 0) {
        const goal_i = Math.floor((val - 1) / n);
        const goal_j = (val - 1) % n;
        manhattan += Math.abs(goal_i - i) + Math.abs(goal_j - j);
      }
    }
  }

  return manhattan;
};

export const isGoal = (arr) => {
  return hamming(arr) === 0;
};

export const generateNeighborArrays = (arr, idx) => {
  const neighborArrays = [];
  for (const idx2 of neighboursOfIdx(arr, idx)) {
    const neigborArray = deepCopy(arr);
    swap(neigborArray, idx, idx2);
    neighborArrays.push(neigborArray);
  }
  return neighborArrays;
  // TODO: return object that contains the move performed
  // to create the neighbouring board and the neighbouring
  // board itself.
  // This will allow the solver to store the move into
  // the solution data structure, and will remove the need
  // to parse the solution at the end of the solve.
};

export class Board {
  constructor(tiles) {
    this.tiles = tiles;
    this.emptySlot = findZero(this.tiles);
    this.manhattan = manhattan(this.tiles);
  }

  get neighbours() {
    const neighbourTiles = generateNeighborArrays(this.tiles, this.emptySlot);
    const neighbourBoards = neighbourTiles.map((tiles) => new Board(tiles));
    return neighbourBoards;
  }

  isGoal() {
    return isGoal(this.tiles);
  }

  get dimension() {
    return this.tiles.length;
  }

  isEqual(to) {
    if (this.dimension !== to.dimension) return false;
    for (let i = 0; i < this.dimension; ++i) {
      for (let j = 0; j < this.dimension; ++j) {
        if (this.tiles[i][j] !== to.tiles[i][j]) return false;
      }
    }
    return true;
  }
}

class SearchNode {
  constructor(board, moves, prev) {
    this.board = board;
    this.moves = moves;
    this.prev = prev;
  }

  priority() {
    return this.board.manhattan + this.moves;
  }
}

const priorityCompare = (node1, node2) => {
  return node1.priority() - node2.priority();
};

export const solve = (tiles) => {
  let solutionNode = null;
  const initialBoard = new Board(tiles);
  const initialNode = new SearchNode(initialBoard, 0, null);
  const minPQ = new PriorityQueue([initialNode], priorityCompare);

  while (true) {
    const currNode = minPQ.extract();
    const currBoard = currNode.board;

    if (currBoard.isGoal()) {
      solutionNode = currNode;
      break;
    }

    const moves = currNode.moves;
    const prevBoard = currNode.prev ? currNode.prev.board : null;

    for (const board of currBoard.neighbours) {
      if (prevBoard !== null && board.isEqual(prevBoard)) {
        continue;
      }
      minPQ.insert(new SearchNode(board, moves + 1, currNode));
    }
  }

  let currNode = solutionNode;
  const solution = [];
  while (currNode !== null) {
    solution.unshift(currNode);
    currNode = currNode.prev;
  }
  return parseSolution(solution);
};

// TODO: It's probably more efficient to store the tile to move
// during solve, but this was the quick and easy way
export const parseSolution = (solution) => {
  const tilesToMove = [];
  // when tile is moved, the slot is now
  // where the tile used to be
  for (let m = 1; m < solution.length; m++) {
    tilesToMove.push(findZero(solution[m].board.tiles));
  }

  return tilesToMove;
};

// A pair of tiles form an inversion if the values on tiles are
// in reverse order of their appearance in goal state.

export const countInversions = (tiles) => {
  let invCount = 0;
  for (let i = 0; i < tiles.length - 1; ++i) {
    for (let j = i + 1; j < tiles.length; ++j) {
      if (tiles[i] && tiles[j] && tiles[i] > tiles[j]) {
        invCount++;
      }
    }
  }
  return invCount;
};

export const isSolvable = (tiles, dimension) => {};
