import Gameboard from './gameboardFactory';
import Player from './playerFactory';
// eslint-disable-next-line import/no-cycle
import {
  renderBoard, renderShips, loadPage, changePrompt, endGame
} from './domInterraction';

let board1 = new Gameboard();
let board2 = new Gameboard();

loadPage();

const player1 = new Player({ name: 'Player' });
const player2 = new Player({ name: 'CPU', playerType: 'AI' });

function init() {
  board1 = new Gameboard();
  board2 = new Gameboard();
  board2.randomiseShips();
}

async function gameLoop() {
  checkWinner();
  render();
  changePrompt('AI move..');
  await board1.aiMove();
  render();
  checkWinner();
  changePrompt('Your move..');
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

function renderFirstBoard() {
  renderBoard(board1, '.first-board');
  renderShips(board1, '.first-board');
}

function checkWinner() {
  if (board1.isAllSunk()) endGame('You loose..');
  if (board2.isAllSunk()) endGame('You Win!');
}

export { gameLoop, playerAttacking, render, renderFirstBoard, init, board1 };
