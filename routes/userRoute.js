import bodyParser from 'body-parser'
import express from 'express'

const userRouter = express.Router();


//user get part
userRouter.get("/",(req,res)=>{

    res.json({
        message : "user get request"
    })
})


//user post part
userRouter.post("/",(req,res)=>{

    const name = req.body.name;

    res.json({
        message : "user post request",
        name : name
    })
})


//user update part
userRouter.put("/",(req,res)=>{

    res.json({
        message : "user put request "
    })
})


//user delete part
userRouter.delete("/",(req,res)=>{

    res.json({
        message : "user delete request"
    })
})

export default userRouter;