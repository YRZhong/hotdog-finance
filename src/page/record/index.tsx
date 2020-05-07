import React, { useState } from 'react'
import { Table, Button, Popconfirm, Form, DatePicker, Divider, Select, Row, Col } from 'antd'
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons'
import ModalForm, { Values } from '@/component/bookModal'
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
  timeRange: moment.Moment[]
  catalog: string
  paymentType: string
}

const Record: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [modalData, setModalData] = useState({})
  const [currentRecord, setCurrentRecord] = useState('')
  const [form] = Form.useForm()
  const { RangePicker } = DatePicker

  const getCatalogType = (value: string[] | undefined) => {
    if (value?.length === 0 || !value) {
      return <span>-</span>
    } else return <span>{value.join(' / ')}</span>
  }

  const handleSearch = (value: SearchParams) => {
    const params: any = { ...value }
    if (value.timeRange) {
      params.timeRange = value.timeRange.map((item) => moment(item).format('YYYY-MM-DD'))
    }
    console.log(params)
  }

  const handleEdit = (record: any) => {
    setModalVisible(true)
    //记录当前条目key
    setCurrentRecord(record.key)
    //设置Modal的预填数据
    setModalData({
      catalog: record.catalog,
      count: record.count,
      paymentType: record.paymentType,
      remarks: record.remarks
    })
  }

  const handleDelete = (e: any) => {
    console.log(e)
  }

  const onModalConfirm = (values: Values) => {
    console.log(values)
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
      width: '15%',
      render: (text) => getCatalogType(text)
    },
    {
      title: '支付方式',
      dataIndex: 'paymentType',
      key: 'paymentType',
      width: '15%',
      render: (text) => (text ? <span>{text}</span> : <span>-</span>)
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
          <Button
            type="link"
            icon={<EditOutlined />}
            className={style.edit}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm title="确认删除该记录吗?" onConfirm={() => handleDelete(record)}>
            <Button type="link" danger icon={<DeleteOutlined />} className={style.delete} />
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
      catalog: ['aa', 'bb'],
      paymentType: '支付宝',
      count: '50'
    },
    {
      key: '2',
      time: '2020-02-22',
      catalog: ['娱乐'],
      count: '33',
      remarks: 'asdads'
    }
  ]

  return (
    <div>
      <Form
        form={form}
        className={style.filterForm}
        initialValues={{ catalog: 'all', paymentType: 'all' }}
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
              name="catalog"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 10 }}
            >
              <Select allowClear>
                <Select.Option key="all" value="all">
                  全部
                </Select.Option>
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
                <Select.Option value="all" label="全部">
                  全部
                </Select.Option>
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
      <ModalForm
        visible={modalVisible}
        onConfirm={onModalConfirm}
        onCancel={() => {
          setModalVisible(false)
        }}
        initialValue={modalData as Values}
      ></ModalForm>
    </div>
  )
}

export default Record
