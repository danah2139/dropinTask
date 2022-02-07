const getGeo = require("../services/getAddressFromGoogleAPI");

exports.findGeoLocation = async (req, res) => {
  if (!req.body.searchTerm) {
    res.status(400).send({
      message: "searchTerm can not be empty!",
    });
    return;
  }
  res.send(await getGeo(req.body.searchTerm));
  return;
};
