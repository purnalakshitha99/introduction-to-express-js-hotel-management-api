import bodyParser from 'body-parser'
import express from 'express'
import userRouter from './routes/userRoute.js'
import mongoose from 'mongoose'
import galleryItemRoute from './routes/galleryItemRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import roomRoute from './routes/roomRoute.js'
import jwt, { decode } from "jsonwebtoken"
import dotenv from 'dotenv';
import bookingRoute from './routes/bookingRoute.js'
dotenv.config();


const app = express()

app.use(bodyParser.json())  //middleware


const connectiionString = process.env.MONGO_URL;


console.log("Mongo URL:", connectiionString);

//authentication middleware
app.use((req, res, next) => {

    const token = req.header("Authorization")?.replace("Bearer ", "");  //methanadi authentication header ekak thiyen req ekaka Bearer kotasa iwath kara ithuru kalla const token ekata replace kara gani

    if (token != null) {


        jwt.verify(token, process.env.JWT_KEY, (err, decode) => {

            //check the token valid
            if (err) {
                return res.status(403).json({
                    details: "jwt token error",
                    Message: err.message
                })
            }

            if (decode != null) {
                req.user = decode
                console.log("decode below")
                console.log(decode)
                next()
            }
        })
    } else {
        next()
    }

});


mongoose.connect(connectiionString).then(
    () => {
        console.log("connect to the database")
    }
).catch(
    () => {
        console.log("connection failed")
    }
)

app.use("/api/users", userRouter)
app.use("/api/galleryItems", galleryItemRoute)
app.use("/api/category", categoryRoute)
app.use("/api/room", roomRoute)
app.use("/api/booking", bookingRoute)

app.listen(5000, (req, res) => {
    console.log("Server is Running on port 5000")
});




