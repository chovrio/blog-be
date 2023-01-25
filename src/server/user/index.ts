import { IUser } from '~/user'
import request from '..'

export const getUserInfo = async (): Promise<IUser> => {
  const res = await request.get({
    url: '/user/info'
  })
  return res.data
}
