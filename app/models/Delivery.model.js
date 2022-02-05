const { Timeslot } = require("./Timeslot.model");

class Delivery extends Timeslot{
    constructor(id,status,...items){
        super(...items);
        this.id = id;
        this.status = status;

    }

}
module.exports = {Delivery}