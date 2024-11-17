import express from 'express'
import { createRoom,deleteRoom,deleteRoomByParam,getRooms, updateRoom } from '../controller/roomController.js';

const roomRoute = express.Router();

roomRoute.post("/",createRoom);
roomRoute.get("/",getRooms);
roomRoute.delete("/",deleteRoom);
roomRoute.delete("/:id",deleteRoomByParam);
roomRoute.put("/:id",updateRoom)



export default roomRoute;