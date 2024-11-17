import Room from "../model/room.js";

export function createRoom(req,res){

    const user = req.body.user

    if (user == null) {
        return res.status(401).json({
            message: "Please login to create a room"
        });
    }

    if (user.type != "admin") {
        return res.status(403).json(
            {
                message: "cant access for create room"
            }
        )
    }

    const room = req.body;
    console.log(room)

    const newRoom = new Room(room);

    newRoom.save().then(
        (room)=> {
            console.log("room creation success")
            return res.json(
                {
                    message: "room creation Succuess",
                    room : room
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

export function getRooms(req,res){

    const user = req.body.user

    if (user == null) {
        return res.status(401).json({
            message: "Please login to create a room"
        });
    }


    Room.find().then(
        (roomList)=>{
            if(!roomList){
                return res.status(404).json(
                    {
                        message : "Room empty"
                    }
                )
            }
            res.json({
                message : "Rooms Found",
                roomList : roomList
            })
        }
    )
}


export function deleteRoom(req,res){

    const user = req.body.user
    const id = req.body.id

    console.log(id)

    if (user == null) {
        return res.status(401).json({
            message: "Authentication required to delete a room"
        });
    }

    if (user.type != "admin") {
        return res.status(403).json(
            {
                message: "Only admins can delete rooms"
            }
        )
    }


    Room.deleteOne({roomId : id}).then(
        (room)=>{
            console.log(room)
            if(!room){
                return res.status(404).json({
                    message : "Room not found"
                })
            }
            return res.json({
                message : "Delete successfully"
            })
        }
    ).catch(
        (err)=>{
            return res.status(500).json({
                message : "delete failed from internal error",
                details : err.message
            })
        }
    )
}

export function deleteRoomByParam(req,res){

    const id = req.params.id;
    const user = req.body.user;

    if(!user){

        return res.status(401).json({
            message : "Authentication required to delete a room"
        })
    }
    if(user.type != "admin"){

        console.log("********  "+user.type)
        return res.status(403).json({
            message : "Only admins can delete rooms"
        })
    }

    Room.findOneAndDelete({roomId : id}).then(
        (room)=>{
            if(!room){
                return res.status(404).json({
                    message : "Room Not Found"
                })
            }
            return res.json({
                message : "Room found and Delete successfully"
            })
        }
    ).catch(
        (err)=>{
            return res.status(500).json({
                message : "Room Deleted Failed"
            })
        }
    )
}

export function isAdminValid(req,res){

    const id = req.params.id;

    console.log("id is : "+id)
    const user = req.body.user;

    if(!user){

        return res.status(401).json({
            message : "authentication required"
        })
    }
    if(user.type != "admin"){

        console.log("********  "+user.type)
        return res.status(403).json({
            message : "Cant access for Doing the Task"
        })
    }

    return true
}


export function updateRoom(req,res){

    const adminValid = isAdminValid(req,res);
    const id = req.params.id;

    if(!adminValid){
        return res.status(403).json({
            message : "Unauthorized"
        })
    }

    Room.updateOne({roomId : id},req.body).then(
        (result)=>{
           
            if(result.matchedCount === 0){
                return res.status(404).json({
                    message: "Room not found"
                });
            }
            if(result.modifiedCount === 0){
                return res.status(404).json({
                    message: "no changes made to the room"
                });
            }
            return res.json({
                message : "Update Successfully"
            })
        }
    ).catch(
        (err)=>{
            return res.status(500).json({
                message : "failed the update"
            })
        }
    )

}