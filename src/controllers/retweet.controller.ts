import { Request, Response } from "express";
import { RetweetService } from "../servicing/retweet.servicing";
import { CreateRetweetDTO } from "../dtos/retweet.dto";

const retweetService = new RetweetService();

export class RetweetController {
  public async index(request: Request, response: Response) {
    try {
      const retweets = await retweetService.findAll();
      return response.status(200).json(retweets);
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: 500,
        message: "Erro ao listar retweets.",
      });
    }
  }

  public async store(request: Request, response: Response) {
    try {
      const { content, tweetId, userId } = request.body;

      if (!content || !userId || !tweetId) {
        return response.status(400).json({
          success: false,
          code: 400,
          message: "Preencha todos os campos obrigatórios.",
        });
      }


      const retweet: CreateRetweetDTO = { content, tweetId, userId, tweetType: "Retweet" };

      const result = await retweetService.create(retweet);
      return response.status(200).json(result);
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: 500,
        message: "Erro ao criar retweet.",
      });
    }
  }

  public async show(request: Request, response: Response) {
    try {
      const { id, userId, tweetId } = request.params;
      const result = await retweetService.findById(id, userId, tweetId);
      return response.status(200).json(result);
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: 500,
        message: "Erro ao buscar retweet.",
      });
    }
  }

  public async update(request: Request, response: Response) {
    try {
      const { id, userId, tweetId } = request.params;
      const { content } = request.body;

      const result = await retweetService.update({ id, content, userId, tweetId });
      response.status(200).json(result);
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: 500,
        message: "Erro ao atualizar retweet.",
      });
    }
  }

  public async delete(request: Request, response: Response) {
    try {
      const { id, userId, tweetId } = request.params;
      const result = await retweetService.delete(id, userId, tweetId);
      response.status(200).json(result);
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: 500,
        message: "Erro ao excluir retweet.",
      });
    }
  }
}
