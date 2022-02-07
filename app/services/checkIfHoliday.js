// const HolidayAPI = require('holidayapi');
const axios = require("axios");

// const holidayApi = new HolidayAPI.HolidayAPI({ key });

const checkIfHoliday = async (country, year, month, day) => {
  console.log("check if holiday");
  const { data } = await axios.get("https://holidayapi.com/v1/holidays", {
    params: {
      public: "true",
      country,
      year,
      month,
      day,
      key: process.env.HOLIDAY_API_KEY,
    },
  });
  console.log(data.holidays);
  return data.holidays.length > 0;
};
module.exports = { checkIfHoliday };

//  checkIfHoliday('US',2021,2,5);
