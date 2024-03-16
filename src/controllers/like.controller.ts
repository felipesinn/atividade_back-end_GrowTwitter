import { Request, Response } from "express";
import { LikeService } from "../servicing/like.servicing";
import { LikesDTO } from "../dtos/like.dto";

const likeService = new LikeService();

export class LikeController {

  public async store(request: Request, response: Response) {
    try {
      const { userId, tweetId } = request.params;

      if (!userId || !tweetId || userId.trim() === '' || tweetId.trim() === '') {
        return response.status(400).json({
          success: false,
          code: 400,
          message: "Parâmetros inválidos.",
        });
      }

      const like: LikesDTO = { userId, tweetId };

      const result = await likeService.create(like);
      return response.status(201).json(result);
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: 500,
        message: "Erro ao criar like.",
      });
    }
  }

  public async show(request: Request, response: Response) {
    try {
      const { id, userId, tweetId } = request.params;

      const result = await likeService.findOneById(id, userId, tweetId);

      return response.status(200).json(result);
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: 500,
        message: "Erro ao buscar like.",
      });
    }
  }

  public async delete(request: Request, response: Response) {
    try {
      const { id, userId, tweetId } = request.params;

      const result = await likeService.delete(id, userId, tweetId);

      response.status(200).json(result);
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: 500,
        message: "Erro ao excluir like.",
      });
    }
  }
}
