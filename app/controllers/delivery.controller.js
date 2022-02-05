const Mutex = require("async-mutex").Mutex;
const Delivery = require("../models/Delivery.model");
const deliveries = [];
const timeslots = [
  {
    x: "36.9170854",
    y: "-76.2497906",
    radius: 7,
    id: "gubu165",
    startTime: "Sat Feb 05 2022 16:21:28 GMT+0200",
    endTime: "Sat Feb 05 2022 21:21:28 GMT+0200",
    deliveries: [],
  },
];

const getAllTodayDeliveries = () => {
  let today = new Date();
  today = `${today.getFullYear()}-${today.getMonth()}-${today.getTime()}`;
  return deliveries.filter((delivery) => delivery.startTime.includes(today));
};
// is better to use 'moment.js' library?
const isDateInThisWeek = (date) => {
  const todayObj = new Date();
  const todayDate = todayObj.getDate();
  const todayDay = todayObj.getDay();

  // get first date of week
  const firstDayOfWeek = new Date(todayObj.setDate(todayDate - todayDay));

  // get last date of week
  const lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);

  // if date is equal or within the first and last dates of the week
  return date >= firstDayOfWeek && date <= lastDayOfWeek;
};
exports.bookDelivery = async (req, res) => {
  try {
    if (getAllTodayDeliveries.length > 10) return;
    const user = req.body.user;
    const timeslotID = req.body.timeslotId;
    const mutex = new Mutex();
    await mutex.runExclusive(async () => {
      let id = "3454v455r";
      const timeslotIndex = timeslots.findIndex(
        (timeslot) => timeslot.id === timeslotID
      );
      if (
        timeslotIndex === -1 ||
        timeslots[timeslotIndex].deliveries.length > 1
      ) {
        throw new Exception("insert diffrent timeslot");
      }
      /* Creating a list of timeslots for the day. */
      timeslots[timeslotIndex].deliveries.push(id);
      // console.log("timeslots", );
      // not working
      const delivery = new Delivery(id, "Pending", timeslots[timeslotIndex]);
      console.log(delivery, "del");

      deliveries = [...deliveries, delivery];
      console.log("delivery", delivery);
      res.send("ok");
      console.log("ok");
    });
  } catch (error) {
    res.send(error);
  }
};
exports.markDeliveryAsCompleted = (req, res) => {
  try {
    let delieveryIndex = deliveries.findIndex((delivery) => {
      delivery.id === req.params.DELIVERY_ID;
    });
    if (delieveryIndex !== -1) deliveries[delieveryIndex].status = "Completed";
    res.send("ok");
  } catch (error) {
    res.send(error);
  }
};
exports.cancelDelivery = (req, res) => {
  let delieveryIndex = deliveries.findIndex((delivery) => {
    delivery.id === req.params.DELIVERY_ID;
  });
  if (delieveryIndex === -1) return;
  //remove delievey from timeslots
  let timeslotID = deliveries[delieveryIndex].timeslot.id;
  let timeslotIndex = timeslots.findIndex(
    (timeslot) => timeslot.id === timeslotID
  );
  timeslots[timeslotIndex].deliveries = timeslots[
    timeslotIndex
  ].deliveries.filter(
    (delievery) => delievery.id !== deliveries[delieveryIndex].id
  );
  deliveries.splice(delieveryIndex, 1);
};
exports.getAllTodayDeliveries = (req, res) => {
  res.send(getAllTodayDeliveries());
};
exports.getAllWeekDeliveries = (req, res) => {
  res.send(
    deliveries.filter((delivery) => isDateInThisWeek(delivery.startTime))
  );
};
