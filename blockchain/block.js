const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(timestamp, lasthash, hash, data) {
    this.timestamp = timestamp;
    this.lasthash = lasthash;
    this.hash = hash;
    this.data = data;
  }

  toString() {
    return `Block = 
            Timestamp = ${this.timestamp}
            lasthash = ${this.lasthash.substring(0, 10)}
            hash = ${this.hash.substring(0, 10)}
            data = ${this.data}`;
  }

  static genesis() {
    // Bloco usado para iniciar a blockchain
    return new this("Genesis time", "-----", "f1r57-h45h", []);
  }

  static mineBlock(lastBlock, data) {
    // usado para construir o primeiro bloco da blockchain
    const timestamp = Date.now();
    const lasthash = lastBlock.hash;
    const hash = Block.hash(timestamp, lasthash, data);

    return new this(timestamp, lasthash, hash, data);
  }

  static hash(timestamp, lasthash, data) {
    return SHA256(`${timestamp}${lasthash}${data}`).toString();
  }

  static blockHash(block) {
    const { timestamp, lasthash, data } = block;
    return Block.hash(timestamp, lasthash, data);
  }
}

module.exports = Block;
