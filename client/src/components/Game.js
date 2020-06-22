import React from 'react'
import { baseStyles } from '../styles'
import { Board } from './Board'
import { SolveButton } from './SolveButton.js'

export const Game = () => {
  return (
    <div style={baseStyles.game}>
      <Board />
      <SolveButton />
    </div>
  );
};