
import React from 'react';
import '../index.css'

export class Tile extends React.Component {
  constructor(props) {
    super(props);
  }

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

class Moveable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: { top: 0, left: 0 },
      isMoving: false,
      prevMouse: { x: 0, y: 0}
    }
  }

  handleOnMouseDown(event) {
    const startY = event.pageY;
    this.setState({isMoving: true, start: {y: startY}});
  }

  handleOnMouseUp(event) {
    this.setState({isMoving: false})
  }

  handleOnMouseMove(event) {
    if (this.state.isMoving) {
      const mouseY = event.pageY;
      const offsetY = mouseY - this.state.prevMouse.y;
      const top = this.state.style.top + offsetY;
      this.setState({style: {top: top}, start: {y: mouseY}});
    }
  }

  render() {
    return (
      <div 
        className="tile moveable" 
        onMouseDown={(e) => this.handleOnMouseDown(e)}
        onMouseUp={(e) => this.handleOnMouseUp(e)}
        onMouseMove={(e) => this.handleOnMouseMove(e)}
        style = {this.state.style}
      >
      </div>
    )
  }

}