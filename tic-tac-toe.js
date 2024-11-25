const cells = document.querySelectorAll('.cell');
const gameStatus = document.getElementById('statusz');
const newGameButton = document.getElementById('uj');
const twoPlayerButton = document.getElementById('ketj');
const onePlayerButton = document.getElementById('egyj');

let board = ['', '', '', '', '', '', '', '', ''];
let jelenlegi = 'X'; 
let gameOver = false;

const checkWinner = () => {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameOver = true;
      gameStatus.textContent = `${board[a]} játékos nyert!`;
      return;
    }
  }

  if (!board.includes('')) {
    gameOver = true;
    gameStatus.textContent = 'A játék döntetlen.';
  }
};

const computerMove = () => {
  const emptyCells = board.map((val, index) => (val === '' ? index : null)).filter(val => val !== null);
  if (emptyCells.length === 0) return;  

  const randomMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  board[randomMove] = 'O';
  cells[randomMove].textContent = 'O';
  cells[randomMove].classList.add('o');
  checkWinner();
  jelenlegi = 'X';
};

const handleCellClick = (event) => {
  if (gameOver) return;

  const index = event.target.dataset.index;
  if (board[index] !== '') return;

  board[index] = jelenlegi;
  event.target.textContent = jelenlegi;
  event.target.classList.add(jelenlegi.toLowerCase());
  checkWinner();
  jelenlegi = jelenlegi === 'X' ? 'O' : 'X';

  if (jelenlegi === 'O' && onePlayerButton.disabled) {
    setTimeout(computerMove, 500);
  }
};

const ujJatek = () => {
  board = ['', '', '', '', '', '', '', '', ''];
  jelenlegi = 'X';
  gameOver = false;
  gameStatus.textContent = '';
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o');
  });
};

twoPlayerButton.addEventListener('click', () => {
  onePlayerButton.disabled = false;
  twoPlayerButton.disabled = true;
  ujJatek();
});

onePlayerButton.addEventListener('click', () => {
  onePlayerButton.disabled = true;
  twoPlayerButton.disabled = false;
  ujJatek();
});

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});