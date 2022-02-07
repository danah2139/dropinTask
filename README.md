# dropinTask

Delivery API

● POST /resolve-address - resolves a single line address into a structured address(See ‘Address’
model)
<br/>
{
<br/>
“searchTerm”: {SINGLE LINE ADDRESS}
<br/>
}
<br/>
● POST /timeslots - retrieve all available timeslots(See ‘Timeslot’ model) for a formatted address
<br/>
{
“address”: {FORMATTED ADDRESS}
}
<br/>

● POST /deliveries - book a delivery
{
“user”: {USER},
“timeslotId”: {TIMESLOT_ID}
}
<br/>

● POST /deliveries/{DELIVERY_ID}/complete - mark a delivery as completed
<br/>

● DELETE /deliveries/{DELIVERY_ID} - cancel a delivery
<br/>

● GET /deliveries/daily - retrieve all today’s deliveries
<br/>

● GET /deliveries/weekly - retrieve the deliveries for current week
<br/>
