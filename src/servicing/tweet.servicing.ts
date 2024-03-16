import { daterepository } from "../database/date.prisma";
import { ResponseDTO } from "../dtos/response.dto";
import { CreateTweetDTO, UpdateTweetDTO } from "../dtos/createTweet.dto";
import { Tweet } from "../models/tweet.model";

export class TweetService {
  public async findAll(): Promise<ResponseDTO> {
    const tweets = await daterepository.tweet.findMany();

    return {
      success: true,
      code: 200,
      message: "Tweets listados.",
      data: tweets,
    };
  }

  public async create(tweetDTO: CreateTweetDTO): Promise<ResponseDTO> {
    const newTweet = new Tweet(tweetDTO.content, tweetDTO.tweetType, tweetDTO.userId);

    const createdTweet = await daterepository.tweet.create({
      data: {
        content: newTweet.content,
        tweetType: "TWEET",
        userId: tweetDTO.userId
      },
    });

    return {
      success: true,
      code: 201,
      message: "Tweet criado com sucesso.",
      data: createdTweet
    };
  }
  
  public async findById(id: string, userId: string): Promise<ResponseDTO> {
    const tweet = await daterepository.tweet.findUnique({
      where: { id, userId }
    });

    if (!tweet || !userId) {
      throw new Error("Tweet não encontrado");
    }

    return {
      success: true,
      code: 200,
      message: "Tweet encontrado com sucesso.",
      data: tweet,
    };
  }

  public async update(
    tweetDTO: UpdateTweetDTO,
    userId: string
  ): Promise<ResponseDTO> {
    const tweet = await daterepository.tweet.findUnique({
      where: { id: tweetDTO.id, userId },
    });

    if (!tweet || !userId) {
      throw new Error("Tweet não encontrado");
    }

    const updatedTweet = await daterepository.tweet.update({
      where: {
        id: tweetDTO.id,
        userId: userId // Corrigido para userId
      },
      data: {
        content: tweetDTO.content,
        tweetType: "TWEET",
      },
    });

    return {
      success: true,
      code: 200,
      message: "Tweet atualizado com sucesso",
      data: updatedTweet,
    };
  }

  public async delete(id: string, userId: string): Promise<ResponseDTO> {
    const tweet = await daterepository.tweet.findUnique({
      where: { id, userId },
    });

    if (!tweet || !userId) {
      throw new Error("Tweet não encontrado");
    }

    const deletedTweet = await daterepository.tweet.delete({
      where: { id, userId },
    });

    return {
      success: true,
      code: 200,
      message: "Tweet removido com sucesso.",
      data: deletedTweet,
    };
  }
}
