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