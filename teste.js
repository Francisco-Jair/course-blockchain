const Block = require("./block.js");

const block = new Block("1111", "12232321GGG", "777474HH", "100");
console.log(block.toString());
console.log(Block.genesis().toString());
const primeiroBloco = Block.mineBlock(Block.genesis(), "200");
console.log(primeiroBloco.toString());
