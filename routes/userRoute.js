import bodyParser from 'body-parser'
import express from 'express'
import { getUser,postUser,updateUser,deleteUser } from '../controller/userController.js';  //importing collection of function in single line

const userRouter = express.Router();


//user get part
userRouter.get("/",getUser)


//user post part
userRouter.post("/",postUser)


//user update part
userRouter.put("/",updateUser)


//user delete part
userRouter.delete("/",deleteUser)




export default userRouter;