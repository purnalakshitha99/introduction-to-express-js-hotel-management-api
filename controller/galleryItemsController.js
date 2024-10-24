
import GalleryItem from "../model/galleryItems.js";

export function postGalleryItem(req,res){

    const galleryItems = req.body
    console.log(galleryItems)
    
    const newGalleryItem = new GalleryItem(galleryItems);

    newGalleryItem.save().then(
        ()=>{
            console.log("gallery items creation suiccess")
            res.json({
                
                message : "gallery item creation succesfully"
            })
        }
    ).catch(
        (error)=>{
            
            res.status(500).json({
                error : "gallery item creation failed",
                message : error.message
            })
        }
    )

}


export function getGalleryItem(req,res){

    GalleryItem.find().then(
        (galleryItemList)=>{
            res.json({
                list:galleryItemList
            })
        }
    )
}