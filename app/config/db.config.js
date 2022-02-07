class Database {
  constructor(deliveries = [], timeslots = [], addresses = []) {
    this.deliveries = deliveries;
    this.timeslots = timeslots;
    this.addresses = addresses;
  }
}

module.exports = Database;
