export interface ResponseDTO {
    success: boolean
    code: number
    message: string
    data?: string | any
    token?: string 
    userId?: string
 

  }

  export interface LoginResponse {
    token: string
    userId: string
  }