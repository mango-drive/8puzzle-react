export const cellSize = 100;

export const createGridLayout = (n, cellSize) => {
  const layout = [];
  const origin = Math.floor(n * cellSize / 2);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const x = j * cellSize - origin;
      const y = i * cellSize - origin;
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
    width: cellSize * 0.9,
    height: cellSize * 0.9,
    borderRadius: "4px",
    background: "white",
    boxShadow: "rgba(0,0,0,0.2) 0 1px 2px 0",
    color: "#333",
    fontSize: "1.2rem",
    fontWeight: "bold",
    cursor: "pointer",
    position: "absolute",
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
    width: cellSize * 3,
    height: cellSize,


    // top: cellSize * 5
  },

  board: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "110vw",
  },
};
