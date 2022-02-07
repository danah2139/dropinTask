require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Dropit application." });
});

require("./initilizeCourierApi");

const addressRouter = require("./app/routes/address.router");
const deliveryRouter = require("./app/routes/delivery.router");
const timeslotRouter = require("./app/routes/timeslot.router");

app.use("", addressRouter);
app.use("/deliveries", deliveryRouter);
app.use("/timeslots", timeslotRouter);

// const db = require("./app/models");
// db.sequelize.sync();

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
