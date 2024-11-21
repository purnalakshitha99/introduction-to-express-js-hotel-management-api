import Booking from "../model/booking.js";
import { isCustomer } from "./userController.js";

export function createBooking(req,res){

    const validCustomer = isCustomer(req, res)

    if(!validCustomer){
        return
    }
    
  
    const startingId = 1200;

   

    Booking.countDocuments({}).then(
        (count)=>{
            console.log(count);
            const newId = "INV"+startingId+count;

            const newBooking = new Booking({
                bookingId : newId,
                roomId : req.body.roomId,
                email : req.body.email,
                startDate : req.body.startDate,
                endDate : req.body.endDate
            })

            newBooking.save().then(
                (result)=>{
                    return res.json({
                        message : "successfully saved"
                    })
                }
            ).catch(
                (err)=>{
                    res.status(500).json({
                        message : "booking failed",
                        details : err.message
                    })
                }
            )

        }
    )
}