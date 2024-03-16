import { Request, Response } from 'express'; 
import { authService } from "../controllers/auth.log.controller";
import { ResponseDTO } from "../dtos/response.dto";

export class Authlog {
    public async login(request: Request, response: Response<ResponseDTO>): Promise<any> {
      try {       
        const { email, password } = request.body;
        
        if (!email || !password) {
          return response.status(400).json({
            success: false,
            code: response.statusCode,
            message: "Preencha os campos obrigatórios."
          });
        }
       
        const { token, userId } = await authService.login(email, password);
  
        return response.status(200).json({
          success: true,
          code: response.statusCode,
          message: "Login realizado com sucesso.",
          token: token,
          userId: userId
        });
      } catch (error) {
        return response.status(500).json({
          success: false,
          code: response.statusCode,
          message: "Erro ao fazer login."
        });
      }
    }

    public async register(request: Request, response: Response) {
      try {
        const { email, password } = request.body;

        if (!email || !password) {
          return response.status(400).json({
            success: false,
            message: "Preencha os campos obrigatórios."
          });
        }

        const newUser:any = await authService.register(email, password);

        return response.status(201).json({
          success: true,
          message: "Usuário criado com sucesso.",
          data: newUser
        });
      } catch (error) {
        return response.status(500).json({
          success: false,
          message: "Erro ao criar usuário."
        });
      }
    }
}
