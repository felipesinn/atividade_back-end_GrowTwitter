export interface CreateUserDTO {
    name: string
    username?: string
    email: string
    password: string
  }
  
  export interface UpdateUserDTO {
    id: string
    email: string
    name: string
    username?: string
    password: string
    token?: string 
  }