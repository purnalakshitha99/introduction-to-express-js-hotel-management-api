import mongoose from "mongoose"

const userSchema = mongoose.Schema()(
{
    email : {
        type : String,
        required : true,
        unique : true
    },
    firstName : {
        type : String
    },
    lastName : {
        type : String
    },
    image : {
        type : String,
        default : "https://img.freepik.com/free-psd/3d-rendering-avatar_23-2150833554.jpg?w=740&t=st=1729533773~exp=1729534373~hmac=aa2a6068b2d098f196a6f4fd00083305018cee5b86fa98aaca3ab1aa743bbc51"
    },
    password : {
        type : String,
        required : true
    }
}
)


export function getUser(req,res){

    res.json({
        message : "user get request"
    })
}


export function postUser(req,res){

    const user = req.body
    console.log(user)

    

    res.json({
        message : "user post request"
    })
}

export function updateUser(req,res){

    res.json({
        message : "user update request"
    })
}

export function deletUser(req,res){

    res.json({
        message : "user delete request"
    })
}