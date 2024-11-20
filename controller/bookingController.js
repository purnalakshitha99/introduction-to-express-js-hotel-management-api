import Booking from "../model/booking.js";

export function createBooking(req,res){

    var startingId = 1000;

    Booking.countDocuments({}).then(
        (count)=>{
            console.log(count);
        }
    )
}