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
      // messageApi.open({
      //   type: 'success',
      //   content: reqConfig.successMsg
      // })
      return res
    },
    responseFailureFn(err) {
      return err
    }
  }
})
export default request
