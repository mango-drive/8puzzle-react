export const cellSize = 80;

export const baseStyles = {

  tile: {
    width: cellSize*0.9,
    height: cellSize*0.9,
    display: 'inline-block',
    borderRadius: '4px',
    background: 'white',
    boxShadow: 'rgba(0,0,0,0.2) 0 1px 2px 0',
    color: "#333",
    fontSize: '1.2rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'translate 0.3s ease-in',
    position: 'absolute'
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
