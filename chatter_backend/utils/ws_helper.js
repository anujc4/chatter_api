class Clients {
  constructor() {
    this.clientsList = {};
    this.saveClient = this.saveClient.bind(this);
  }

  find(id) {
    console.log("CURRENT CLIENTS", Object.keys(this.clientsList));
    return this.clientsList[id];
  }

  saveClient(id, client) {
    console.log("Saving client", id);
    this.clientsList[id] = client;
  }

  removeClient(id) {
    delete this.clientsList[id];
  }
}

module.exports = Clients;
