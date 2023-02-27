import { message } from 'antd'
import { RequestConfig } from '~/axios'
import { BASE_URL, TIME_OUT } from './config'
import Request from './request'
let reqConfig: RequestConfig
const request = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // 添加全局拦截器
  interceptors: {
    requsetSuccessFn(config) {
      const token = localStorage.getItem('token')
      reqConfig = config
      if (config.headers && token) {
        config.headers.set('Authorization', `Bearer ${token}`)
      }
      return config
    },
    requsetFailureFn(err) {
      return err
    },
    responseSuccessFn(res) {
      if ((<any>res).response) {
        if (
          (<any>res).response.data.code == 403 &&
          !location.pathname.includes('/login')
        ) {
          message.error('用户凭证已过期，将自动跳转登录页面')
          setTimeout(() => {
            window.location.replace(
              `http${import.meta.env.DEV ? '' : 's'}://${location.host}/login`
            )
          }, 500)
        }
      }
      if (res.status !== 200) {
        reqConfig.errorMsg && message.error(reqConfig.errorMsg)
      } else {
        reqConfig.successMsg && message.success(reqConfig.successMsg)
      }
      return res
    },
    responseFailureFn(err) {
      reqConfig.errorMsg && message.error(reqConfig.errorMsg)
      return err
    }
  }
})
export default request
