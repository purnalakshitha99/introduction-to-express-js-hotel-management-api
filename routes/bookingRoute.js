import express from "express";
import { createBooking, getBookings } from "../controller/bookingController.js";

const bookingRoute = express.Router();

bookingRoute.post("/",createBooking);
bookingRoute.get("/",getBookings)


export default bookingRoute;