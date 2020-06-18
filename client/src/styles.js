

export const baseStyles = {
  tile: {
    width: 47,
    height: 47,
    position: 'absolute',
    backgroundColor:"#bac964",
    border: "0.5px solid black",
    borderRadius: "7px"
  }, 

  tileContent: {
    position: 'relative',
    float: 'left',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontWeight: 'bold',
    fontSize: '20px'
  },

  blankTile: {
    width: 47,
    height: 47,
    opacity: 0,
    position: 'absolute'
  },

  solveButton: {
    width:150,
    height:50, 
    margin: 'auto',
    display: 'block'
  },

  board: {
    backgroundColor: '#84a9ac',
    display: 'block',
    margin: 'auto',
    width: 150,
    height: 150,
    position: 'relative',
  },
}