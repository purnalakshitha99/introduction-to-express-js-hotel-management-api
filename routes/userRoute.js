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

export default userRouter;