class Ship {
  constructor(position) {
    this.position = position;
    this.hits = [];
  }

  hit(index) {
    this.hits.push(index);
    this.hits.sort((a, b) => a - b);
  }

  isSunk() {
    return (this.position.length === this.hits.length);
  }
}

export default Ship;
