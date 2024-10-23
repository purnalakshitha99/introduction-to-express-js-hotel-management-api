import bodyParser from 'body-parser'
import express from 'express'
import userRouter from './routes/userRoute.js'
import mongoose from 'mongoose'
import galleryItemRoute from './routes/galleryItemRoute.js'



const app = express() 



app.use(bodyParser.json())  //middleware


const connectiionString = "mongodb+srv://tester2:123@cluster0.wd7xl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

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




