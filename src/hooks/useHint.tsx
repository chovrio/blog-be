import { message } from 'antd'

const useHint = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const successMsg = (content: string) => {
    messageApi.open({
      type: 'success',
      content
    })
  }
  const errorMsg = (content: string) => {
    messageApi.open({
      type: 'error',
      content
    })
  }
  const infoMsg = (content: string) => {
    messageApi.open({
      type: 'info',
      content
    })
  }
  return {
    successMsg,
    errorMsg,
    infoMsg,
    contextHolder
  }
}

export default useHint
