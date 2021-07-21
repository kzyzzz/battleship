/* eslint-disable */
import Ship from '../src/shipFactory'

describe('ShipFactory', () => {
  let testShip;
  beforeEach(() => {
    testShip = new Ship([11, 12, 13]);
  });
  test('is hit..', () => {
    testShip.hit(11);
    expect(testShip.hits).toEqual([11]);
  });
  test('multi hits', () => {
    testShip.hit(12);
    testShip.hit(11);
    expect(testShip.hits).toEqual([11, 12]);
  });
  test('is not sunk', () => {
    testShip.hit(12);
    expect(testShip.isSunk()).toBe(false);
  });
  test('is sunk', () => {
    testShip.hit(12);
    testShip.hit(11);
    testShip.hit(13);
    expect(testShip.isSunk()).toBe(true);
  });
});
