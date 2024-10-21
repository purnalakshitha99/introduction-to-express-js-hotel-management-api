import bodyParser from 'body-parser'
import express from 'express'
import userRouter from './routes/userRoute.js'



const app = express() 

app.use(bodyParser.json())  //middleware

app.use("/users",userRouter)

app.listen(5000,(req,res)=>{
    console.log("Server is Running on port 5000")
});


