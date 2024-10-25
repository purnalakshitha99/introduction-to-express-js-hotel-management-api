import bodyParser from 'body-parser'
import express from 'express'
import userRouter from './routes/userRoute.js'
import mongoose from 'mongoose'
import galleryItemRoute from './routes/galleryItemRoute.js'
import jwt, { decode } from "jsonwebtoken"
import e from 'express'



const app = express() 



app.use(bodyParser.json())  //middleware


const connectiionString = "mongodb+srv://tester2:123@cluster0.wd7xl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

//authentication middleware
app.use((req,res,next)=>{

    const token = req.header("Authorization")?.replace("Bearer ","");  //methanadi authentication header ekak thiyen req ekaka Bearer kotasa iwath kara ithuru kalla const token ekata replace kara gani

    if(token != null){

        jwt.verify(token,"secret",(err,decode)=>{

            if(decode != null){
                req.body.user = decode
                console.log(req.user)
                next()
            }
        })
    }
    
});

// app.use((req,res,next)=>{
    
//     const token = req.header("Authorization")?.replace("Bearer","");

//     if(token != null){
//         jwt.verify(token,"secret",(err,decode)=>{

//             if(decode != null){
//                 req.user = decode
//                 console.log(decode)
//                 next()
//             }
//         })
//     }
// })



mongoose.connect(connectiionString).then(
    ()=>{
        console.log("connect to the database")
    }
).catch(
    ()=>{
        console.log("connection failed")
    }
)


app.use("/api/users",userRouter)
app.use("/api/galleryItems",galleryItemRoute)



app.listen(5000,(req,res)=>{
    console.log("Server is Running on port 5000")
}); 




