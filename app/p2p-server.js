const WebSocker = require("ws");
const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(",") : [];

class P2ppServer {
  constructor(blockchain) {
    this.blockchain = blockchain;
    this.socket = [];
  }

  listen() {
    const server = new WebSocker.Server({ port: P2P_PORT });
    server.on("connection", (socket) => this.connectSocket(socket));

    this.connectToPeers();

    console.log(`Listening for peer-to-peer connections on: ${P2P_PORT}`);
  }

  connectToPeers() {
    peers.forEach((peer) => {
      const socket = new WebSocker(peer);
      socket.on("open", () => this.connectSocket(socket));
    });
  }

  connectSocket(socket) {
    this.socket.push(socket);
    console.log("Socket connected");

    this.messageHandler(socket);
    this.sendChain(socket);
  }

  sendChain(socket) {
    socket.send(JSON.stringify(this.blockchain.chain));
  }

  messageHandler(socket) {
    socket.on("message", (message) => {
      const data = JSON.parse(message);
      this.blockchain.replaceChain(data);
    });
  }

  syncChain() {
    this.socket.forEach((socket) => this.sendChain(socket));
  }
}

module.exports = P2ppServer;
