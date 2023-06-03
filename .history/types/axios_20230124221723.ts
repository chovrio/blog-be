import type { AxiosRequestConfig, AxiosResponse } from 'axios'
// 拦截器
interface Interceptors<T = AxiosResponse> {
  // 请求
  requsetSuccessFn?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requsetFailureFn?: (err: any) => any
  // 响应
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (err: any) => any
}
type SetOptional<T, K extends keyof T> = Simplify<
  Partial<Pick<T, K>> & Pick<T, Exclude<keyof T, K>>
>
type Simplify<T> = {
  [P in keyof T]: T[P]
}
type NewAxiosRequestConfig = SetOptional<AxiosRequestConfig, 'headers'>
export interface RequestConfig<T = AxiosResponse>
  extends NewAxiosRequestConfig {
  interceptors?: Interceptors<T>
  successMsg?: string
  errorMsg?: string
}
