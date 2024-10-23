import mongoose from "mongoose"

const userSchema = mongoose.Schema(
    {
        email : {
            type : String,
            required : true,
            unique : true
        },
        password : {
            type : String,
            required : true
        },
        firstName : {
            type : String,
            required : true,
        },
        password : {
            type : String,
            required : true
        },
        type : {
            type : String,
            required : true,
            default : "customer"
        },
        whatsapp : {
            type : Number,
            required : true
        },
        phoneNumber : {
            type : Number,
            required : true
        }
    }
    )
    
    //user kiyana collection ekata ara hada gaththa userSchema sturcture eka da gannawa
   const User = mongoose.model("users",userSchema)  

   export default User;

