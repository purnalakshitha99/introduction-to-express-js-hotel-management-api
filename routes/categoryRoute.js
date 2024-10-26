import express from 'express'
import { createCategory, getCategory ,findCategoryByName} from '../controller/categoryController.js';

const categoryRoute = express.Router();

categoryRoute.post("/",createCategory);
categoryRoute.get("/",getCategory);
categoryRoute.get("/",findCategoryByName);


export default categoryRoute;