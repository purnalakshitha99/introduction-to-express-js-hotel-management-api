
import User from '../model/user.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export function postUser(req, res) {
    const user = req.body;
    console.log("User data received:", user);

    const saltRounds = 10;
    const plainTextPassword = user.password;

    // Hash the password and wait for it to finish
    bcrypt.hash(plainTextPassword, saltRounds, (err, hashedPassword) => {
        if (err) {
            console.error("Error hashing password:", err);
            return res.status(500).json({
                message: "Password hashing failed",
                details: err.message
            });
        }

        // Set the hashed password
        user.password = hashedPassword;
        console.log("Hashed password:", user.password);

        // Create a new user with the hashed password
        const newUser = new User(user);

        // Save the new user to the database
        newUser.save()
            .then(() => {
                console.log("User created successfully:", user.email);
                res.json({
                    message: "User created successfully"
                });
            })
            .catch((error) => {
                console.error("Error saving user:", error);
                res.status(500).json({
                    message: "User creation failed",
                    details: error.message
                });
            });
    });
}

export function loginUser(req, res) {

    const credential = req.body

    console.log("credential password : "+credential.password)



    User.findOne({ email: credential.email }).then(
        (user) => {
            if (user == null) {

                res.status(404).json(
                    {
                        message: "User not found"
                    }
                )
            } else {

                console.log("user password in db : ",user.password)

                const isPasswordValid = bcrypt.compare(credential.password, user.password);  //methanadi api dena password eka automa hash karagena user password ekth ekka compaire karala harida balayi

                if (!isPasswordValid) {

                    return res.status(403).json({
                        message: "Incorrect Password"
                    })
                } else {
                    const payload = {
                        id: user._id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        type: user.type
                    }

                    const token = jwt.sign(payload, "secret", { expiresIn: "24h" });

                    return res.json({
                        message: "user found",
                        user: user,
                        token: token
                    })

                }

            }


        }
    )
}

export function getUser(req, res) {

    const user = req.body.user
    console.log(user)

    if(user == null){
        return res.status(404).json({
            message : "user not found"
        })
    }

    if(user.type != "admin"){
        return res.status(403).json({
            message : "only admin can get users"
        })
    }

    console.log("get user")
    User.find().then(
        (userList) => {

            res.json({
                list: userList
            })
        }
    ).catch(
        (error) => {
            res.json({
                message: "get failed",
                details: error.message
            })
        }
    )
}


export function updateUser(req, res) {

    res.json({
        message: "user update request"
    })

}

export function deleteUser(req, res) {

    const email = req.body.email;

    User.deleteOne({ email: email }).then(
        () => {
            res.json(
                {
                    message: "user delete successfully"

                }
            )
        }
    ).catch(
        () => {
            res.json({
                message: "user delete failed"
            })
        }
    )
}