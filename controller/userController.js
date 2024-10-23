
import User from '../model/user.js'

export function getUser(req,res){

    User.find().then(
    (userList)=>{

        res.json({
            list : userList
        })
    }
)}


export function postUser(req,res){

    const user = req.body
    console.log(user)

    const newUser = new User(user); //collection eka use karala aluth user knk hada gannwa

    newUser.save().then(
        ()=>{
            console.log("user created succussfully")
            res.json({
                
                message : "user created succussfully"
            })
        }
    ).catch(
                ()=>{
                    res.json({
                        message : "user creation failed"
                    })
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