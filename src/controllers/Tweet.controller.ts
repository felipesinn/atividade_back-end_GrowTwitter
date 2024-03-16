import { Request, Response } from "express";
import { TweetService } from "../servicing/tweet.servicing";
import { CreateTweetDTO } from "../dtos/createTweet.dto";

const tweetService = new TweetService();

export class TweetController {
  public async index(request: Request, response: Response) {
    try {
      const tweets = await tweetService.findAll();

      return response.status(200).json(tweets);
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: 500,
        message: "Erro ao listar tweets.",
      });
    }
  }

  public async store(request: Request, response: Response) {
    try {
      const { content, userId } = request.body;

      if (!content || !userId) {
        return response.status(400).json({
          success: false,
          code: 400,
          message: "Preencha todos os campos obrigatórios.",
        });
      }

      const tweet: CreateTweetDTO = { content, tweetType: "Tweet", userId };

      const result = await tweetService.create(tweet);
      return response.status(200).json(result);
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: 500,
        message: "Erro ao criar tweet.",
      });
    }
  }
  public async show(request: Request, response: Response) {
    try {
      const { id, userId } = request.params;

      const result = await tweetService.findById(id, userId);

      return response.status(200).json(result);
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: 500,
        message: "Erro ao buscar tweet.",
      });
    }
  }
  public async update(request: Request, response: Response) {
    try {
      const { id, userId } = request.params;
      const { content } = request.body;

      const result = await tweetService.update({
        id,
        content
      }, userId);

      response.status(200).json(result);
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: 500,
        message: "Erro ao atualizar tweet.",
      });
    }
  }
  public async delete(request: Request, response: Response) {
    try {
      const { id, userId } = request.params;

      const result = await tweetService.delete(id, userId);

      response.status(200).json(result);
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: 500,
        message: "Erro ao excluir tweet.",
      });
    }
  }
}