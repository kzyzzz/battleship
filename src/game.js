import Gameboard from './gameboardFactory';
import Player from './playerFactory';
// eslint-disable-next-line import/no-cycle
import { renderBoard, renderShips, placeEvents } from './domInterraction';

const board1 = new Gameboard();
board1.randomiseShips();
const player1 = new Player({ name: 'Player' });

const board2 = new Gameboard();
board2.placeShip(10, 3, 'y');
board2.placeShip(12, 3, 'x');

const player2 = new Player({ name: 'CPU', playerType: 'AI' });

placeEvents();

async function gameLoop() {
  checkWinner();
  render();
  await board1.aiMove();
  render();
  checkWinner();
}

function playerAttacking(index) {
  if (board2.board[index].isShot === false) {
    board2.receiveAttack(index);
    return true;
  }
  return false;
}

function render() {
  renderBoard(board1, '.first-board');
  renderShips(board1, '.first-board');
  renderBoard(board2, '.second-board');
}

function checkWinner() {
  if (board1.isAllSunk() || board2.isAllSunk()) console.log('Winner');
}

export { gameLoop, playerAttacking, render };
