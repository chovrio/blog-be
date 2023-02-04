import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { RequestConfig } from '~/axios'
class Request {
  instance: AxiosInstance
  constructor(config: RequestConfig) {
    this.instance = axios.create(config)
    // 每个instance实例都添加拦截器(全局)
    this.instance.interceptors.request.use(
      config => {
        // 后续添加token
        return config
      },
      err => {
        // 后续跳转登录页面
        return err
      }
    )
    this.instance.interceptors.response.use(
      config => {
        // 响应成功好像没啥要做的，弹个提示吧到时候
        return config
      },
      err => {
        // 弹提示
        return err
      }
    )
    // 针对待定的Request实例添加拦截器
    if (config.interceptors) {
      this.instance.interceptors.request.use(
        config.interceptors?.requsetSuccessFn,
        config.interceptors?.requsetFailureFn
      )
      this.instance.interceptors.response.use(
        config.interceptors?.responseSuccessFn,
        config.interceptors?.responseFailureFn
      )
    }
  }
  // 封装网络请求的方法
  request<T>(config: RequestConfig<T>): Promise<T> {
    // 如果又请求成功的特例拦截，就先执行
    if (config.interceptors?.requsetSuccessFn) {
      config.interceptors.requsetSuccessFn(<any>config)
    }
    return new Promise((resolve, reject) => {
      this.instance
        .request<T, any>(config)
        .then(res => {
          // 如果事先做了特例的响应拦截，就执行特例
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  get<T = any>(config: RequestConfig<T>) {
    return this.request({ ...config, method: 'get' })
  }
  post<T = any>(config: RequestConfig<T>) {
    return this.request({ ...config, method: 'post' })
  }
  delete<T = any>(config: RequestConfig<T>) {
    return this.request({ ...config, method: 'delete' })
  }
  put<T = any>(config: RequestConfig<T>) {
    return this.request({ ...config, method: 'put' })
  }
}
export default Request
