import React from 'react';
import { Board } from './Board';

export class SolvableBoard extends React.Component {
    constructor(props) {
        super(props);

        // 2D array of tile values
        let tiles = [
            [1, 2, 3],
            [4, 0, 5],
            [6, 7, 8],
        ]

        this.state = {
            tiles: tiles
        }
    }

    render() {
        const {tiles} = this.state;
        return (
            <Board tiles= { tiles }/>
        )
    }

}