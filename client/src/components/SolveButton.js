import React from 'react'
import {baseStyles} from '../styles.js'

const SolveButton = (handleOnSolve) => {
  return (
    <button onClick={handleOnSolve} style={baseStyles.solveButton}>
      Solve
    </button>
  );
};