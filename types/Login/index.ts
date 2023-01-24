export interface IUser {
  name: string
  password: string
}
export interface LoginReturn {
  code: number
  message: string
  result: {
    token: string
  }
}
