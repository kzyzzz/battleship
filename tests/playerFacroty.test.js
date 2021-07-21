/* eslint-disable */
import Gameboard from "../src/gameboardFactory";
import Player from "../src/playerFactory";

describe('Player factory...', () => {
    it('Player has a name', () => {
        const testPlayer = new Player({ name: 'Jack' });
        expect(testPlayer.name).toBe('Jack');
    });
    it('Player determined as human on default', () => {
        const testPlayer = new Player({ name: 'Jack' });
        expect(testPlayer.playerType).toBe('Human');
    });
    it('Is player determines as AI...', () => {
        let testBoard = new Gameboard();
        let testPlayer = new Player({ name: 'Jack' , playerType: 'AI'});
        expect(testPlayer.playerType).toBe('AI');
    });
    it('Ai makes a move..', () => {
        let testBoard = new Gameboard();
        let testPlayer = new Player({ name: 'Jack' , playerType: 'AI'});
        expect(testPlayer.aiMove(testBoard)).toBeLessThan(99);
    });
    it('Ai hits a target..and misses', () => {
        let testBoard = new Gameboard();
        let testPlayer = new Player({ name: 'Jack', playerType: 'AI'});
        testBoard.receiveAttack(testPlayer.aiMove(testBoard));

        expect(testBoard.board.some((b) => b.isShot)).toBe(true);
    });
});