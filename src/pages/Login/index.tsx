import React, { useState } from 'react'
import { login } from '@/server/user'
import { Button, Checkbox, Form, Input, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.less'
export default function Login() {
  const [isCheck, setIsCheck] = useState<boolean>(true)
  const navigator = useNavigate()

  const onFinish = async (values: any) => {
    const res = await login({
      name: values.name,
      password: values.password
    })
    if (res) {
      if (isCheck) localStorage.setItem('token', res.result.token)
      navigator('/home/system')
    }
  }
  const onFinishFailed = () => {
    message.error('请输入正确的用户信息')
  }

  return (
    <div className={styles.login}>
      <div className={styles.content}>
        <Form
          className={styles.form}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          style={{ maxWidth: 800, maxHeight: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <h2>博客后台管理系统</h2>
          <div className={styles.account}>
            <Form.Item
              label="账号"
              name="name"
              className={styles.input}
              rules={[
                { required: true, message: '请输入您的账号!' },
                {
                  pattern: /^[a-z0-9]{3,}$/,
                  message: '必须是3位以上的数字或字母组成'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="密码"
              name="password"
              className={styles.input}
              rules={[
                { required: true, message: '请输入您的密码!' },
                {
                  pattern: /^[a-z0-9]{3,}$/,
                  message: '必须是6位以上的数字或字母组成'
                }
              ]}
            >
              <Input.Password />
            </Form.Item>
          </div>
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox onChange={e => setIsCheck(e.target.checked)}>
              记住我
            </Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
            <Button type="link" href="/register">
              没有账号？点我进行注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
