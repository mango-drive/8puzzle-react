import React from 'react';

const animationStyle = {
    transform: 'translateY(150px)',
    transition: 'transform 1s ease',
};

export const withMoveAnimation = (Target) => {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {moveTop: false};
        }

        onClick = () => {
            console.log("Clicked")
            this.setState({ moveTop: !this.state.moveTop });
        }

        render() {
            console.log("withMove props:", this.props)
            return (
                <Target isOpen={true}
                        onClick={this.onClick}
                        additionalStyles={this.state.moveTop? animationStyle : {}}
                        { ...this.props }
                />
            )
        }
    }
}