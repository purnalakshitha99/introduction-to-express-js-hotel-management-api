import express from 'express'
import { createRoom } from '../controller/roomController.js';

const roomRoute = express.Router();

roomRoute.post("/",createRoom);


export default roomRoute;