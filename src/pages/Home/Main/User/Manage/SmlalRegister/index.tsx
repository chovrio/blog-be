import React from 'react'
import { register } from '@/server/user'
import { Button, Form, Input } from 'antd'
import styles from './index.module.less'

const SmallRegister: React.FC<{
  setIsShow: (flag: boolean) => void
  setF5: (flag: boolean) => void
  f5: boolean
}> = ({ setIsShow, setF5, f5 }) => {
  const onFinish = async (values: any) => {
    const res = await register(values)
    if (res) {
      setIsShow(false)
      setF5(!f5)
    }
  }

  return (
    <Form
      className={styles.content}
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <div onClick={() => setIsShow(false)} className={styles.close}>
        X
      </div>
      <Form.Item
        label="用户名"
        name="name"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  )
}

export default SmallRegister
