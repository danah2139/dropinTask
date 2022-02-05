const deliveries = require("../controllers/delivery.controller");

const router = require("express").Router();

// book a delevery
router.post("/", deliveries.bookDelivery);
// mark a delivery as completed
router.post("/:DELIVERY_ID/complete",deliveries.markDeliveryAsCompleted);
// cancel a delivery
router.delete('/:DELIVERY_ID',deliveries.cancelDelivery);
// retrieve all today’s deliveries
router.get('/daily',deliveries.getAllTodayDeliveries);
// retrieve the deliveries for current week
router.get('/weekly',deliveries.getAllWeekDeliveries);

module.exports = router;

