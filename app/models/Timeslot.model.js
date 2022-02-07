const { Address } = require("./Address.model");

class Timeslot {
  constructor(
    timeslotID,
    startTime,
    endTime,
    radius,
    addressID,
    deliveries = []
  ) {
    this.timeslotID = timeslotID;
    this.startTime = startTime;
    this.endTime = endTime;
    this.radius = radius;
    this.addressID = addressID;
    this.deliveries = deliveries;
  }
}

module.exports = { Timeslot };
