import Booking from "../model/booking.js";
import { isAdmin, isCustomer } from "./userController.js";

export function createBooking(req, res) {

    const validCustomer = isCustomer(req, res)

    if (!validCustomer) {
        return
    }

    const startingId = 1200;
//methana count docment kiyana eken booking schema eke thiyena row count eka enawa
    Booking.countDocuments({}).then(
        (count) => {
            console.log(count);
            const newId = "INV" + startingId + count;

            const newBooking = new Booking({
                bookingId: newId,
                roomId: req.body.roomId,
                email: req.user.email,
                startDate: req.body.startDate,
                endDate: req.body.endDate
            })

            newBooking.save().then(
                (result) => {
                    return res.json({
                        message: "successfully saved",
                        result: result
                    })
                }
            ).catch(
                (err) => {
                    res.status(500).json({
                        message: "booking failed",
                        details: err.message
                    })
                }
            )

        }
    )
}

export function getBookings(req, res) {

    const validAdmin = isAdmin(req, res);

    if (!validAdmin) {
        return
    }

    Booking.find().then(
        (bookings) => {
            if (bookings.length == 0) {
                return res.status(404).json({
                    message: "Booking is Empty"
                })
            }
            return res.json({
                message: "Booking found",
                bookings: bookings
            })
        }
    ).catch(
        (err) => {
            return res.status(500).json({
                message: "booking get failed",
                details: err.message
            })
        }
    )
}

export function getUserSpecificBookings(req,res){

    const email = req.body.user.email;
    console.log("usessr email : "+email)
    const validCustomer = isCustomer(req,res);

    if(!validCustomer){
        return
    }

    Booking.find({email:email}).then(
        (bookings)=>{
            if(bookings.length == 0){
                return res.status(404).json({
                    message : "Booking is empty"
                })
            }
            return res.json({
                message : "Booings Found",
                bookings : bookings
            })
        }
    ).catch(
        (err)=>{
            return res.status(500).json({
                message : "Bookings find failier",
                err : err.message
            })
        }
    )
}

export function updateStatus(req,res){

    const validAdmin = isAdmin(req,res);

    if(!validAdmin){
        return
    }

    const bookingId = req.params.bookingId
    const updateData = req.body;

    Booking.findOneAndUpdate({bookingId : bookingId},updateData,{new: true, runValidators: true}).then(
        (updatedBooking)=>{
            if(!updatedBooking){
                return res.status(404).json({
                    message : "not found"
                })
            }
            return res.json({
                message: "status updated",
                updatedBooking : updatedBooking
            })
        }
    ).catch(
        (err)=>{
            return res.status(500).json({
                message : "updated failier"
            })
        }
    )
}