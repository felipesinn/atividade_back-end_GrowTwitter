import express from "express";
import { UserController } from "../controllers/users.controller";



export const userRouter = express.Router();

const userController = new UserController();




userRouter.get('/user', userController.index);

userRouter.post('/user', userController.create);
