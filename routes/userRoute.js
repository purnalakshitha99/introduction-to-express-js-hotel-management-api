
import express from 'express'
import { getUser,postUser,updateUser,deleteUser, loginUser } from '../controller/userController.js';  //importing collection of function in single line

const userRouter = express.Router();

//user post part
userRouter.post("/",postUser)

//user login
userRouter.post("/loginUser",loginUser)

//user get part
userRouter.get("/",getUser)

//user update part
userRouter.put("/",updateUser)

//user delete part
userRouter.delete("/",deleteUser)


export default userRouter;