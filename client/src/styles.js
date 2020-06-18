export const baseStyles = {
  tile: {
    position: "absolute",
    backgroundColor: "#bac964",
    border: "0.5px solid black",
    borderRadius: "7px",
  },

  tileContent: {
    position: "relative",
    float: "left",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontWeight: "bold",
    fontSize: "20px",
  },

  blankTile: {
    opacity: 0,
    position: "absolute",
  },

  solveButton: {
    margin: "auto",
    display: "block",
  },

  board: {
    backgroundColor: "#84a9ac",
    display: "block",
    margin: "auto",
    position: "relative",
  },
};
