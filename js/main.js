/*----- constants -----*/

/*----- app's state (variables) -----*/
let sockets;

/*----- cached element references -----*/

const grid = document.getElementById('grid');
const socketEls = document.querySelectorAll('div');

/*----- functions -----*/
init();

function init() {
  sockets = new Array(42);
  createGrid();
}

function createGrid() {
  for (i = 0; i < sockets.length; i++) {
    let newSocket = document.createElement('div');
    newSocket.setAttribute('id', i.toString());
    grid.appendChild(newSocket);
    console.log(i);
  };
};