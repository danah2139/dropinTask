const axios= require('axios');
const getGeoCodeFromAddress=async(address)=>{
    try {
        const {data} = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GEOCODE_API_KEY}`)
        const latitude = data.results[0].geometry.location.lat;
        const longitude = data.results[0].geometry.location.lng;
        return [latitude,longitude];
        
    } catch (error) {
        return error
    }

};
module.exports=getGeoCodeFromAddress;

// console.log(getGeoCodeFromAddress('New York'));