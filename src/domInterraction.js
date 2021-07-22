import { playerAttacking, gameLoop, render } from './game';

const startGameBtn = document.querySelector('.start-game');

const placeEvents = () => {
  startGameBtn.addEventListener('click', () => {
    render();
    addAttackEvents();
    console.log('stat');
  });
};

const addAttackEvents = () => {
  const enemyBoard = document.querySelector('.second-board');
  enemyBoard.addEventListener('click', (e) => {
    const i = parseInt(e.target.className.match(/\d+/)[0], 10);
    if (playerAttacking(i)) {
      gameLoop();
    }
  });
};

const renderBoard = (gameBoard, parentClass) => {
  const parent = document.querySelector(parentClass);
  let grid = '';
  for (let i = 0; i < gameBoard.board.length; i += 1) {
    grid += `<div class='gameboard-slot shot-${gameBoard.board[i].isShot} box-id-${i}'></div>`;
  }
  parent.innerHTML = grid;
};

const renderShips = (gameBoard, parentClass) => {
  const parent = document.querySelector(parentClass);
  gameBoard.ships.forEach((ship) => {
    ship.position.forEach((coord) => {
      parent.querySelector(`.box-id-${coord}`).classList.add('ship');
    });
  });
};

export {
  startGameBtn, renderBoard, renderShips, placeEvents, addAttackEvents,
};
