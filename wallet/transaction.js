const ChainUtil = require("../chain-util");

class Transaction {
  constructor() {
    this.id = ChainUtil.id();
    this.input = null;
    this.outputs = [];
  }

  update(sendrWallet, recipient, amount) {
    const sendrOutput = this.outputs.find(
      (output) => output.address === sendrWallet.publicKey
    );

    if (amount > sendrOutput.amount) {
      console.log(`Amount: ${amount} exceeds balance.`);
      return;
    }

    sendrOutput.amount = sendrOutput.amount - amount;

    this.outputs.push({ amount, address: recipient });

    Transaction.singTransaction(this, sendrWallet);

    return this;
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

    Transaction.singTransaction(transaction, sendrWallet);

    return transaction;
  }

  static singTransaction(transaction, senderWallet) {
    transaction.input = {
      timestamp: Date.now(),
      amount: senderWallet.balance,
      address: senderWallet.publicKey,
      signature: senderWallet.sign(ChainUtil.hash(transaction.outputs)),
    };
  }

  static verifyTransaction(transaction) {
    return ChainUtil.verifySignature(
      transaction.input.address,
      transaction.input.signature,
      ChainUtil.hash(transaction.outputs)
    );
  }
}

module.exports = Transaction;
