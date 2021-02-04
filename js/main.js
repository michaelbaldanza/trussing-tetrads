/*----- constants -----*/

/*----- app's state (variables) -----*/
let sockets, turn;

/*----- cached element references -----*/

const grid = document.getElementById('grid');
const socketEls = document.getElementsByClassName('socket');

/*----- functions -----*/
init();

function init() {
  sockets = new Array(42);
  createGrid();
  turn = -1;
}

function createGrid() {
  for (i = 0; i < sockets.length; i++) {
    let newSocket = document.createElement('div');
    newSocket.setAttribute('class', 'socket')
    newSocket.setAttribute('id', i.toString());
    newSocket.addEventListener('click', selectSocket);
    grid.appendChild(newSocket);
  };
};

function selectSocket(evt) {
  let socketNo = Number(evt.target.getAttribute('id'));
  if (sockets[socketNo]) {
    return;
  }
  sockets[socketNo] = turn;
  render();
  turn *= -1;
}

function render() {
  for (i = 0; i < sockets.length; i++) {
    if (sockets[i] === -1) {
      socketEls[i].style.backgroundColor = 'lime';
    }
    if (sockets[i] === 1) {
      socketEls[i].style.backgroundColor = 'orange';
    }
  }
}