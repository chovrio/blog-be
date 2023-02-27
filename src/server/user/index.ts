import { IUser } from '~/user'
import request from '..'

// 获得用户信息
export const getUserInfo = async () => {
  const res = await request.get<IUser>({
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
