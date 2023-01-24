import { login } from '@/server/Login'
import { Button, Checkbox, Form, Input } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './index.module.less'
export default function Login() {
  const onFinish = async (values: any) => {
    console.log('Success:', values)
    const res = await login({
      name: values.name,
      password: values.password
    })
    console.log(res)
    localStorage.setItem('token', res.result.token)
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
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
            <Checkbox>记住我</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
        <Link to={'/home'}>home</Link>
      </div>
    </div>
  )
}
