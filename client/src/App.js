import React, { useState } from 'react';
import {Board} from './components/Board'
import { baseStyles } from './styles';
import { solve } from './utils/solve';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      solveAction: false,
    }
  }

  handleOnSolve = () => {
    let { solveAction } = this.state;
    this.setState({solveAction: !solveAction})
  }

  render() {
    const { solveAction } = this.state;
    console.log("App renders with solveAction: ", solveAction)
    return (
      <div style={{display: 'inline-block'}}>
        <Board solveAction={solveAction}/>
        <button onClick={this.handleOnSolve} style={baseStyles.solveButton}>Solve</button>
      </div>
    );

  }

}