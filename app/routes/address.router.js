const addresses = require("../controllers/address.controller.js");

const router = require("express").Router();

// resolve address
router.post("/resolve-address", addresses.findGeoLocation);

module.exports = router;
