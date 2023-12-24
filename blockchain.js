const Block = require("./block.js");

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock(data) {
    const lastBlock = this.chain[this.chain.length - 1];
    const block = Block.mineBlock(lastBlock, data);
    this.chain.push(block);

    return block;
  }

  isValidChain(chain) {
    // Verifica se o primeiro bloco da cadeia é o bloco genesis
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }

    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      const lastBlock = chain[i - 1];

      // Verifica se o lasthash do bloco atual é igual ao hash do bloco anterior
      // e verifica se o hash não está corrompido
      if (
        block.lasthash !== lastBlock.hash ||
        block.hash !== Block.blockHash(block)
      ) {
        return false;
      }
    }

    return true;
  }
}

module.exports = Blockchain;
