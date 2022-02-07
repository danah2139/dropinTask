class Delivery {
  constructor(deliveryID, status, timeslotID, user) {
    this.deliveryID = deliveryID;
    this.status = status;
    this.timeslotID = timeslotID;
    this.user = user;
  }
}
module.exports = Delivery;
