import React, { useState } from 'react'
import useHint from '@/hooks/useHint'
import { login } from '@/server/login'
import { Button, Checkbox, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.less'
export default function Login() {
  const { contextHolder, successMsg, errorMsg } = useHint()
  const [isCheck, setIsCheck] = useState<boolean>(true)
  const navigator = useNavigate()

  const onFinish = async (values: any) => {
    const res = await login({
      name: values.name,
      password: values.password
    })
    if (res) {
      successMsg('登录成功')
      if (isCheck) localStorage.setItem('token', res.result.token)
      navigator('/home')
    } else {
      errorMsg('登录失败，请检查网络(也可能是服务器寄了)')
    }
  }
  const onFinishFailed = () => {
    errorMsg('请输入正确的用户信息')
  }

  return (
    <div className={styles.login}>
      {contextHolder}
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
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
