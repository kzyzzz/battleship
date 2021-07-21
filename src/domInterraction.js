import { board2, gameLoop } from './game';

const startGameBtn = document.querySelector('.start-game');

const placeEvents = () => {
  startGameBtn.addEventListener('click', () => {
    gameLoop();
  });
};

const addAttackEvents = () => {
  const enemyBoard = document.querySelector('.second-board');
  const enemyBoardDivs = enemyBoard.querySelectorAll('.gameboard-slot');
  for (let i = 0; i < enemyBoardDivs.length; i += 1) {
    enemyBoardDivs[i].addEventListener('click', () => {
      board2.receiveAttack(i);
      gameLoop();
    });
  }
};

const renderBoard = (gameBoard, parentClass) => {
  const parent = document.querySelector(parentClass);
  let grid = '';
  for (let i = 0; i < gameBoard.board.length; i += 1) {
    grid += `<div class='gameboard-slot shot-${gameBoard.board[i].isShot} box-id-${i}'></div>`;
  }
  parent.innerHTML = grid;
};

export {
  startGameBtn, renderBoard, placeEvents, addAttackEvents,
};
