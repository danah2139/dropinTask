const db = require("../models/index");

const isAddressInDistance = (address, clientAddress) => {
  let a = address.lng - clientAddress.lng;
  let b = address.lat - clientAddress.lat;
  return Math.sqrt(a * a + b * b) < address.radius;
};

exports.findAllAvailableTimeslots = (req, res) => {
  try {
    const clientAddress = req.body.address;
    if (!clientAddress) {
      throw Error("must contain address");
    }
    let address;
    const timeslotsFilter = db.timeslots
      .filter((timeslot) => {
        address = db.addresses.find(
          (address) => address.addressID === timeslot.addressID
        );
        console.log(address, "address");
        if (timeslot.deliveries.length < 2) {
          return isAddressInDistance(
            {
              lat: address.lat,
              lng: address.lng,
              radius: timeslot.radius,
            },
            clientAddress
          );
        }
      })
      .map((timeslot) => {
        address = db.addresses.find(
          (address) => address.addressID === timeslot.addressID
        );
        return { ...timeslot, ...address };
      });
    res.send(timeslotsFilter);
  } catch (error) {
    res.status(400).send(error.message);
    return;
  }
};
