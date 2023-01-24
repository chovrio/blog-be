import request from '..'

export const getInfo = () => {
  return request.get({
    url: '/test'
  })
}
