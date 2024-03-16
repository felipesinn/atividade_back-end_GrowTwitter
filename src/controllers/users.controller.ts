import { Request, Response } from 'express';
import { UserService } from "../servicing/user.servicing";
import { CreateUserDTO } from '../dtos/users.dto';

const userService = new UserService();

export class UserController {
  public async index(request: Request, response: Response) {
    try {
      const users = await userService.findAll();
      return response.status(200).json(users);
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: response.statusCode,
        message: 'Error listing users.',
      });
    }
  }

  public async create(request: Request, response: Response) {
    try {
      const { name, username,email, password } = request.body;

      if (!name || !username || !email || !password) {
        return response.status(400).json({
          success: false,
          code: response.statusCode,
          message: 'Fill in all required fields.',
        });
      }

      const newUser: CreateUserDTO = { name, email, password, username };
      const result = await userService.create(newUser);

      return response.status(result.code).json(result);
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: response.statusCode,
        message: 'Error creating user.',
      });
    }
  }

  public async show(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const result = await userService.findById(id);

      return response.status(200).json(result);
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: response.statusCode,
        message: 'Error retrieving user.',
      });
    }
  }

  public async update(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { name, username, password, email } = request.body;

      const result = await userService.update({
        id,
        name,
        username,
        email,
        password 
      });

      return response.status(result.code).json(result);
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: response.statusCode,
        message: 'Error updating user.',
      });
    }
  }

  public async delete(request: Request, response: Response) {
    try {
      const { id } = request.params

      const result = await userService.delete(id)

      response.status(200).json(result)
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: 500,
        message: 'Erro dele user.',
      })
    }
  }
}
