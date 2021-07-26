import Ship from './shipFactory';
import { randomNumber } from './functions';

class Gameboard {
  constructor() {
    this.ships = [];
    this.board = [];
    this.garage = [4, 3, 3, 2, 2];
    this.randomNumber = randomNumber;
    this.aiPrevHit = false;
    for (let i = 0; i < 100; i += 1) {
      this.board.push({ isShot: false });
    }
  }

  placeShip(index, length, orientarion) {
    const position = [];
    let increment;
    let accepted = false;
    for (let i = 0; i < length; i += 1) {
      increment = (orientarion === 'x') ? index + i : index + 10 * i;
      position.push(increment);
    }
    if (orientarion === 'x') {
      accepted = position.every((i) => (Math.floor(i / 10) === Math.floor(position[0] / 10)));
    }
    if (orientarion === 'y') {
      accepted = position.every((i) => i <= 99);
    }
    if (accepted) {
      accepted = this.ships.every((ship) => ship.position.every((pos) => (
        position.indexOf(pos) === -1)));
    }
    if (accepted) {
      const newShip = new Ship(position);
      this.ships.push(newShip);

      return true;
    }
    return false;
  }

  randomiseShips() {
    this.ships = [];
    let index = 0;
    let orientation = 'y';
    do {
      do {
        index = randomNumber(100);
        orientation = (randomNumber(2) === 0) ? 'x' : 'y';
      } while (!this.placeShip(index, this.garage[0], orientation));
      this.garage.shift();
    } while (this.garage.length > 0);
  }

  receiveAttack(index) {
    this.board[index].isShot = 'miss';
    this.ships.forEach((ship) => {
      if (ship.position.indexOf(index) > -1) {
        ship.hit(index);
        this.board[index].isShot = 'hit';
      }
    });
    return this.board[index].isShot;
  }

  async aiMove() {
    await new Promise((resolve) => {
      setTimeout(() => resolve('Done'), 500);
    });
    let move = 0;
    let niceMove = false;
    if (!(this.aiPrevHit === false)) {
      do {
        const dice = this.randomNumber(5);
        switch (dice) {
          case 0:
            move = this.aiPrevHit - 1;
            if ((Math.floor(move / 10) === Math.floor(this.aiPrevHit / 10)) && (
              move >= 0)) niceMove = true;
            break;
          case 1:
            move = this.aiPrevHit + 1;
            if ((Math.floor(move / 10) === Math.floor(this.aiPrevHit / 10)) && (
              move < 100)) niceMove = true;
            break;
          case 2:
            move = this.aiPrevHit - 10;
            if (move >= 0) niceMove = true;
            break;
          case 3:
            move = this.aiPrevHit + 10;
            if (move < 100) niceMove = true;
            break;
          default:
            move = this.randomNumber(100);
            niceMove = true;
            break;
        }
        if (niceMove) {
          if (this.board[move].isShot) niceMove = false;
        }
      } while (!niceMove);
    } else {
      move = this.randomNumber(100);
    }
    while (this.board[move].isShot) {
      move = this.randomNumber(100);
    }
    if (this.receiveAttack(move) === 'hit') {
      this.aiPrevHit = move;
    } else {
      this.aiPrevHit = false;
    }
  }

  isAllSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}

export default Gameboard;
