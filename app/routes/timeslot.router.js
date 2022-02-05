const timeslots = require("../controllers/timeslot.controller.js");

const router = require("express").Router();

// retrieve all available timeslots(See ‘Timeslot’ model) for a formatted address
router.post("/", timeslots.findAllAvailableTimeslots);


module.exports = router;
