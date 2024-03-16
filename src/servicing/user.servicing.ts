import { daterepository } from "../database/date.prisma";


import { ResponseDTO } from "../dtos/response.dto";
import { CreateUserDTO, UpdateUserDTO } from "../dtos/users.dto";
import { users } from "../models/users.model";

export class UserService {
  public async findAll(): Promise<ResponseDTO> {
      const users = await daterepository.user.findMany({
          select: {
              id: true,
              name: true,
              email: true,
              username: true,
          },
      });

      return {
          success: true,
          code: 200,
          message: 'Usuários listados com sucesso.',
          data: users
      };
  }

  public async create(CreateUserDTO: CreateUserDTO): Promise<ResponseDTO> {
      const newUser = new users(
          CreateUserDTO.name,
          CreateUserDTO.email,
          CreateUserDTO.password,
          CreateUserDTO.email
      );

      const createdUser = await daterepository.user.create({
          data: {
              name: newUser.name,
              email: newUser.email,
              password: newUser.password,
              username: newUser.username,
          }
      });

      return {
          success: true,
          code: 201,
          message: 'Usuário criado com sucesso.',
      };
  }

  public async findById(id: string): Promise<ResponseDTO> {
      const user = await daterepository.user.findUnique({
          where: { id },
      });

      if (!user) {
          throw new Error('User não encontrado');
      }

      return {
          success: true,
          code: 200,
          message: 'User encontrado com sucesso.',
      };
  }

  public async update(userDTO: UpdateUserDTO): Promise<ResponseDTO> {
      const user = await daterepository.user.findUnique({
          where: {
              id: userDTO.id,
          },
      });

      if (!user) {
          throw new Error('User não encontrado');
      }

      const updatedUser = await daterepository.user.update({
          where: {
              id: userDTO.id,
          },
          data: {
              name: userDTO.name,
              password: userDTO.password,
              username: userDTO.username
          },
      });

      return {
          success: true,
          code: 200,
          message: 'User atualizado com sucesso.',
          data: updatedUser
      };
  }



  public async delete(id: string): Promise<ResponseDTO> {
    const user = await daterepository.user.findUnique({
      where: {
        id
      }
    })

    if (!user) {
      throw new Error("User não encontrado")
    }

    const deleteUser = await daterepository.user.delete({
      where: {
        id
      }
    })

    return {
      success: true,
      code: 200,
      message: "User removido com sucesso.",
      data: deleteUser
    }
  }


}


