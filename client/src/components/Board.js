import React, { useState } from 'react';
import { baseStyles } from '../styles';
import { findZero, createDefaultPosition, swap, areNeighbours, deepCopy } from '../utils/util';
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

    const [ solving, setSolving ] = useState(false);


    async function animateSolution() {
        setSolving(true);

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

        setSolving(false);
    }

    async function wait(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    }

    const handleOnAnimationComplete = (idx) => {
        if (!solving) {
            const newBoard = deepCopy(board);
            const slotIdx = findZero(newBoard);
            swap(newBoard, slotIdx, idx);
            setBoard(newBoard)
        }
    }


    return (
        <div>
            <div style={baseStyles.board}>
                <BoardRepresentation board={board} movingTile={movingTile} 
                    handleOnAnimationComplete={handleOnAnimationComplete}/>
            </div>
            <button onClick={animateSolution} style={baseStyles.solveButton}>Solve</button>
        </div>
    )
}

const BoardRepresentation = (props) => {
    const tileSize = 50;
    
    const { board, movingTile } = props;

    const [ clickedTile, setClickedTile ] = useState(null);

    const slotIdx = findZero(board);
    const slotPosition = createDefaultPosition(slotIdx, tileSize);

    const isSlot = ({i, j}) => i === slotIdx.i && j === slotIdx.j;
    const isMove = ({i, j}) => movingTile && i === movingTile.i && j === movingTile.j;
    const isClicked = ({i, j}) => clickedTile && i === clickedTile.i && j === clickedTile.j;

    const handleOnTileClick = (idx) => {
        setClickedTile(idx);
    }


    const renderBoard = () => {
        return board.map((row, i) => {
            return row.map((value, j) => {
                const idx = {i, j};
                const innerStyle = {...createDefaultPosition(idx, tileSize)};
                const tile = {value, innerStyle}

                if (isSlot(idx)) {
                    return <Slot key={0} {...tile} position = {slotPosition}/>
                }

                
                if (isMove(idx) || isClicked(idx)) {
                    const animation = {
                        x: slotPosition.left - innerStyle.left,
                        y: slotPosition.top - innerStyle.top
                    }
                    
                    return (
                        <motion.div animate={animation} key={tile.value} onAnimationComplete={ () => { props.handleOnAnimationComplete(idx); setClickedTile(null);}}>
                            <Tile key={tile.value} {...tile}></Tile>
                        </motion.div>
                    )


                }

                if (areNeighbours(slotIdx, idx)) {
                    return (
                        <div key={tile.value} onClick={() => handleOnTileClick(idx)}>
                            <Tile {...tile}/>
                        </div>
                    )

                }

            else { return <Tile key={tile.value} {...tile}/> }

            })
        })
    }

    return (
        <div>
            {renderBoard()}
        </div>
    )



    
}