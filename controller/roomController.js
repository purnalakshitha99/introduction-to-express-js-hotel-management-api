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

