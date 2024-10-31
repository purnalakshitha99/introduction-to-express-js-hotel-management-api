import express from 'express'
import { getGalleryItem, postGalleryItem, getGalleryItemByName, deleteByName,updateGalleryItem } from '../controller/galleryItemsController.js';


const galleryItemRoute = express.Router();

galleryItemRoute.post("/",postGalleryItem)
galleryItemRoute.get("/",getGalleryItem)
galleryItemRoute.get("/:name",getGalleryItemByName)
galleryItemRoute.delete("/:name",deleteByName)
galleryItemRoute.put("/:name",updateGalleryItem)



export default galleryItemRoute;

