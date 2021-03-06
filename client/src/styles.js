export const cellSize = 110;

export const createGridLayout = (n, cellSize) => {
  const layout = [];
  const center = (n * cellSize) / 2;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const x = j * cellSize - center;
      const y = i * cellSize - center;
      layout.push([x, y]);
    }
  }
  return layout;
};

export const baseStyles = {
  title: {
    leftMargin: '100px',
    fontSize: '24px'
  },

  tile: {
    width: cellSize * 0.9,
    height: cellSize * 0.9,
    borderRadius: "4px",
    background: "#ffffff",
    boxShadow: "rgba(0,0,0,0.4) 0 3px 3px 0",
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
    gridRow: 4
  },

  board: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // alignContent: "center",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },

};
