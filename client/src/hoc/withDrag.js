import React from "react";
import { dragWithinBounds } from "../utils/util";

export function withDrag(Component) {
  return class extends React.Component {
    // passes absolute position down to component
    constructor(props) {
      super(props);
      console.log("inDrag: false in constructor");

      this.state = {
        position: this.props.defaultPosition,
        inDrag: false,
        prevMouse: { x: 0, y: 0 },
        offset: { dx: 0, dy: 0 },
      };
      const newObject = { test: 1, a: 5, testing: 3, abc: 10 };

      this.handleOnMouseUp = this.handleOnMouseUp.bind(this);
      this.handleOnMouseMove = this.handleOnMouseMove.bind(this);
    }

    mouseDelta = (event) => {
      const { prevMouse } = this.state;
      return { dx: event.pageX - prevMouse.x, dy: event.pageY - prevMouse.y };
    };

    handleOnMouseDown(e) {
      document.addEventListener("mouseup", this.handleOnMouseUp);
      document.addEventListener("mousemove", this.handleOnMouseMove);
      this.setState({
        inDrag: true,
        prevMouse: { x: e.pageX, y: e.pageY },
        offset: { dx: 0, dy: 0 },
      });
    }

    handleOnMouseMove(e) {
      if (this.state.inDrag) {
        let { position } = this.state;
        const delta = this.mouseDelta(e);
        position = dragWithinBounds(delta, position, this.props.bounds);
        this.setState({
          position: position,
          prevMouse: { x: e.pageX, y: e.pageY },
        });
      }
    }

    handleOnMouseUp() {
      document.removeEventListener("mouseup", this.handleOnMouseUp);
      document.removeEventListener("mousemove", this.handleOnMouseMove);
      this.setState({ inDrag: false });
    }

    render() {
      return (
        <Component
          {...this.props}
          onMouseDown={(e) => this.handleOnMouseDown(e)}
          onMouseMove={(e) => this.handleOnMouseMove(e)}
          onMouseUp={() => this.handleOnMouseUp()}
          position={this.state.position}
        />
      );
    }
  };
}
