import Ship from './shipFactory';

class Gameboard {
  constructor() {
    this.ships = [];
    this.board = [];
    for (let i = 0; i < 100; i += 1) {
      this.board.push({ isShot: false });
    }
  }

  placeShip(index, length, orientarion) {
    const position = [];
    let increment;
    for (let i = 0; i < length; i += 1) {
      increment = (orientarion === 'x') ? index + i : index + 10 * i;
      position.push(increment);
    }
    const newShip = new Ship(position);
    this.ships.push(newShip);
  }

  receiveAttack(index) {
    this.board[index].isShot = 'miss';
    this.ships.forEach((ship) => {
      if (ship.position.indexOf(index) > -1) {
        ship.hit(index);
        this.board[index].isShot = 'hit';
      }
    });
  }

  isAllSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}

export default Gameboard;
