const fs = require("fs");
const checkIfHoliday = require("./app/services/checkIfHoliday");
const Timeslot = require("./app/models/Timeslot.model");
const Address = require("./app/models/Address.model");
const db = require("./app/models/index");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

(async () => {
  try {
    const jsonString = fs.readFileSync("./courierAPI.json");
    const file = JSON.parse(jsonString);
    const timeslots = file["timeslots"];
    let date;
    timeslots.forEach(async (timeslot) => {
      let addressID = uuidv4();
      date = moment(timeslot.startTime);
      if (
        !(await checkIfHoliday("IL", date.year(), date.month(), date.day()))
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
        // console.log(db.timeslots, "timeslots");
      }
    });
  } catch (error) {
    console.log(error);
  }
})();
