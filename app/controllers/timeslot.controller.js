const Timeslot = require("../models/Timeslot.model");
const timeslots = [
  {
    x: "36.9170854",
    y: "-76.2497906",
    radius: 7,
    id: "gubu165",
    startTime: "Sat Feb 05 2022 16:21:28 GMT+0200",
    endTime: "Sat Feb 05 2022 16:21:28 GMT+0200",
    deliveries: [],
  },
];

const isAddressInDistance = (address, clientAddress) => {
  let a = address.x - clientAddress.x;
  let b = address.y - clientAddress.y;
  return Math.sqrt(a * a + b * b) < address.radius;
};

exports.findAllAvailableTimeslots = (req, res) => {
  try {
    const clientAddress = req.body.address;
    const timeslotsFilter = timeslots.filter((timeslot) => {
      return (
        isAddressInDistance(
          { x: timeslot.x, y: timeslot.y, radius: timeslot.radius },
          clientAddress
        ) && timeslot.deliveries.length < 2
      );
    });
    res.send(timeslotsFilter);
  } catch (error) {
    res.send(error);
  }
};
