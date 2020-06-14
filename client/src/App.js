import React, { useState, useReducer } from 'react';
import {Board} from './components/Board'
import { baseStyles } from './styles';
import { solve } from './utils/solve';
import { initialState, reducer, Context } from './store/store';


export default function App() {
  const [store, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value = {{store, dispatch}}>
      <Board></Board>
    </Context.Provider>
  )
}
