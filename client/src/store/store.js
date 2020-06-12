import React from 'react';

export const initialState = { board: [[1, 0]] };

export const reducer = (state, action) => {
    switch(action.type) {
        case "updateboard":
            // dispatched when user completes a move.
            // when animation ends.
            // receive a move in action.move
            // update the state of the board
            return state;
        case "solve":
            // get solution to current state of the board
            // render (animate) first move (dispatch this to next move?)
            console.log("Solve Action")
            return { ...state, movingTile: {i: 0, j: 0}};
        case "nextmove":
            // dispatched when previous move + timer was completed
            // get next move in solution
            // figure out what moving tile is
            // render (animate) the moving tile
            return state;
        default:
            return state;
    }
}

export const Context = React.createContext()