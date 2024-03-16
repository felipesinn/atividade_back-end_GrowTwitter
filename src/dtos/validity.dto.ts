export interface LoginResponse {
  success: boolean;
  code: number;
  message: string;
  token?: string 
  userId: string 

}