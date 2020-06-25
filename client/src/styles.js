export const cellSize = 70;

export const createGridLayout = (n, cellSize) => {
  const layout = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const x = j * cellSize;
      const y = i * cellSize;
      layout.push([x, y]);
    }
  }
  return layout;
};

export const baseStyles = {
  game: {
    backgroundColor: "#8c91ab",
  },

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
    width : cellSize * 3,
    height: cellSize,
    position: "absolute",
    display: "inline-block",
    margin: 'auto',
    top: cellSize * 5
  },

  board: {
    backgroundColor: "#84a9ac",
    // height: cellSize *3,
    // width: cellSize * 3,
    display: 'flex',
    justifyContent: 'center',
  },
};
