// const { beforeEach } = require("node:test");
const Block = require("./block.js");

describe("Block", () => {
  beforeEach(() => {
    data = "index.html";
    lastBlock = Block.genesis();
    block = Block.mineBlock(lastBlock, data);
  });

  it("sets the `data` to match tha input", () => {
    expect(block.data).toEqual(data);
  });

  it("sets the `lasthash` to match the hash of the last block", () => {
    expect(block.lasthash).toEqual(lastBlock.hash);
  });
});
