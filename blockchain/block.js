const SHA256 = require("crypto-js/sha256");

const { DIFFICULTY, MINE_RATE } = require("../config");

class Block {
  constructor(timestamp, lasthash, hash, data, nonce, difficulty) {
    this.timestamp = timestamp;
    this.lasthash = lasthash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty || DIFFICULTY; // Dificuldade da mineração
  }

  toString() {
    return `Block = 
            Timestamp = ${this.timestamp}
            Lasthash = ${this.lasthash.substring(0, 10)}
            Hash = ${this.hash.substring(0, 10)}
            Nonce = ${this.nonce}
            Difficulty = ${this.difficulty}
            Data = ${this.data}`;
  }

  static genesis() {
    // Bloco usado para iniciar a blockchain
    return new this("Genesis time", "-----", "f1r57-h45h", [], 0, DIFFICULTY);
  }

  static mineBlock(lastBlock, data) {
    let hash, timestamp;
    const lasthash = lastBlock.hash;
    let { difficulty } = lastBlock;
    let nonce = 0;

    do {
      nonce++;
      timestamp = Date.now();
      difficulty = Block.adjustDifficulty(lastBlock, timestamp); // Ajusta a dificuldade da mineração
      hash = Block.hash(timestamp, lasthash, data, nonce, difficulty);
    } while (hash.substring(0, difficulty) !== "0".repeat(difficulty));

    return new this(timestamp, lasthash, hash, data, nonce, difficulty);
  }

  static hash(timestamp, lasthash, data, nonce, difficulty) {
    return SHA256(
      `${timestamp}${lasthash}${data}${nonce}${difficulty}`
    ).toString();
  }

  static blockHash(block) {
    const { timestamp, lasthash, data, nonce, difficulty } = block;
    return Block.hash(timestamp, lasthash, data, nonce, difficulty);
  }

  static adjustDifficulty(lastBlock, currentTime) {
    let { difficulty } = lastBlock;
    difficulty =
      lastBlock.timestamp + MINE_RATE > currentTime
        ? difficulty + 1
        : difficulty - 1;

    return difficulty;
  }
}

module.exports = Block;
