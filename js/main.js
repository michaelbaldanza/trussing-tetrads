/*----- constants -----*/
const sockets = new Array(42);
const columns = [];

/*----- app's state -----*/
let turn, victory;

/*----- cached element references -----*/
const grid = document.getElementById('grid');
const socketEls = document.getElementsByClassName('socket');
const resetButton = document.querySelector('button');

/*----- functions -----*/
initView();
init();

function initView() {
  createGrid();
  resetButton.addEventListener('click', reset);
}

function init() {
  for (i = 0; i < sockets.length; i++) sockets[i] = null;
  erectColumns();
  turn = -1;
  victory = {
    winner: null,
    vicInds: []
  };
  render();
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
  if (victory.winner) return;
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
  for (r = 0; r < sockets.length; r++) {
    if (sockets[r] === -1) socketEls[r].style.backgroundColor = 'lime';
    if (sockets[r] === 1) socketEls[r].style.backgroundColor = 'orange';
    if (!sockets[r]) socketEls[r].style.backgroundColor = '';
    if (victory.vicInds.indexOf(r) !== -1) {
      socketEls[r].style.backgroundColor = 'maroon';
    }
  }
}

function erectColumns() {
  const bases = new Array(7);
  for (i = 0; i < bases.length; i++) bases[i] = sockets.length - i - 1;
  bases.forEach(function (base) {
    let column = [];
    for (i = base; i >= 0; i -= 7) column.push(i);
    columns.push(column);
  });
}

function getWinner() {
  let bound = sockets.length - 7;
  for (i = sockets.length - 1; i >= 0; i--) {
    if (sockets[i]) {
      // check winner horizontally
      if (i > bound + 2) {
        const horizontal = [3, 2, 1];
        checkTetrad(i, horizontal);
      }
      // check winner vertically
      const vertical = [21, 14, 7];
      checkTetrad(i, vertical);
      // check winner on left diagonal
      const leftDiagonal = [24, 16, 8];
      checkTetrad(i, leftDiagonal);
      // check winner on right diagonal
      const rightDiagonal = [18, 12, 6];
      checkTetrad(i, rightDiagonal);
      if (bound === i) bound -= 7;
    }
  }
}

function checkTetrad(idx, tetrad) {
  if (victory.vicInds.length === 4) return;
  let counter = 0;
  for (q = 0; q < tetrad.length; q++) {
    if (sockets[idx] === sockets[idx - tetrad[q]]) {
      let pcIdx = idx - tetrad[q];
      victory.vicInds.push(pcIdx);
      counter++;
      if (counter === 3) {
        victory.vicInds.push(idx);
        victory.winner = turn;
        return;
      }
    }
  }
  victory.vicInds = [];
}

function reset() {
  init();
}