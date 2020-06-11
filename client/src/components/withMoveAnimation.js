import React from 'react';

const animationStyle = {
    transform: 'translateY(150px)',
    transition: 'transform 1s ease',
};

export const withMoveAnimation = (Target) => {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {move: false, animationStyle: {}};
        }

        onClick = () => {
            if (!this.state.move) {
                this.setState({ move: true, animationStyle: this.createCSSTransform() })
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

            console.log("Created transform:", animationStyle)

            return animationStyle;
        }

        render() {
            console.log("withMove props:", this.props)
            console.log()
            return (
                <Target onClick={this.onClick}
                        additionalStyles={this.state.move? this.state.animationStyle : {}}
                        { ...this.props }
                />
            )
        }
    }
}