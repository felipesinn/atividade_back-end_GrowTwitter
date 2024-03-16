import express from "express";
import { LikeController } from "../controllers/like.controller";

export const likeRouter = express.Router();

const likeController = new LikeController();

likeRouter.get('/likes/:id/:userId/:tweetId', likeController.show);

likeRouter.post('/likes/:userId/:tweetId', likeController.store);

likeRouter.delete('/likes/:userId/:tweetId', likeController.delete);

