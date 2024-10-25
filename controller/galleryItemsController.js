
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