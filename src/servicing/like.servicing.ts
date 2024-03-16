import { daterepository } from "../database/date.prisma";
import { ResponseDTO } from "../dtos/response.dto";
import { LikesDTO } from "../dtos/like.dto";
import { Like } from "../models/like.model";

export class LikeService {
  public async findAll(): Promise<ResponseDTO> {
    const likes = await daterepository.like.findMany();

    return {
      success: true,
      code: 200,
      message: "Likes listados.",
      data: likes,
    };
  }

  public async findOneById(id: string, userId: string, tweetId: string): Promise<ResponseDTO> {
    if (!id || !userId || !tweetId || id.trim() === '' || userId.trim() === '' || tweetId.trim() === '') {
      throw new Error("Parâmetros inválidos");
    }

    const like = await daterepository.like.findUnique({
      where: { id, userId, tweetId },
    });

    if (!like) {
      throw new Error("Like não encontrado");
    }

    return {
      success: true,
      code: 200,
      message: "Like encontrado com sucesso.",
      data: like,
    };
  }

  public async create(likeDTO: LikesDTO): Promise<ResponseDTO> {
    const newLike = new Like(likeDTO.tweetId, likeDTO.userId);

    const createdLike = await daterepository.like.create({
      data: {
        userId: newLike.userId,
        tweetId: newLike.tweetId,
      },
    });

    return {
      success: true,
      code: 201,
      message: "Like criado com sucesso",
      data: createdLike,
    };
  }

  public async delete(id: string, userId: string, tweetId: string): Promise<ResponseDTO> {
    const like = await daterepository.like.findUnique({
      where: { id, userId, tweetId },
    });

    if (!like) {
      throw new Error("Like não encontrado");
    }

    const deletedLike = await daterepository.like.delete({
      where: {
        id, userId, tweetId
      },
    });

    return {
      success: true,
      code: 200,
      message: "Like removido com sucesso.",
      data: deletedLike,
    };
  }
}
