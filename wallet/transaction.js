const ChainUtil = require("../chain-util");

class Transaction {
  constructor() {
    this.id = ChainUtil.id();
    this.input = null;
    this.outputs = [];
  }

  static newTransaction(sendrWallet, recipient, amount) {
    const transaction = new this();

    if (amount > sendrWallet.balance) {
      console.log(`Amount: ${amount} exceeds balance.`);
      return;
    }

    transaction.outputs.push(
      ...[
        {
          amount: sendrWallet.balance - amount,
          address: sendrWallet.publicKey,
        },
        { amount, address: recipient },
      ]
    );

    return transaction;
  }
}

module.exports = Transaction;
