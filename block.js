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
}

module.exports = Block;
