import React from 'react'
import { Table, Button, Popconfirm, Form, DatePicker, Divider, Select, Row, Col } from 'antd'
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons'
import locale from 'antd/es/date-picker/locale/zh_CN'
import style from './index.module.css'
import { Catalog } from '@/utils/catalog'
import { Payment } from '@/utils/payment'
import moment from 'moment'
import 'moment/locale/zh-cn'
interface ColumnType {
  title: string
  key: string
  dataIndex?: string
  render?: (a?: any, b?: any) => JSX.Element
  width?: string
}

interface SearchParams {
  timeRange?: moment.Moment[]
  catalog?: string
  paymentType?: string
}

const Record: React.FC<{}> = () => {
  const [form] = Form.useForm()
  const { RangePicker } = DatePicker
  const getPaymentType = (value: string[] | undefined) => {
    if (value?.length === 0 || !value) {
      return <span>-</span>
    } else return <span>{value.join(' / ')}</span>
  }
  const handleSearch = (value: SearchParams) => {
    console.log(value)
  }
  const handleDelete = (e: any) => {
    console.log(e)
  }
  const columns: ColumnType[] = [
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      width: '15%'
    },
    {
      title: '类别',
      dataIndex: 'catalog',
      key: 'catalog',
      width: '15%'
    },
    {
      title: '支付方式',
      dataIndex: 'paymentType',
      key: 'paymentType',
      width: '15%',
      render: (text) => getPaymentType(text)
    },
    {
      title: '金额',
      dataIndex: 'count',
      key: 'count',
      width: '10%'
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      key: 'remarks',
      width: '25%',
      render: (text) => (text ? <span>{text}</span> : <span>-</span>)
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span className={style.actionGroup}>
          <Button type="primary" shape="circle" icon={<EditOutlined />} className={style.edit} />
          <Popconfirm title="确认删除该记录吗?" onConfirm={() => handleDelete(record)}>
            <Button
              type="danger"
              shape="circle"
              icon={<DeleteOutlined />}
              className={style.delete}
            />
          </Popconfirm>
        </span>
      ),
      width: '20%'
    }
  ]

  //测试数据
  const data = [
    {
      key: '1',
      time: '2020-01-01',
      catalog: '娱乐',
      paymentType: ['aa', 'bb'],
      count: '50'
    },
    {
      key: '2',
      time: '2020-02-22',
      catalog: '娱乐',
      count: '33',
      remarks: 'asdads'
    }
  ]

  return (
    <div>
      <Form
        form={form}
        className={style.filterForm}
        onFinish={(form) => {
          handleSearch(form as SearchParams)
        }}
      >
        <Row style={{ width: '100%' }}>
          <Col span={8}>
            <Form.Item
              label="时间"
              name="timeRange"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
            >
              <RangePicker format="YYYY/MM/DD" locale={locale}></RangePicker>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="消费类别"
              name="catelog"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 10 }}
            >
              <Select allowClear>
                {Catalog.map((item) => {
                  return (
                    <Select.Option key={item.value} value={item.value}>
                      {item.label}
                    </Select.Option>
                  )
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="支付方式"
              name="paymentType"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 10 }}
            >
              <Select allowClear optionLabelProp="label">
                {Payment.map((item) => {
                  return (
                    <Select.Option key={item.value} value={item.value} label={item.label}>
                      <div>
                        <span className={style.paymentIcon}>{item.icon}</span>
                        {item.label}
                      </div>
                    </Select.Option>
                  )
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                查询
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Divider />
      <Table columns={columns} dataSource={data}></Table>
    </div>
  )
}

export default Record
