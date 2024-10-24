
import User from '../model/user.js'

export function getUser(req,res){
    console.log("get user")
    User.find().then(
    (userList)=>{

        res.json({
            list : userList
        })
    }
).catch(
    (error)=>{
        res.json({
            message : "get failed",
            details : error.message
        })
    }
)}


export function postUser(req,res){

    const user = req.body
    console.log(user)

    const newUser = new User(user); //collection eka use karala aluth user knk hada gannwa

    newUser.save().then(
        ()=>{
            console.log(user.email)
            console.log("user created succussfully")
            res.json({
                
                message : "user created succussfully"
            })
        }
    ).catch(
                (error)=>{
                    res.status(500).json({
                        message : "user creation failed",
                        details : error.message
                    })
                }
            )
    
}

export function loginUser(req,res){

    const credential = req.body

    User.findOne({email : credential.email, password : credential.password}).then(
        (user)=>{
            if(user == null){
                
                res.status(404).json(
                    {
                        message : "User not found"
                    }
                )
            }else{
                
                res.json({
                    message : "user found"
                })
            }
        }
    )
}

export function updateUser(req,res){

    res.json({
        message : "user update request"
    })

}

export function deleteUser(req,res){
    
    const email = req.body.email;

    User.deleteOne({email : email}).then(
        ()=>{
            res.json(
                {
                    message : "user delete successfully"

                }
            )
        }
    ).catch(
        ()=>{
            res.json({
                message : "user delete failed"
            })
        }
    )
}