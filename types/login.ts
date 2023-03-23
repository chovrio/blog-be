import type { IRes } from '.'
export interface LoginUser {
  name: string
  password: string
}

export type LoginReturn = IRes<{ token: string }>
