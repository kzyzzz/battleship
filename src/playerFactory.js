class Player {
  constructor({ name, playerType = 'Human' }) {
    this.name = name;
    this.playerType = playerType;
  }

  async aiMove(rivalBoard) {
    await new Promise((resolve) => {
      setTimeout(() => resolve('Done'), 500);
    });

    let move = this.randomNumber(100);
    while (rivalBoard.board[move].isShot) {
      move = this.randomNumber(100);
    }
    return move;
  }

  randomNumber(max) {
    return Math.floor(Math.random() * max);
  }
}

export default Player;
