import React from 'react';
import { solve, parseSolution } from '../utils/solve'
import { findZero, deepCopy, swap } from '../utils/util';

export const initialState = { 
    board: [
            [1, 2, 3],
            [4, 0, 5],
            [6, 7, 8],
    ],
};

export const reducer = (state, action) => {
    switch(action.type) {
        case "updateboard":
            // dispatched when user completes a move.
            // when animation ends.
            // receive a move in action.move
            // update the state of the board
            const { movingTile, board} = state;
            const slotIdx = findZero(board);

            const newBoard = deepCopy(board);
            swap(newBoard, movingTile, slotIdx)
            return {...state, board: newBoard};
        case "solve":
            // get solution to current state of the board
            // render (animate) first move (dispatch this to next move?)
            console.log("Solve Action")
            console.log("Calculating solution")
            const solution = solve(state.board)
            const tile = parseSolution(solution)[0]
            return { ...state, solution, movingTile:tile};
        case "nextmove":
            // dispatched when previous move + timer was completed
            // get next move in solution
            // figure out what moving tile is
            // render (animate) the moving tile
            console.log("next move called")
            return state;
        default:
            return state;
    }
}

export const Context = React.createContext()