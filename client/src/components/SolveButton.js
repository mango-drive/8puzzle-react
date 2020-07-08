import React from 'react'
import {baseStyles} from '../styles.js'

export const SolveButton = (onClick) => {
  return (
    <button onClick={onClick} style={baseStyles.solveButton}>
      Solve
    </button>
  );
};