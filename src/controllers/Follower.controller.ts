import { Request, Response } from "express";
import { FollowerService } from "../servicing/follower.servicing";
import { FollowUserDTO } from "../dtos/Follower.dto";

export class FollowerController {
  public async show(req: Request, res: Response) {
    const { id, userId } = req.params;
    try {
      const follower = await FollowerService.findById(id, userId);
      return res.status(200).json(follower);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching follower" });
    }
  }

  public async follow(req: Request, res: Response) {
    const followData: FollowUserDTO = req.body;
    try {
      await FollowerService.create(followData);
      return res.json({ message: "User followed successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Error following user" });
    }
  }

  public async store(req: Request, res: Response) {
    const { followerId, followingUserId } = req.body;
    try {
      const newFollower = await FollowerService.create({ followerId, followingUserId });
      return res.status(201).json({ message: "Follower created successfully", data: newFollower });
    } catch (error) {
      return res.status(500).json({ message: "Error creating follower" });
    }
  }

  public async delete(req: Request, res: Response) {
    const { id, userId } = req.params;
    try {
      await FollowerService.delete(id, userId);
      return res.json({ message: "Follower deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Error deleting follower" });
    }
  }
}
