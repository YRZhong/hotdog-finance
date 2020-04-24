import React, { useState } from 'react'
import {
  Form,
  Input,
  Select,
  Modal,
  message,
  Button,
  Timeline,
  Card,
  Empty,
  Divider,
  Statistic,
  Row,
  Col
} from 'antd'
import { MoneyCollectOutlined } from '@ant-design/icons'
import style from './index.module.css'
import { Catalog } from '@/utils/catalog.ts'

interface Values {
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
                  {item.lable}
                </Option>
              )
            })}
          </Select>
        </Item>
        <Item name="paymentType" label="支付方式">
          <Select></Select>
        </Item>
        <Item name="remark" label="备注">
          <Input.TextArea allowClear></Input.TextArea>
        </Item>
      </Form>
    </Modal>
  )
}

const BookKeep: React.FC<{}> = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [recordItem, setRecordItem] = useState<Values[]>([])
  const onConfirm = (values: Values) => {
    console.log(values)
    setModalVisible(false)
    setRecordItem([...recordItem, values])
  }
  const getCatalogName = (catalog: string[]) => {
    return catalog.map((item: string) => {
      const _array = Catalog.filter((p) => p.value === item)
      return _array[0].lable
    })
  }
  const getTotalCount = (records: Values[]): number => {
    const _array = records.map((item) => item.count)
    return _array.reduce((acc, cur) => Number(acc) + Number(cur))
  }

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setModalVisible(true)
        }}
        shape="round"
        size="large"
        icon={<MoneyCollectOutlined />}
      >
        记一笔
      </Button>
      <Divider />
      <ModalForm
        visible={modalVisible}
        onConfirm={onConfirm}
        onCancel={() => {
          setModalVisible(false)
        }}
      ></ModalForm>
      <Card title="今日消费记录" hoverable className={style.card}>
        {recordItem.length === 0 ? (
          <Empty description={false} />
        ) : (
          <Timeline className={style.timeLine}>
            {recordItem.map((item, index) => {
              return (
                <Timeline.Item key={index}>{`${getCatalogName(item.catalog).join(' / ')}类，花费 ${
                  item.count
                }元`}</Timeline.Item>
              )
            })}
          </Timeline>
        )}
      </Card>
      <Card title="今日统计" hoverable className={style.card} style={{ marginTop: '2rem' }}>
        {recordItem.length === 0 ? (
          <Empty description={false} />
        ) : (
          <Row>
            <Col span={12}>
              <Statistic title="记账条目" value={recordItem.length} />
            </Col>
            <Col span={12}>
              <Statistic title="总金额" value={getTotalCount(recordItem)} />
            </Col>
          </Row>
        )}
      </Card>
    </div>
  )
}

export default BookKeep
