import express from 'express'
import { createCategory, getCategory ,findCategoryByName, deleteCategory, findCategory, deleteCategoryByParam,updateCategory} from '../controller/categoryController.js';

const categoryRoute = express.Router();

categoryRoute.post("/",createCategory);
categoryRoute.get("/",getCategory);
categoryRoute.get("/categoryByName",findCategoryByName);
categoryRoute.get("/:name",findCategory);
categoryRoute.delete("/",deleteCategory);
categoryRoute.delete("/:name",deleteCategoryByParam);
categoryRoute.put("/:name",updateCategory);


export default categoryRoute;