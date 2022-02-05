const { Address } = require("./Address.model");
const {checkIfHoliday} = require('../services/checkIfHoliday');

class Timeslot extends Address{
    constructor(id,startTime,endTime,x,y,radius){
        super(x,y,radius);
        this.id =id;
        this.startTime =startTime;
        this.endTime = endTime;
        this.deliveries=[];
    }

    checkIfTimeslotApproval(){
        return checkIfHoliday();

    }


    
}

module.exports = {Timeslot};
