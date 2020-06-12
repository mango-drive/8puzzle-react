import React, { useContext } from 'react';

export const withMoveAnimation = (Component) => {
    return (props) => {
        console.log("with animation", props)
        const { position, animationEndPosition } = props;
        const animation = createCSSTransform(position, animationEndPosition)
        return (
            <Component animation={animation} {...props} />
        )
    }

}

const createCSSTransform = (from, to) => {
    const Y = to.top - from.top;
    const X = to.left - from.left;
    const animationStyle = {
        transform: `translate(${X}px, ${Y}px)`,
        //https://easings.net/#easeInBack
        transition: 'transform 1s cubic-bezier(.29,.02,.54,-0.26)'
    }
    return animationStyle;
}