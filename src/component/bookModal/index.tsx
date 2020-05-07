import React, { useEffect } from 'react'
import { Form, Select, Modal, Input, message } from 'antd'
import { Catalog } from '@/utils/catalog'
import { Payment } from '@/utils/payment'
import style from './index.module.css'
import request from '@/request'

export interface Values {
  count: number
  catalog: string[]
  paymentType: string
  remark: string
}

interface ModalFormProps {
  visible: boolean
  onConfirm: (values: Values) => void
  onCancel: () => void
}

const ModalForm: React.FC<ModalFormProps> = ({ visible, onConfirm, onCancel }) => {
  const [form] = Form.useForm()
  const { Item } = Form
  const { Option } = Select
  const handleConfirm = () => {
    form
      .validateFields()
      .then((res) => {
        form.resetFields()
        onConfirm(res as Values)
        message.success('记录成功')
      })
      .catch((err) => {
        console.log(err)
        message.error('记录失败，请检查后重新提交')
      })
  }

  const handleCancel = () => {
    onCancel()
    form.resetFields()
  }

  const getData = async () => {
    const data = await request.get('/rubbish/type?name=西瓜')
    console.log(data)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Modal
      visible={visible}
      title="创建新记账"
      okText="确认"
      cancelText="取消"
      maskClosable={false}
      centered={true}
      afterClose={handleCancel}
      onCancel={handleCancel}
      onOk={handleConfirm}
    >
      <Form form={form} layout="vertical">
        <Item
          name="count"
          label="金额"
          rules={[
            { required: true, pattern: new RegExp(/^[1-9]\d*$/, 'g'), message: '请输入正确的数字' }
          ]}
        >
          <Input prefix="￥" allowClear />
        </Item>
        <Item name="catalog" label="分类" rules={[{ required: true }]}>
          <Select mode="multiple" allowClear>
            {Catalog.map((item) => {
              return (
                <Option key={item.value} value={item.value}>
                  {item.label}
                </Option>
              )
            })}
          </Select>
        </Item>
        <Item name="paymentType" label="支付方式">
          <Select allowClear optionLabelProp="label">
            {Payment.map((item) => {
              return (
                <Option key={item.value} value={item.value} label={item.label}>
                  <div>
                    <span className={style.paymentIcon}>{item.icon}</span>
                    {item.label}
                  </div>
                </Option>
              )
            })}
          </Select>
        </Item>
        <Item name="remark" label="备注">
          <Input.TextArea allowClear></Input.TextArea>
        </Item>
      </Form>
    </Modal>
  )
}

export default ModalForm
