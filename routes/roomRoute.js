import express from 'express'
import { createRoom,getRooms } from '../controller/roomController.js';

const roomRoute = express.Router();

roomRoute.post("/",createRoom);
roomRoute.get("/",getRooms);



export default roomRoute;