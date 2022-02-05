const fs = require("fs");

const loadJSON = () => {
  try {
    const jsonString = fs.readFileSync("./courierAPI.json");
    const file = JSON.parse(jsonString);
    const timeslots = file["timeslots"];
  } catch (error) {
    console.log(error);
  }
};

module.exports = loadJSON;
// loadJSON();
