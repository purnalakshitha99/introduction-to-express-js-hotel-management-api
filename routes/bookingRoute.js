import express from "express";
import { createBooking } from "../controller/bookingController.js";

const bookingRoute = express.Router();

bookingRoute.post("/",createBooking)


export default bookingRoute;