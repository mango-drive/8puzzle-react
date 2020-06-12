import React from 'react';


export const withMoveAnimation = (Target) => {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = { animationStyle: this.createCSSTransform() };
            this.handleOnTransitionEnd = this.handleOnTransitionEnd.bind(this);
        }
        


        createCSSTransform() {
            console.log("creating transform")
            const {targetPosition, position} = this.props;

            const tY = targetPosition.top - position.top; 
            const tX = targetPosition.left - position.left;

            const animationStyle = {
                transform: `translate(${tX}px, ${tY}px)`,
                //https://easings.net/#easeInBack
                transition: 'transform 0.3s cubic-bezier(.29,.02,.54,-0.26)'
            }
            return animationStyle;
        }

        handleOnTransitionEnd() {
            console.log("transition end")
            const {handleOnMoveComplete} = this.props;
            handleOnMoveComplete(this.props.idx);
        }

        render() {
            const {animationStyle} = this.state;
            console.log("animation style", animationStyle)
            return (
                <Target onClick={this.onClick}
                        additionalStyles={animationStyle}
                        onTransitionEnd={this.handleOnTransitionEnd}
                        { ...this.props }
                />
            )
        }
    }
}