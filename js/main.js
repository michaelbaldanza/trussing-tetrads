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
    indexes: [],
    type: '',
  };
  render();
}

function createGrid() {
  for (i = 0; i < sockets.length; i++) {
    let newSocket = document.createElement('div');
    let strike = document.createElement('div');
    newSocket.appendChild(strike);
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
    let strike = socketEls[r].firstChild;
    if (strike.hasAttribute('strike')) strike.removeAttribute('strike');
    // if (sockets[r] === -1) socketEls[r].style.backgroundColor = '#d8e2dc';
    // if (sockets[r] === 1) socketEls[r].style.backgroundColor = '#fec89a';
    if (sockets[r] === -1) socketEls[r].style.backgroundColor = '#caffbf';
    if (sockets[r] === 1) socketEls[r].style.backgroundColor = '#9bf6ff';
    if (!sockets[r]) socketEls[r].style.backgroundColor = '';
    if (victory.indexes.indexOf(r) !== -1) {
      // socketEls[r].style.backgroundColor = 'maroon';
      strike.setAttribute('strike', victory.type);
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

function getWinner() {;
  let type = ''
  let bound = sockets.length - 7;
  for (i = sockets.length - 1; i >= 0; i--) {
    if (sockets[i]) {
      // check winner horizontally
      if (i > bound + 2) {
        const horizontal = [3, 2, 1];
        type = 'horizontal';
        checkTetrad(i, horizontal, type);
      }
      // check winner vertically
      const vertical = [21, 14, 7];
      type = 'vertical';
      checkTetrad(i, vertical, type);
      // check winner on left diagonal
      const leftDiagonal = [24, 16, 8];
      type = 'left-diagonal'
      checkTetrad(i, leftDiagonal, type);
      // check winner on right diagonal
      const rightDiagonal = [18, 12, 6];
      type = 'right-diagonal';
      checkTetrad(i, rightDiagonal, type);
    }
    if (bound === i) bound -= 7;
  }
}

function checkTetrad(idx, tetrad, type) {
  if (victory.indexes.length === 4) return;
  let counter = 0;
  for (q = 0; q < tetrad.length; q++) {
    if (sockets[idx] === sockets[idx - tetrad[q]]) {
      let pcIdx = idx - tetrad[q];
      victory.indexes.push(pcIdx);
      counter++;
      if (counter === 3) {
        victory.indexes.push(idx);
        victory.winner = turn;
        victory.type = type;
        console.log(victory.type);
        return;
      }
    }
  }
  victory.indexes = [];
}

function reset() {
  init();
}