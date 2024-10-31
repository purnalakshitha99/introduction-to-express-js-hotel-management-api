
import GalleryItem from "../model/galleryItems.js";

export function postGalleryItem(req, res) {
    const user = req.body.user;
     
    if (user == null) {
        return res.status(403).json({
            message: "Please login to create a gallery item"
        });
    }

    if(user.type != "admin"){
        return res.status(403).json(
            {
                message : "cant access for create item"
            }
        )
    }

    const galleryItems = req.body.item;
    console.log(galleryItems);

    const newGalleryItem = new GalleryItem(galleryItems);

    newGalleryItem.save()
        .then(() => {
            console.log("Gallery item creation success");
            return res.json({
                message: "Gallery item created successfully"
            });
        })
        .catch((error) => {
            console.error("Gallery item creation failed:", error);
            // Ensure no response was sent yet
            if (!res.headersSent) {
                return res.status(500).json({
                    error: "Gallery item creation failed",
                    message: error.message
                });
            }
        });
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

export function getGalleryItemByName(req,res){

    const name = req.params.name;
    const user = req.body.user;

    if(!user){
        return res.status(403).json({
            message : "please login"
        })
    }

    GalleryItem.findOne({name}).then(
        (galleryItem)=>{
            if(!galleryItem){
                return res.status(404).json(
                    {
                        message: "gallery item not found"
                    }
                )
            }
            return res.json({
                message : "Gallery item found",
                galleryItem : galleryItem
            })
        }
    ).catch(
        (err)=>{
            return res.status(500).json({
                message: "internal server error",
                details : err.message
            })
        }
    )
}

export function deleteByName(req,res){

    const name = req.params.name
    const user = req.body.user;
     
    if (user == null) {
        return res.status(403).json({
            message: "Please login to create a gallery item"
        });
    }

    if(user.type != "admin"){
        return res.status(403).json(
            {
                message : "cant access for create item"
            }
        )
    }

    GalleryItem.findOneAndDelete({name}).then(
        (galleryItem)=>{
            if(!galleryItem){
                return res.status(404).json({
                    message : "Gallery item not found"
                })
            }
            return res.json({
                message : "Delete successfully"
            })
        }
    ).catch(
        (err)=>{
            return res.status(500).json({
                message : "delete failed",
                details : err.message
            })
        }
    )
}

export function updateGalleryItem(req,res){

    const name = req.params.name
    const user = req.body.user;
    const updateData = req.body
     
    if (user == null) {
        return res.status(403).json({
            message: "Please login to create a gallery item"
        });
    }

    if(user.type != "admin"){
        return res.status(403).json(
            {
                message : "cant access for create item"
            }
        )
    }

    GalleryItem.findOneAndUpdate({name},updateData,{new : true, runValidators : true}).then(
        (updateGalleryItem)=>{
            if(!updateGalleryItem){
                return res.status(404).json({
                    message : "Gallery item not found"
                })
            }
            return res.json({
                message : "Gallery Item found",
                updateData : updateGalleryItem
            })
        }
    
    ).catch(
        (err)=>{
            return res.status(500).json({
                message : "Gallery Item update failed",
                details : err.message
            })
        }
    )
}