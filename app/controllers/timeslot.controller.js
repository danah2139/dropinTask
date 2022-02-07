const db = require("../models/index");

const isAddressInDistance = (address, clientAddress) => {
  let a = address.x - clientAddress.x;
  let b = address.y - clientAddress.y;
  return Math.sqrt(a * a + b * b) < address.radius;
};

exports.findAllAvailableTimeslots = (req, res) => {
  try {
    const clientAddress = req.body.address;
    if (!clientAddress) {
      throw Error("must contain address");
    }
    let address = {};
    const timeslotsFilter = db.timeslots
      .filter((timeslot) => {
        address = db.address.find(
          (address) => address.addressID === timeslot.addressID
        );
        if (timeslot.deliveries.length < 2) {
          return isAddressInDistance(
            {
              x: address.x,
              y: address.y,
              radius: timeslot.radius,
            },
            clientAddress
          );
        }
      })
      .map((timeslot) => {
        return { ...timeslot, ...address };
      });
    res.send(timeslotsFilter);
  } catch (error) {
    res.status(400).send(error.message);
    return;
  }
};
