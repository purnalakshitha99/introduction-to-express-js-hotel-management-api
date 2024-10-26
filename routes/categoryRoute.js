import express from 'express'
import { createCategory, getCategory } from '../controller/categoryController.js';

const categoryRoute = express.Router();

categoryRoute.post("/",createCategory);
categoryRoute.get("/",getCategory);


export default categoryRoute;