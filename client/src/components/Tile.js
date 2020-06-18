import React from "react";
import { baseStyles } from "../styles";

export const Slot = (props) => {
  const { position } = props;
  return <div style={{ ...baseStyles.blankTile, ...position }} />;
};

export const Tile = (props) => {
  const style = {
    ...baseStyles.tile,
    ...props.innerStyle, // top, bottom CSS attributes
  };

  return (
    <div style={style}>
      <div style={baseStyles.tileContent} className="disable-selection">
        {props.value}
      </div>
    </div>
  );
};
