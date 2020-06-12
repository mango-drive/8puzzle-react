import React from 'react';
import { baseStyles } from "../styles";
import { Context } from "../store/store";
import { useContext } from "react";

export const Slot = (props) => {
    const { position } = props;
    return (
        <div style={{...baseStyles.blankTile, ...position}}/>
    )
}

export const Tile = (props) => {
    const style = {
        ...baseStyles.tile, 
        ...props.position, 
        ...props.animation
    }
    
    console.log("Tile has props: ", props)
    console.log("Tile has style", style)

    const {store, dispatch} = useContext(Context);

    const handleOnTransitionEnd = () => {
        console.log("transition end")
        dispatch({type: "animation-end"})
    }

    return ( 
        <div style={style} onTransitionEnd={handleOnTransitionEnd}>
            <div style={baseStyles.tileContent}
                 className = 'disable-selection'>
                {props.value}
            </div>
        </div>
    )
}

