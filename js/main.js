/*----- constants -----*/
const sockets = new Array(42);
const columns = [];

/*----- app's state (variables) -----*/
let turn, winner;

/*----- cached element references -----*/

const grid = document.getElementById('grid');
const socketEls = document.getElementsByClassName('socket');

/*----- functions -----*/
init();

function init() {
  erectColumns();
  createGrid();
  turn = -1;
  winner = null;
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
  if (winner) return;
  let socketNo = Number(evt.target.getAttribute('id'));
  for (i = 0; i < columns.length; i++) {
    if (columns[i].indexOf(socketNo) !== -1) {
      for (j = 0; j < columns[i].length; j++) {
        if (!sockets[columns[i][j]]) {
          sockets[columns[i][j]] = turn;
          getWinner();
          render();
          turn *= -1;
          return;
        }
      }
    }
  }
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

function erectColumns() {
  const bases = new Array(7);
  for (i = 0; i < bases.length; i++) {
    bases[i] = sockets.length - i - 1;
  }
  bases.forEach(function (base) {
    let column = [];
    for (i = base; i >= 0; i -= 7) {
      column.push(i);
    }
    columns.push(column);
  });
}

function getWinner() {
  let bound = 0;
  for (i = sockets.length - 1; i >= 0; i--) {
    if (
      sockets[i] &&
      i > columns[6][bound] + 2 &&
      sockets[i] === sockets[i - 3] &&
      sockets[i] === sockets[i - 2] &&
      sockets[i] === sockets[i - 1]
    ) {
      console.log(i);
      console.log(`${turn} wins!`)
      winner = turn;
    }
    if (columns[6][bound] === i) {
      bound += 1;
    }
  }
}
