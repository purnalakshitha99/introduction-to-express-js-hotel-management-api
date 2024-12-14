
import GalleryItem from "../model/galleryItems.js";
import { isAdmin, isUserValid } from "./userController.js";

export function postGalleryItem(req, res) {

    const validAdmin = isAdmin(req, res)

    if (!validAdmin) {
        return
    }

    const galleryItems = req.body;
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
export function getGalleryItem(req, res) {

    GalleryItem.find().then(
        (galleryItemList) => {
            res.json({
                list: galleryItemList
            })
        }
    )
}

export function getGalleryItemByName(req, res) {

    const name = req.params.name;

    const validUser = isUserValid(req, res);

    if (!validUser) {
        return
    }

    GalleryItem.findOne({ name }).then(
        (galleryItem) => {
            if (!galleryItem) {
                return res.status(404).json(
                    {
                        message: "gallery item not found"
                    }
                )
            }
            return res.json({
                message: "Gallery item found",
                galleryItem: galleryItem
            })
        }
    ).catch(
        (err) => {
            return res.status(500).json({
                message: "internal server error",
                details: err.message
            })
        }
    )
}



export function deleteByName(req, res) {

    const name = req.params.name

    const validAdmin = isAdmin(req, res)

    if (!validAdmin) {
        return
    }

    GalleryItem.findOneAndDelete({ name }).then(
        (galleryItem) => {
            if (!galleryItem) {
                return res.status(404).json({
                    message: "Gallery item not found"
                })
            }
            return res.json({
                message: "Delete successfully"
            })
        }
    ).catch(
        (err) => {
            return res.status(500).json({
                message: "delete failed",
                details: err.message
            })
        }
    )
}

export function updateGalleryItem(req, res) {

    const name = req.params.name
    const updateData = req.body

    const validAdmin = isAdmin(req, res)

    if (!validAdmin) {
        return
    }

    GalleryItem.findOneAndUpdate({ name }, updateData, { new: true, runValidators: true }).then(
        (updateGalleryItem) => {
            if (!updateGalleryItem) {
                return res.status(404).json({
                    message: "Gallery item not found"
                })
            }
            return res.json({
                message: "Gallery Item found",
                updateData: updateGalleryItem
            })
        }

    ).catch(
        (err) => {
            return res.status(500).json({
                message: "Gallery Item update failed",
                details: err.message
            })
        }
    )
}