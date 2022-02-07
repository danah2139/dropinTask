const fs = require("fs");
const checkIfHoliday = require("./app/services/checkIfHoliday");
const Timeslot = require("./app/models/Timeslot.model");
const Address = require("./app/models/Address.model");
const db = require("./app/models/index");
const { v4: uuidv4 } = require("uuid");

const loadJSON = () => {
  try {
    console.log("timeslots  load");
    const jsonString = fs.readFileSync("./courierAPI.json");
    const file = JSON.parse(jsonString);
    const timeslots = file["timeslots"];
    const addressID = uuidv4();

    timeslots.forEach((timeslot) => {
      if (
        !checkIfHoliday(timeslot.startTime) &&
        !checkIfHoliday(timeslot.endTime)
      ) {
        db.timeslots.push(
          new Timeslot(
            timeslot.id,
            timeslot.startTime,
            timeslot.endTime,
            timeslot.radius,
            addressID
          )
        );
        db.addresses.push(new Address(addressID, timeslot.lat, timeslot.lng));
      }
      console.log(db.timeslots);
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = loadJSON;
// loadJSON();
