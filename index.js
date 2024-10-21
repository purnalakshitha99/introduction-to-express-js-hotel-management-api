import bodyParser from 'body-parser'
import express from 'express'
import userRouter from './routes/userRoute.js'



const app = express() 



app.use(bodyParser.json())  //middleware


const connectiionString = "mongodb+srv://tester2:123@cluster0.wd7xl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
app.use("/api/users",userRouter)



app.listen(5000,(req,res)=>{
    console.log("Server is Running on port 5000")
}); 




