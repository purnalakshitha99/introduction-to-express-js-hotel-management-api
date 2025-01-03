import express from 'express'
import { createRoom,deleteRoom,deleteRoomByParam,getRooms, updateRoom, roomById, getRoomByCategory  } from '../controller/roomController.js';

const roomRoute = express.Router();

roomRoute.post("/",createRoom);
roomRoute.get("/",getRooms);
roomRoute.delete("/",deleteRoom);
roomRoute.delete("/:id",deleteRoomByParam);
roomRoute.put("/:id",updateRoom);
roomRoute.get("/:id",roomById);//methanata danne api eha patthe controller eke param eka aran da ganna const eke name
roomRoute.get("/by-category/:category",getRoomByCategory);



export default roomRoute;