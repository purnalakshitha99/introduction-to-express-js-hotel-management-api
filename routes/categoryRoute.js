import express from 'express'
import { createCategory, getCategory ,findCategoryByName, deleteCategory} from '../controller/categoryController.js';

const categoryRoute = express.Router();

categoryRoute.post("/",createCategory);
categoryRoute.get("/",getCategory);
categoryRoute.get("/",findCategoryByName);
categoryRoute.delete("/",deleteCategory);


export default categoryRoute;