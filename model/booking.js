import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({

    bookingId: {
        type: String,
        required: true,
        unique: true
    },
    roomId : {
        type : Number,
        required : true
    },
    email: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "pending"
    },
    reason: {
        type: String,
        default: ""
    },

    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    notes : {
        type : String,
        default : ""
    },
    timeStamp : {
        type : Date,
        default : Date.now
    }
})

const Booking = mongoose.model("bookingShema",bookingSchema);

export default Booking;