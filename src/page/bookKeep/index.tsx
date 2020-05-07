import React, { useState } from 'react'
import { Button, Timeline, Card, Empty, Divider, Statistic, Row, Col } from 'antd'
import { MoneyCollectOutlined } from '@ant-design/icons'
import ModalForm, { Values } from '@/component/bookModal'
import style from './index.module.css'
import { Catalog } from '@/utils/catalog'

const BookKeep: React.FC = () => {
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
      return _array[0].label
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

      <Card title="今日统计" hoverable className={style.card} style={{ marginTop: '2rem' }}>
        {recordItem.length === 0 ? (
          <Empty description={false} />
        ) : (
          <Row>
            <Col span={12}>
              <Statistic title="消费数量" value={recordItem.length} />
            </Col>
            <Col span={12}>
              <Statistic title="总金额" value={`¥ ${getTotalCount(recordItem)}`} />
            </Col>
          </Row>
        )}
      </Card>

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
    </div>
  )
}

export default BookKeep
