
import GalleryItem from "../model/galleryItems.js";

export function postGalleryItem(req,res){

    const galleryItems = req.body
    console.log(galleryItems)
    
    const newGalleryItem = new GalleryItem(galleryItems);

    newGalleryItem.save().then(
        ()=>{
            console.log(galleryItems)
            res,json({
                
                message : "gallery item creation succesfully"
            })
        }
    ).catch(
        ()=>{
            res.json({
                error : "gallery item creation failed"
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