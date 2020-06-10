import React from 'react';
import {Board2} from './components/Tile'

function App() {
  const initial = [[1, 0, 2]];
  return (
    <Board2 initialState={initial}/>
  );
}

export default App;