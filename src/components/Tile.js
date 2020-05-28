
import React from 'react';
import '../index.css'

export class Tile extends React.Component {

  render() {
    return (
      // outer div for the card
      <div
        className={this.props.className}
        style={this.props.style}
        onMouseDown={this.props.onMouseDown}
      >
        <div className='tile-content disable-selection'>{this.props.id}</div>
      </div>
    );
  }
}
