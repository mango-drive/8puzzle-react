import React, { useState, useContext } from 'react';
import { Context } from '../store/store';
import { baseStyles } from '../styles';
import { findZero, createDefaultPosition } from '../utils/util';
import { Tile, Slot} from './Tile';
import { withMoveAnimation } from '../hoc/withMoveAnimation';

export const Board = (props) => {
    const { store , dispatch } = useContext(Context);
    const { board } = store;

    return (
        <div style={baseStyles.board}>
            <BoardRepresentation board={{board}}/>
        </div>
    )
}

const BoardRepresentation = (props) => {
    const tileSize = 100;
    
    const { board } = props.board;
    const { store, dispatch } = useContext(Context )
    const { movingTile } = store;

    const TileWithMoveAnimation = withMoveAnimation(Tile);

    const slotIdx = findZero(board);
    const slotPosition = createDefaultPosition(slotIdx, tileSize);


    const isSlot = ({i, j}) => i === slotIdx.i && j === slotIdx.j;
    const isMove = ({i, j}) => movingTile && i === movingTile.i && j === movingTile.j;

    const renderBoard = () => {
        return board.map((row, i) => {
            return row.map((value, j) => {
                const position = createDefaultPosition({i, j}, tileSize);
                const tile = {value, position}

                if (isSlot({i, j})) {
                    return <Slot key={0} position={position} value={0}/>
                }

                else if (isMove({i, j})) {
                    console.log("Board will animate", tile.value)
                    return <TileWithMoveAnimation 
                                animationEndPosition = {slotPosition}
                                key={tile.value} 
                                {...tile}
                            />
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