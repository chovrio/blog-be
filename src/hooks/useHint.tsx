import { message } from 'antd'

const useHint = () => {
  const successMsg = (content: string) => {
    message.open({
      type: 'success',
      content
    })
  }
  const errorMsg = (content: string) => {
    message.open({
      type: 'error',
      content
    })
  }
  const infoMsg = (content: string) => {
    message.open({
      type: 'info',
      content
    })
  }
  return {
    successMsg,
    errorMsg,
    infoMsg
  }
}

export default useHint
