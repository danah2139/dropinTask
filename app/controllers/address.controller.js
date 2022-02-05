const Address = require("../models/Address.model");
const getGeo = require('../services/getAddressFromGoogleAPI');

exports.findGeoLocation=async(req,res)=>{
    try {
        res.send(await getGeo(req.body.searchTerm));

    } catch (error) {
        res.send(error);
        
    }
    
}