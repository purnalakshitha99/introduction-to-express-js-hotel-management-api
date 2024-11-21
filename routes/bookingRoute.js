import express from "express";
import { createBooking, getBookings, getUserSpecificBookings, updateStatus } from "../controller/bookingController.js";

const bookingRoute = express.Router();

bookingRoute.post("/",createBooking);
bookingRoute.get("/",getBookings);
bookingRoute.get("/userSpecific",getUserSpecificBookings);
bookingRoute.put("/updateStatus/:bookingId",updateStatus)


export default bookingRoute;