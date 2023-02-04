import { IUser } from '~/user'
import request from '..'

export const getUserInfo = async () => {
  const res = await request.get<IUser>({
    url: '/user/info'
  })
  return res
}
