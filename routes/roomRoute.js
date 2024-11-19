import express from 'express'
import { createRoom,deleteRoom,deleteRoomByParam,getRooms, updateRoom,roomById } from '../controller/roomController.js';

const roomRoute = express.Router();

roomRoute.post("/",createRoom);
roomRoute.get("/",getRooms);
roomRoute.delete("/",deleteRoom);
roomRoute.delete("/:id",deleteRoomByParam);
roomRoute.put("/:id",updateRoom);
roomRoute.get("/:id",roomById);



export default roomRoute;