import express from 'express'
import { getGalleryItem, postGalleryItem } from '../controller/galleryItemsController.js';


const galleryItemRoute = express.Router();

galleryItemRoute.post("/",postGalleryItem)
galleryItemRoute.get("/",getGalleryItem)



export default galleryItemRoute;

