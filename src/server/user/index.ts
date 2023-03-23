import { IRes } from '~/index'
import type { LoginUser, LoginReturn } from '~/login'
import type { User } from '~/user'
import request from '..'

// 登录接口
export const login = async (user: LoginUser) => {
  const res = await request.post<LoginReturn>({
    url: '/user/login',
    data: user,
    successMsg: '登录成功',
    errorMsg: '登录失败'
  })
  return res
}

// 注册接口
export const register = async (user: LoginUser) => {
  const res = await request.post({
    url: '/user/register',
    data: user,
    successMsg: '注册成功',
    errorMsg: '存在网络波动或用户名重复'
  })
  return res
}
// 获得用户信息
export const getUserInfo = async () => {
  const res = await request.get<LoginReturn>({
    url: '/user/info'
  })
  return res
}

// 上传头像
export const uploadActor = async (formdata: FormData) => {
  return await request
    .post({
      url: '/user/uploadactor',
      data: formdata
    })
    .then(data => data)
}

// 获取所有用户列表
export const getAllUser = async () => {
  return await request
    .get<IRes<Array<User>>>({
      url: '/user/all'
    })
    .then(data => data)
}
