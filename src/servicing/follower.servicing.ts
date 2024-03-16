import { daterepository } from "../database/date.prisma";
import { FollowUserDTO } from "../dtos/Follower.dto";
import { ResponseDTO } from "../dtos/response.dto";
import { Follower } from "../models/follower.model";

export class FollowerService {
  public static async create(followerDTO: FollowUserDTO): Promise<ResponseDTO> {
    const newFollower = new Follower(followerDTO.followerId, followerDTO.followingUserId);

    const createdFollower = await daterepository.follower.create({
      data: {
        id: newFollower.id,
        userId: newFollower.userId,
      },
    });

    return {
      success: true,
      code: 201,
      message: "Follower criado com sucesso",
      data: createdFollower,
    };
  }

  public static async findById(
    id: string,
    userId: string
  ): Promise<ResponseDTO> {
    const follower = await daterepository.follower.findUnique({
      where: { id, userId },
    });

    if (!follower) { 
      throw new Error("Follower não encontrado");
    }

    return {
      success: true,
      code: 200,
      message: "Follower encontrado com sucesso.",
      data: follower,
    };
  }
  public async show(): Promise<ResponseDTO> {
    try {
      const followers = await daterepository.follower.findMany();
      
      return {
        success: true,
        code: 200,
        message: "Lista de seguidores encontrada com sucesso.",
        data: followers,
      };
    } catch (error) {
      throw new Error("Erro ao listar seguidores.");
    }
  }


  public static async delete(id: string, userId: string): Promise<ResponseDTO> {
    const follower = await daterepository.follower.findUnique({
      where: { id, userId },
    });

    if (!follower) {
      throw new Error("Follower não encontrado");
    }

    const deletedFollower = await daterepository.follower.delete({
      where: {
        id,
      },
    });

    return {
      success: true,
      code: 200,
      message: "Follower removido com sucesso.",
      data: deletedFollower,
    };
  }
}
