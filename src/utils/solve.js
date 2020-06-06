import {
    swap, 
    neighboursOfIdx,
    deepCopy,
    findZero
} from './util'

import PriorityQueue from './PriorityQueue'

export const hamming = (arr) => {
    let count = 0;
    const n = arr.length;

    for(let i = 0; i < n; ++i) {
        for(let j=0; j < n; ++j) {
            const val = arr[i][j];
            if (val != 0) {
                const pos = i*n + j+1;
                if (val != pos)
                    count++;
            }
        }
    }
    return count;
} 

export const manhattan = (arr) => {
    let manhattan = 0;
    const n = arr.length;

    for (let i = 0; i < n; ++i) {
        for(let j=0; j < n; ++j) {
            const val = arr[i][j];
            if (val != 0) {
                const goal_i = Math.floor((val - 1) / n);
                const goal_j = (val - 1) % n;
                manhattan += Math.abs(goal_i - i) + Math.abs(goal_j - j);
            }
        }
    }

    return manhattan;
}

export const isGoal = (arr) => {
    return hamming(arr) == 0;
}

export const generateNeighborArrays = (arr, idx) => {
    const neighborArrays = [];
    for(const idx2 of neighboursOfIdx(arr, idx)) {
        const neigborArray = deepCopy(arr);
        swap(neigborArray, idx, idx2);
        neighborArrays.push(neigborArray);
    }
    return neighborArrays;
}

export class SolvableBoard {
    constructor(tiles) {
        this._tiles = tiles;
        this._emptySlot = findZero(this._tiles);
    }

    get hamming() {
        return hamming(this._tiles);
    }
    
    get manhattan() {
        return manhattan(this._tiles);
    }

    get neighbours() {
        const neighbourTiles = generateNeighborArrays(this._tiles, this._emptySlot);
        const neighbourBoards = neighbourTiles.map((tiles) => new SolvableBoard(tiles));
        return neighbourBoards;
    }

    isGoal() {
        return isGoal(this._tiles);
    }

    get dimension() {
        return this._tiles.length;
    }

    get tiles() {
        return this._tiles;
    }

    isEqual(to) {
        if (this.dimension != to.dimension) return false;
        for (let i = 0; i < this.dimension; ++i) {
            for(let j = 0; j < this.dimension; ++j) {
                if ( this._tiles[i][j] != to.tiles[i][j])
                    return false;
            }
        }
        return true;
    }
}

class SearchNode {
    constructor(board, moves, prev) {
        this._board = board;
        this._moves = moves;
        this._prev = prev;
    }

    priority() {
        return this._board.manhattan + this._moves;
    }

    get board() {
        return this._board;
    }

    get moves() {
        return this._moves;
    }

    get prev() {
        return this._prev;
    }
}

const priorityCompare = (node1, node2) => {
    return node1.priority() - node2.priority();
}


export const solve = (board) => {
    let solutionNode = null;
    const initialNode = new SearchNode(board, 0, null)
    const minPQ = new PriorityQueue([initialNode], priorityCompare);

    while(true) {
        const currNode = minPQ.extract();
        const currBoard = currNode.board;

        if(currBoard.isGoal()) {
            solutionNode = currNode;
            break;
        }

        const moves = currNode.moves;
        const prevBoard = currNode.prev ? currNode.prev.board : null;

        for (const board of currBoard.neighbours) {
            if (prevBoard != null && board.isEqual(prevBoard)) {
                continue;
            }
            minPQ.insert(new SearchNode(board, moves + 1, currNode))
        }
    }

    let currNode = solutionNode;
    const solution = [];
    while(currNode != null) {
        solution.unshift(currNode);
        currNode = currNode.prev;
    }
    return solution;
}
