import Gameboard from './gameboardFactory';
import Player from './playerFactory';
import { addAttackEvents, renderBoard } from './domInterraction';

const board1 = new Gameboard();
board1.placeShip(0, 3, 'y');
board1.placeShip(12, 3, 'x');
const player1 = new Player({ name: 'Player' });

const board2 = new Gameboard();
board2.placeShip(0, 3, 'y');
board2.placeShip(12, 3, 'x');
const player2 = new Player({ name: 'CPU', playerType: 'AI' });

async function gameLoop() {
  render();
  board1.receiveAttack(await player2.aiMove(board1));
  render();
  addAttackEvents();
  checkWinner();
}

function render() {
  renderBoard(board1, '.first-board');
  renderBoard(board2, '.second-board');
}

function checkWinner() {
  if (board1.isAllSunk() || board2.isAllSunk()) console.log('Winner');
}

export { gameLoop, board1, board2 };
