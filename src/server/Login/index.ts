import type { IUser, LoginReturn } from '~/login'
import request from '..'

export const login = async (user: IUser) => {
  const res = await request.post<LoginReturn>({
    url: '/user/login',
    data: user,
    successMsg: '登录成功',
    errorMsg: '登录失败'
  })
  return res
}
