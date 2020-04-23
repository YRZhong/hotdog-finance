import React, { useRef, useImperativeHandle } from 'react'
import { Form, Input, InputNumber, Select, Card } from 'antd'
import { EditOutlined, CloseCircleOutlined, PayCircleOutlined } from '@ant-design/icons'
import style from './index.module.css'

const Title: React.FC<{}> = () => {
  return (
    <div>
      <PayCircleOutlined />
      <span style={{ marginLeft: '.5rem' }}>记一笔</span>
    </div>
  )
}

const ContentForm = React.forwardRef((props, ref) => {
  const [form] = Form.useForm()
  const { Option } = Select
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
  }
  const handleConfirm = (value: any) => {
    console.log(value)
  }
  useImperativeHandle(ref, () => ({
    onConfirm: () => {
      form.submit()
    }
  }))
  return (
    <Form {...layout} form={form} onFinish={handleConfirm}>
      <Form.Item name="count" label="金额" rules={[{ required: true }]}>
        <Input prefix="￥" allowClear />
      </Form.Item>
      <Form.Item name="catalog" label="类别">
        <Select></Select>
      </Form.Item>
      <Form.Item name="remark" label="备注">
        <Input.TextArea allowClear />
      </Form.Item>
    </Form>
  )
})

const BookKeep: React.FC<{}> = () => {
  const { Meta } = Card
  const formRef = useRef<any>(null)
  return (
    <div>
      <Card
        actions={[
          <EditOutlined
            key="confirm"
            onClick={() => {
              formRef.current.onConfirm()
            }}
          />,
          <CloseCircleOutlined key="clear" />
        ]}
        className={style.card}
      >
        <Meta title={<Title />} description={<ContentForm ref={formRef} />}></Meta>
      </Card>
    </div>
  )
}

export default BookKeep
