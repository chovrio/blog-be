import type { IRes } from '.'
export interface IUser {
  name: string
  password: string
}

export type LoginReturn = IRes<{ token: string }>
