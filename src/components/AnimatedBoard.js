import React from 'react';
import { Board } from './Board';
import { solve } from '../utils/solve'

export class AnimatedBoard extends React.Component {
    constructor(props) {
        super(props);
        console.log("Animated")

        // 2D array of tile values
        let tiles = [
            [1, 0, 3],
            [4, 5, 7],
            [6, 2, 8],
        ]

        this.state = {
            tiles: tiles
        }
    }

    handleOnClick() {
        const { tiles } = this.state;
        const solution = solve(tiles);
        let i = 0;
        for (const state of solution) {
            const { tiles } = state.board;
            this.renderMove(tiles, i);
            i++;
        }
    }

    renderMove(tiles, i) {
        setTimeout(() => {
            this.setState({tiles: tiles});
        }, 200 * i);
    }

    render() {
        const {tiles} = this.state;
        console.log("AnimatedBoard tiles sent down as props:")
        console.log(tiles)
        return (
            <div> 
                <Board tiles= { tiles }/>
                <button 
                    style={{ width: 100, height: 100, fontSize: 24}}
                    onClick = { () => this.handleOnClick()}>
                    Solve
                </button>
            </div>




        )
    }

}