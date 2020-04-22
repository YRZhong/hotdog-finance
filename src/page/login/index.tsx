import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Form, Input, Card } from 'antd'
import { FormProps } from 'antd/es/form'
import { useForm } from 'antd/es/form/util'
import style from './index.module.css'

interface IProps extends FormProps {}

const Login: React.FC<IProps> = (props) => {
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 }
  }
  const tailLayout = {
    wrapperCol: { offset: 4, span: 16 }
  }

  const history = useHistory()
  const [form] = useForm()

  const handleLogin = (value: any) => {
    console.log(value)
    history.push('/')
  }

  return (
    <div className={style.container}>
      <Card style={{ width: '40%' }}>
        <Form {...layout} form={form} onFinish={handleLogin}>
          <Form.Item name="userName" label="用户名" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="密码" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              登陆
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
