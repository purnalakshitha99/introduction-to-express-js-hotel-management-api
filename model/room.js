import mongoose from "mongoose";

const roomSchema = mongoose.Schema(
    {
       roomId : {
        type : Number,
        required : true,
        unique : true
       }
        
    }
)