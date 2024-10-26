
import express from 'express'
import { getUser,postUser,updateUser,deleteUser, loginUser, getUserByEmail } from '../controller/userController.js';  //importing collection of function in single line

const userRouter = express.Router();

//user post part
userRouter.post("/",postUser)

//user login
userRouter.post("/loginUser",loginUser)

//user get part
userRouter.get("/",getUser)

//get user by email
userRouter.get("/getUserByEmail",getUserByEmail)

//user update part
userRouter.put("/",updateUser)

//user delete part
userRouter.delete("/",deleteUser)


export default userRouter;