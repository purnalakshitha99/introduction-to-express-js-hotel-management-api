import Room from "../model/room.js";
import { isAdmin, isUserValid } from "./userController.js";

export function createRoom(req, res) {

    const validUser = isUserValid(req, res)

    if (!validUser) {
        return
    }

    const room = req.body;
    console.log(room)

    const newRoom = new Room(room);

    newRoom.save().then(
        (room) => {
            console.log("room creation success")
            return res.json(
                {
                    message: "room creation Succuess",
                    room: room
                }
            );
        }
    ).catch(
        (err) => {
            console.log("room creation failed")
            return res.status(500).json({
                message: "room creation failed",
                err: err.message
            });
        }
    )
}

export function roomById(req, res) {

    const id = req.params.id;
    console.log("room id : " + id)

    Room.findOne({ roomId: id }).then(
        (result) => {
            console.log("result : " + result)
            if (!result) {
                return res.status(404).json({
                    message: "room not found"
                })
            }
            return res.json({
                message: "room found",
                result: result
            })
        }
    ).catch(
        (err) => {
            return res.status(500).json({
                message: "failed to find",
                detais: err.message
            })
        }
    )
}

export function getRooms(req, res) {

    const validUser = isUserValid(req, res)

    if (!validUser) {
        return
    }

    Room.find().then(
        (roomList) => {

            if (roomList.length === 0) {
                return res.status(404).json(
                    {
                        message: "Room empty"
                    }
                )
            }
            res.json({
                message: "Rooms Found",
                roomList: roomList
            })
        }
    )
}


export function deleteRoom(req, res) {

    const id = req.body.id

    console.log(id)

    const isValid = isAdmin(req, res)

    if (!isValid) {
        return
    }


    Room.deleteOne({ roomId: id }).then(
        (room) => {
            console.log(room)
            if (!room) {
                return res.status(404).json({
                    message: "Room not found"
                })
            }
            return res.json({
                message: "Delete successfully"
            })
        }
    ).catch(
        (err) => {
            return res.status(500).json({
                message: "delete failed from internal error",
                details: err.message
            })
        }
    )
}

export function deleteRoomByParam(req, res) {

    const id = req.params.id;

    const isValid = isAdmin(req, res)

    if (!isValid) {
        return
    }

    Room.findOneAndDelete({ roomId: id }).then(
        (room) => {
            if (!room) {
                return res.status(404).json({
                    message: "Room Not Found"
                })
            }
            return res.json({
                message: "Room found and Delete successfully"
            })
        }
    ).catch(
        (err) => {
            return res.status(500).json({
                message: "Room Deleted Failed"
            })
        }
    )
}



export function updateRoom(req, res) {

    const id = req.params.id
    const isValid = isAdmin(req, res)

    if (!isValid) {
        return
    }
    Room.updateOne({ roomId: id }, req.body).then(
        (result) => {

            if (result.matchedCount === 0) {
                return res.status(404).json({
                    message: "Room not found"
                });
            }
            if (result.modifiedCount === 0) {
                return res.status(404).json({
                    message: "no changes made to the room"
                });
            }
            return res.json({
                message: "Update Successfully"
            })
        }
    ).catch(
        (err) => {
            return res.status(500).json({
                message: "failed the update"
            })
        }
    )

}

export function getRoomByCategory(req, res) {

    const category = req.params.category;

    Room.find({ category: category }).then(
        (category) => {
            console.log("inside category : " + category)
            if (category.length == 0) {
                return res.status(404).json({
                    message: "Category Not Found"
                })
            }
            return res.json({
                message: "category found",
                category: category
            })
        }
    ).catch(
        (err) => {
            return res.status(500).json({
                message: "Find Failed",
                details: err.message
            })
        }
    )
}

