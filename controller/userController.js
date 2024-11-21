
import User from '../model/user.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
dotenv.config()

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
                    message: "User created successfully",
                    res: newUser
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

    console.log("credential password : " + credential.password)



    User.findOne({ email: credential.email }).then(
        (user) => {
            if (user == null) {

                res.status(404).json(
                    {
                        message: "User not found"
                    }
                )
            } else {

                console.log("user password in db : ", user.password)

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

                    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "744h" });

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

    const validUser = isAdmin(req,res);

    if(!validUser){
        return
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

export function getUserByEmail(req, res) {

    const validUser = isUserValid(req,res);

    if(!validUser){
        return
    }

    const email = req.body.email;

    User.findOne({ email: email }).then(
        (user) => {
            if (!user) {
                return res.status(404).json({
                    message: "user Not found"
                })
            }
            return res.json({
                message: "user found",
                user: user
            })

        }
    )
}


export function updateUser(req, res) {
    const email = req.body.email;
    const updatedData = req.body; // The data to update

    // Find the user by email and update fields provided in updatedData
    User.findOneAndUpdate({ email: email }, updatedData, { new: true, runValidators: true })
        .then((updatedUser) => {
            if (!updatedUser) {
                return res.status(404).json({
                    message: "User not found",
                });
            }
            res.json({
                message: "User updated successfully",
                user: updatedUser
            });
        })
        .catch((error) => {
            console.error("Error updating user:", error);
            res.status(500).json({
                message: "User update failed",
                details: error.message
            });
        });
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

export function isUserValid(req, res) {

    const user = req.user;

    if (!user) {
        res.status(401).json({
            message: "Authentication required"
        })
        return false
    }
    return true
}

export function isAdmin(req, res) {

    const userValid = isUserValid(req, res);

    if (!userValid) {
        return false
    }


    if (req.user.type != "admin") {
        res.status(403).json({
            message: "Only Admin can doing this task"
        })
        return false
    }
    return true
}

export function isCustomer(req, res) {


    const userValid = isUserValid(req, res);

    if (!userValid) {
        return false
    }


    if (req.body.user.type != "customer") {
        res.status(403).json({
            message: "Only customer can doing this task"
        })
        return false
    }
    return true
}