import React from 'react';
import { baseStyles } from "../styles";
import { Context } from "../store/store";
import { useContext } from "react";
import { motion } from "framer-motion"

export const Slot = (props) => {
    const { position } = props;
    return (
        <div style={{...baseStyles.blankTile, ...position}}/>
    )
}

export const Tile = (props) => {
    const { board, dispatch } = useContext(Context)
    const {animation} = props;

    console.log("in Tile, the animation: ", animation)

    const style = {
        ...baseStyles.tile,   
        ...props.innerStyle,  // top, bottom CSS attributes
    }

    const handleOnAnimationComplete = () => {
        dispatch({type: "updateboard" });
    }

    return ( 
        <motion.div style={style} 
                    animate={{ ...animation }}
                    onAnimationComplete={handleOnAnimationComplete}
        >
            <div style={baseStyles.tileContent}
                 className = 'disable-selection'>
                {props.value}
            </div>
        </motion.div>
    )
}

