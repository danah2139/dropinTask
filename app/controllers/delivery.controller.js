const Mutex = require("async-mutex").Mutex;
const Delivery = require("../models/Delivery.model");
const db = require("../models/index");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
const mutex = new Mutex();

const getAllTodayDeliveries = () => {
  let today = moment();
  return db.deliveries.filter((delivery) =>
    today.isSame(moment(delivery.startTime), "day")
  );
};

exports.bookDelivery = async (req, res) => {
  try {
    const user = req.body.user;
    const timeslotID = req.body.timeslotId;
    if (!user || !timeslotID) {
      throw new Error("please insert fields");
    }
    await mutex.runExclusive(async () => {
      const deliveryID = uuidv4();
      if (getAllTodayDeliveries.length > 10) {
        throw new Error("can not delivery today");
      }
      console.log(db.timeslots);

      const timeslotIndex = db.timeslots.findIndex(
        (timeslot) => timeslot.timeslotID === timeslotID
      );
      if (
        timeslotIndex === -1 ||
        db.timeslots[timeslotIndex].deliveries.length > 1
      ) {
        throw new Error("please insert new timeslot");
      }
      db.timeslots[timeslotIndex].deliveries.push(deliveryID);
      const delivery = new Delivery(deliveryID, "Pending", timeslotID, user);
      db.deliveries.push(delivery);
      res.send({ status: `delievery booked ${deliveryID}` }); //deliveryID => just for testing
    });
  } catch (error) {
    console.log(error, "error");
    res.status(400).send(error.message);
    return;
  }
};
exports.markDeliveryAsCompleted = (req, res) => {
  try {
    let delieveryIndex = db.deliveries.findIndex(
      (delivery) => delivery.deliveryID === req.params.DELIVERY_ID
    );
    if (delieveryIndex === -1) {
      throw new Error("delivery not exist");
    }
    db.deliveries[delieveryIndex].status = "Completed";
    console.log("mark", db.deliveries);
    res.send({ message: "delivery completed" });
    return;
  } catch (error) {
    res.status(400).send(error.message);
    return;
  }
};
exports.cancelDelivery = async (req, res) => {
  try {
    console.log(db.deliveries, db.timeslots);
    console.log(req.params.DELIVERY_ID, "params");
    let delieveryIndex = db.deliveries.findIndex(
      (delivery) => delivery.deliveryID === req.params.DELIVERY_ID
    );
    console.log(delieveryIndex);
    if (delieveryIndex === -1) {
      throw new Error("delivery not exist");
    }
    await mutex.runExclusive(async () => {
      //remove delievey from timeslots
      let timeslotID = db.deliveries[delieveryIndex].timeslotId;
      let timeslotIndex = db.timeslots.findIndex(
        (timeslot) => timeslot.id === timeslotID
      );
      db.timeslots[timeslotIndex].deliveries = db.timeslots[
        timeslotIndex
      ].deliveries.filter(
        (delievery) => delievery !== db.deliveries[delieveryIndex].deliveryID
      );
      db.deliveries.splice(delieveryIndex, 1);
    });
    res.send({ message: "delivery canceled" });
    return;
  } catch (error) {
    res.status(400).send(error.message);
    return;
  }
};
exports.getAllTodayDeliveries = (req, res) => {
  res.send(getAllTodayDeliveries());
  return;
};
exports.getAllWeekDeliveries = (req, res) => {
  const now = moment();
  res.send(
    db.deliveries.filter(
      (delivery) => moment(delivery.startTime).isoWeek() === now.isoWeek()
    )
  );
  return;
};
