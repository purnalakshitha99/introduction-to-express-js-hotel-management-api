import express from 'express'

const userRouter = express.Router()

userRouter.get("/users",(req,res)=>{

    res.json({
        message : "user get request"
    })
})