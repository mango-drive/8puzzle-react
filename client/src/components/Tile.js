
import React, {useState} from 'react';
import { areNeighbours, findZero, createBounds, createDefaultPosition } from '../utils/util'
import { baseStyles } from './styles'
import '../index.css'

export const Slot = (props) => {
  return (
    // renders tile in position
    <div 
      style={{...baseStyles.blankTile, ...props.position}}
    ></div>
  )
}

export class Tile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    // onClick coming from withMoveAnimation
    const {value, position, onMouseDown, onClick, onTransitionEnd} = this.props;
    const optionalMouseHandlers = {onClick, onMouseDown}
    const optionalAnimationHandlers = {onTransitionEnd}
    const optionalAnimation = { ...this.props.additionalStyles  };
    return (
      <div style= {{...baseStyles.tile, ...position, ...optionalAnimation}} 
                  {...optionalMouseHandlers}
                  {...optionalAnimationHandlers}
      >
        <div className = 'disable-selection' style={baseStyles.tileContent}>{value}</div>
      </div>
    )
  }
}
