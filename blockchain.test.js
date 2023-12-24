const Block = require("./block.js");
const Blockchain = require("./blockchain.js");

describe("Blockchain", () => {
  let bc;

  beforeEach(() => {
    bc = new Blockchain();
  });

  it("starts with genesis block", () => {
    expect(bc.chain[0]).toEqual(Block.genesis());
  });

  it("adds a new block", () => {
    const data = "index.html";
    bc.addBlock(data);

    expect(bc.chain[bc.chain.length - 1].data).toEqual(data);
  });
});
