import React from 'react'
import {baseStyles} from '../styles.js'

export const SolveButton = (handleOnSolve) => {
  return (
    <button onClick={handleOnSolve} style={baseStyles.solveButton}>
      Solve
    </button>
  );
};