import express from "express";
import { createBooking, getBookings, getUserSpecificBookings } from "../controller/bookingController.js";

const bookingRoute = express.Router();

bookingRoute.post("/",createBooking);
bookingRoute.get("/",getBookings);
bookingRoute.get("/userSpecific",getUserSpecificBookings)


export default bookingRoute;