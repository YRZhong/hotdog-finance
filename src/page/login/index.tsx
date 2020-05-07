import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Form, Input, Card, message } from 'antd'
import { useForm } from 'antd/es/form/util'
import style from './index.module.css'

const Login: React.FC = () => {
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 }
  }
  const tailLayout = {
    wrapperCol: { offset: 4, span: 16 }
  }
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const [form] = useForm()
  const handleLogin = (value: any) => {
    setLoading(true)
    if (value.userName && value.password) {
      setTimeout(() => {
        sessionStorage.setItem('token', value.userName)
        history.replace('/bookKeep')
        setLoading(false)
      }, 1000)
    } else {
      message.error('请输入用户名和密码')
      setLoading(false)
    }
  }

  return (
    <div className={style.container}>
      <Card hoverable style={{ width: '30%', cursor: 'auto' }}>
        <Form {...layout} form={form} onFinish={handleLogin}>
          <Form.Item name="userName" label="用户名">
            <Input />
          </Form.Item>
          <Form.Item name="password" label="密码">
            <Input.Password />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" loading={loading}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
