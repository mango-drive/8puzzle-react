import React from 'react';

const animationStyle = {
    transform: 'translateY(150px)',
    transition: 'transform 1s ease',
};

export const withMoveAnimation = (Target) => {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = { animating: false, animationStyle: {} };
        }

        onClick = () => {
            if (!this.state.animating) {
                this.setState({animating: true, animationStyle: this.createCSSTransform() })
            } else {
                this.setState({animating: false, animationStyle: {}})
            }

        }

        createCSSTransform() {
            const {targetPosition, position} = this.props;

            const tY = targetPosition.top - position.top; 
            const tX = targetPosition.left - position.left;

            const animationStyle = {
                transform: `translate(${tX}px, ${tY}px)`,
                transition: 'transform 1s ease'
            }
            return animationStyle;
        }

        handleOnTransitionEnd() {
            console.log("animation end")
        }

        render() {
            const {animationStyle} = this.state;
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