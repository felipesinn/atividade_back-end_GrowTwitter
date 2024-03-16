import { daterepository } from "../database/date.prisma";
import { ResponseDTO } from "../dtos/response.dto";
import { CreateRetweetDTO, UpdateRetweetDTO } from "../dtos/retweet.dto";
import { Retweet } from "../models/retweet.model";
import { TweetType } from "../TweetType/typeTweet";

export class RetweetService {
  public async findAll(): Promise<ResponseDTO> {
    try {
      const retweets = await daterepository.retweet.findMany();
      return {
        success: true,
        code: 200,
        message: "Retweets listados.",
        data: retweets,
      };
    } catch (error) {
      throw new Error("Erro ao listar retweets.");
    }
  }

  public async create(retweetDTO: CreateRetweetDTO): Promise<ResponseDTO> {
    try {
      const newRetweet = new Retweet(retweetDTO.content, TweetType.retweet, retweetDTO.userId, retweetDTO.tweetId);

      const createdRetweet = await daterepository.retweet.create({
        data: {
          content: newRetweet.content,
          tweetType: TweetType.retweet,
          userId: retweetDTO.userId,
          tweetId: retweetDTO.tweetId
        },
      });

      return {
        success: true,
        code: 201,
        message: "Retweet criado com sucesso.",
        data: createdRetweet,
      };
    } catch (error) {
      throw new Error("Erro ao criar retweet.");
    }
  }

  public async findById(id: string, userId: string, tweetId: string): Promise<ResponseDTO> {
    try {
      const retweet = await daterepository.retweet.findUnique({
        where: { id, userId, tweetId },
      });

      if (!retweet) {
        throw new Error("Retweet não encontrado");
      }

      return {
        success: true,
        code: 200,
        message: "Retweet encontrado com sucesso.",
        data: retweet,
      };
    } catch (error) {
      throw new Error("Erro ao buscar retweet.");
    }
  }

  public async update(retweetDTO: UpdateRetweetDTO): Promise<ResponseDTO> {
    try {
      const retweet = await daterepository.retweet.findUnique({
        where: { id: retweetDTO.id, userId: retweetDTO.userId, tweetId: retweetDTO.tweetId },
      });

      if (!retweet) {
        throw new Error("Retweet não encontrado");
      }

      const updatedRetweet = await daterepository.retweet.update({
        where: {
          id: retweetDTO.id,
          userId: retweetDTO.userId,
          tweetId: retweetDTO.tweetId
        },
        data: {
          content: retweetDTO.content
        },
      });

      return {
        success: true,
        code: 200,
        message: "Retweet atualizado com sucesso",
        data: updatedRetweet,
      };
    } catch (error) {
      throw new Error("Erro ao atualizar retweet.");
    }
  }

  public async delete(id: string, userId: string, tweetId: string): Promise<ResponseDTO> {
    try {
      const retweet = await daterepository.retweet.findUnique({
        where: { id, userId, tweetId },
      });

      if (!retweet) {
        throw new Error("Retweet não encontrado");
      }

      const deletedRetweet = await daterepository.retweet.delete({
        where: { id, userId, tweetId },
      });

      return {
        success: true,
        code: 200,
        message: "Retweet removido com sucesso.",
        data: deletedRetweet,
      };
    } catch (error) {
      throw new Error("Erro ao excluir retweet.");
    }
  }
}
