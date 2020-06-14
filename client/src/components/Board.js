import React, { useState } from 'react';
import { baseStyles } from '../styles';
import { findZero, createDefaultPosition, swap } from '../utils/util';
import { Tile, Slot} from './Tile';
import { motion } from 'framer-motion';
import { parseSolution, solve } from '../utils/solve.js'

export const Board = () => {
    
    const [ movingTile, setMovingTile ] = useState(null)

    const [ board, setBoard] = useState(
            [[1,2,3],
             [4,0,5],
             [6,7,8]]
    )


    async function animateSolution() {
        const solution = parseSolution(solve(board));

        // for each in solution
        for (const move of solution) {
            setMovingTile(move);
            await wait(100)
            const newBoard = board;
            const slotIdx = findZero(newBoard);
            swap(newBoard, slotIdx, move);
            setBoard(newBoard)
        }
    }

    async function wait(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    }


    return (
        <div>
        <div style={baseStyles.board}>
            <BoardRepresentation board={board} movingTile={movingTile}/>
        </div>
        <button onClick={animateSolution}style={baseStyles.solveButton}>Solve</button>
        </div>
    )
}

const BoardRepresentation = (props) => {
    const tileSize = 50;
    
    const { board, movingTile } = props;

    const slotIdx = findZero(board);
    const slotPosition = createDefaultPosition(slotIdx, tileSize);


    const isSlot = ({i, j}) => i === slotIdx.i && j === slotIdx.j;
    const isMove = ({i, j}) => movingTile && i === movingTile.i && j === movingTile.j;

    const renderBoard = () => {
        return board.map((row, i) => {
            return row.map((value, j) => {
                const innerStyle = {...createDefaultPosition({i, j}, tileSize)};
                const tile = {value, innerStyle}

                if (isSlot({i, j})) {
                    return <Slot key={0} {...tile}/>
                }

                
                else if (isMove({i, j})) {
                    const animation = {
                        x: slotPosition.left - innerStyle.left,
                        y: slotPosition.top - innerStyle.top
                    }
                    return (
                        <motion.div animate={animation}>
                            <Tile key={tile.value} {...tile}></Tile>
                        </motion.div>
                    )
                }

                else {
                    return <Tile key={tile.value} {...tile}/>
                }

            })
        })
    }

    return (
        <div>
            {renderBoard()}
        </div>
    )



    
}