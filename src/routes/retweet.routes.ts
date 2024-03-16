import express from "express";
import { RetweetController } from "../controllers/retweet.controller";

export const retweetRouter = express.Router();

const retweetController = new RetweetController();

retweetRouter.get("/retweets", retweetController.index);


retweetRouter.post("/retweets/:userId/:tweetId", retweetController.store);

retweetRouter.put("/retweets/:id/:userId/:tweetId", retweetController.update);

retweetRouter.delete("/retweets/:id/:userId/:tweetId", retweetController.delete);


