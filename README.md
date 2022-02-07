# dropinTask

Delivery API

● POST /resolve-address - resolves a single line address into a structured address(See ‘Address’
model)
{
“searchTerm”: {SINGLE LINE ADDRESS}
}
● POST /timeslots - retrieve all available timeslots(See ‘Timeslot’ model) for a formatted address
{
“address”: {FORMATTED ADDRESS}
}
● POST /deliveries - book a delivery
{
“user”: {USER},
“timeslotId”: {TIMESLOT_ID}
}
● POST /deliveries/{DELIVERY_ID}/complete - mark a delivery as completed
● DELETE /deliveries/{DELIVERY_ID} - cancel a delivery
● GET /deliveries/daily - retrieve all today’s deliveries
● GET /deliveries/weekly - retrieve the deliveries for current week
