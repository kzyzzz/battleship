import {
  playerAttacking, gameLoop, render, renderFirstBoard, init, board1,
} from './game';

const randzShipsBtn = document.querySelector('.randomize-ships');
const rotateBtn = document.querySelector('.rotate-garage');
const gameDiv = document.querySelector('.game');
const prompt = document.querySelector('.prompt');
const firstBoard = document.querySelector('.first-board');
const drop = document.querySelector('.drop');
const popUpDiv = document.querySelector('.looser-winner');
const container = document.querySelector('.container');
const endGameMsg = document.querySelector('.endgame-msg');

const addDropEvent = () => {
  firstBoard.ondrop = (ev) => {
    ev.preventDefault();
    const length = parseInt(ev.dataTransfer.getData('length'), 10);
    const index = parseInt(ev.target.className.match(/\d+/)[0], 10);
    const orientation = ev.dataTransfer.getData('orientation');
    if (board1.placeShip(index, length, orientation)) {
      renderFirstBoard();
      board1.garage.splice(board1.garage.indexOf(length), 1);
      removeFromGarage(length);
      if (board1.garage.length === 0) startGame();
    }
  };
  firstBoard.ondragover = (ev) => {
    ev.preventDefault();
  };
};
const removeFromGarage = (length) => {
  let childToRemove = false;
  drop.childNodes.forEach((node) => {
    if (node.classList.contains(`length-${length}`)) {
      childToRemove = node;
    }
  });
  if (childToRemove) drop.removeChild(childToRemove);
};
const renderGarage = () => {
  drop.innerHTML = '';
  drop.style.flexDirection = 'column';
  board1.garage.forEach((ship) => {
    const shipDiv = document.createElement('div');
    shipDiv.classList.add('ship');
    shipDiv.classList.add('ship-garage');
    shipDiv.classList.add(`length-${ship}`);
    shipDiv.style.flexDirection = 'row';
    shipDiv.draggable = 'true';
    for (let i = 0; i < ship; i += 1) {
      shipDiv.innerHTML += '<div class=\'ship-slot\'></div>';
    }
    shipDiv.ondragstart = (ev) => {
      const length = parseInt(ev.target.className.match(/\d+/)[0], 10);
      ev.dataTransfer.setData('length', length);
      const orientation = (ev.target.style.flexDirection === 'row') ? 'x' : 'y';
      ev.dataTransfer.setData('orientation', orientation);
    };
    drop.appendChild(shipDiv);
  });
};

const loadPage = () => {
  init();
  renderFirstBoard();
  renderGarage();
  addDropEvent();
  addBtnEvents();
  changePrompt('Place your ships..');
};

const addBtnEvents = () => {
  randzShipsBtn.addEventListener('click', () => {
    board1.randomiseShips();
    startGame();
  });
  rotateBtn.addEventListener('click', () => {
    rotateGarage();
  });
};

const startGame = () => {
  gameDiv.removeChild(document.querySelector('.garage'));
  const secondBoard = document.createElement('div');
  secondBoard.classList.add('second-board');
  gameDiv.appendChild(secondBoard);
  render();
  addAttackEvents();
  changePrompt('Make your move..');
};

const rotateGarage = () => {
  if (drop.style.flexDirection === 'column') {
    drop.style.flexDirection = 'row';
    document.querySelectorAll('.ship-garage').forEach((ship) => {
      ship.style.flexDirection = 'column';
    });
  } else {
    drop.style.flexDirection = 'column';
    document.querySelectorAll('.ship-garage').forEach((ship) => {
      ship.style.flexDirection = 'row';
    });
  }
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

const changePrompt = (content) => {
  prompt.innerHTML = `${content}`;
};
const endGame = (message) => {
  container.style.filter = 'blur(2px)';
  popUpDiv.style.display = 'flex';
  endGameMsg.textContent = message;
};

export {
  randzShipsBtn, endGame, renderBoard, renderShips, addAttackEvents, changePrompt, loadPage,
};
