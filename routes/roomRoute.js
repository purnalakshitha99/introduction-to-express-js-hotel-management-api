import express from 'express'
import { createRoom,deleteRoom,getRooms } from '../controller/roomController.js';

const roomRoute = express.Router();

roomRoute.post("/",createRoom);
roomRoute.get("/",getRooms);
roomRoute.delete("/",deleteRoom);



export default roomRoute;