/* eslint-disable */
import Gameboard from '../src/gameboardFactory';

describe('Gameboard facroty...', () => {
    let testBoard;
    beforeEach(() => {
        testBoard = new Gameboard();
    });
    test('board is blank', () => {
        expect(testBoard.board.every((b) => b.isShot == false)).toBe(true);
    });
    test('ship placement', () => {
        testBoard.placeShip(0, 3, 'x');
        expect(testBoard.ships.some((ship) => ship.position.toString() == [0, 1, 2])).toBe(true);
    });
    test('receive attack', () => {
        testBoard.placeShip(0, 3, 'x');
        testBoard.receiveAttack(1);
        expect(testBoard.ships.some((ship) => ship.hits.indexOf(1) > -1)).toBe(true);
    });
    test('all ships sunk', () => {
        testBoard.placeShip(0, 3, 'x');
        expect(testBoard.isAllSunk()).toBe(false);
    });
    test('receive attack and miss', () => {
        testBoard.receiveAttack(1, 0);
        expect(testBoard.board[1].isShot).toBe('miss');
    });
});