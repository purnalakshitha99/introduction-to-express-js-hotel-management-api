import bodyParser from 'body-parser'
import express from 'express'
import { getUser,postUser,updateUser,deletUser } from '../controller/userController.js';

const userRouter = express.Router();


//user get part
userRouter.get("/",getUser)


//user post part
userRouter.post("/",postUser)


//user update part
userRouter.put("/",updateUser)


//user delete part
userRouter.delete("/",deletUser)

export default userRouter;