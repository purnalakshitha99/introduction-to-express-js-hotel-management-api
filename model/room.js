import mongoose from "mongoose";

const roomSchema = mongoose.Schema(
    {
       roomId : {
        type : Number,
        required : true,
        unique : true
       },

       category : {
        type : String,
        required : true
       },

       maxGuests : {
        type : Number,
        required : true
       },

       available : {
        type : Boolean,
        required : true,
        default : true
       },

       photos : [
        {
            type : String
        }
       ],

       specialDescription : {
        type : String,
        default : ""
       },

       notes : {
        type : String,
        default : ""
       }
        
    }
)


const Room = roomSchema.model("rooms",roomSchema);

export default Room;