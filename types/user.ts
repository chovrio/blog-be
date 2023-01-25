import type { IRes } from '.'

export interface User {
  name: string
  info: string
  state: number
  avactor: string
}
export type IUser = IRes<User>
