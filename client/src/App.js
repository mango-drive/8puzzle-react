import React from 'react';
import {Board2} from './components/Tile'

function App() {
  const initial = [[1, 4, 2],
                    [3, 0, 5],
                    [6, 7, 8]];
  return (
    <Board2 initialState={initial}/>
  );
}

export default App;