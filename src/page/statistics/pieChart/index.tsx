import React, { useState, useEffect } from 'react'
import { Divider, Select, Button, Tag } from 'antd'
import { PieDatum } from '@nivo/pie'
import { CatalogPieData, PaymentPieData } from '@/utils/pieData'
import style from './index.module.css'
import PieChart from './component/pieChart'

const PieStatistics: React.FC = () => {
  const [data, setData] = useState<PieDatum[]>([])
  const [type, setType] = useState('catalog')
  const [time, setTime] = useState('week')
  const [tagText, setTagText] = useState('元')

  const getCatalogPieData = () => {
    //随机数据用于测试
    const _data =
      type === 'catalog'
        ? CatalogPieData.map((item) => {
            return {
              ...item,
              value: Math.round(Math.random() * 100)
            }
          })
        : PaymentPieData.map((item) => {
            return {
              ...item,
              value: Math.round(Math.random() * 10)
            }
          })
    setData(_data)
    setTagText(type === 'catalog' ? '元' : '笔')
  }

  useEffect(() => {
    getCatalogPieData()
  }, []) //eslint-disable-line

  return (
    <div>
      <div className={style.searchBar}>
        <Select
          defaultValue="catalog"
          className={style.searchItem}
          onChange={(value) => setType(value)}
        >
          <Select.Option value="catalog">消费类别</Select.Option>
          <Select.Option value="payment">支付方式</Select.Option>
        </Select>
        <Select
          defaultValue="week"
          className={style.searchItem}
          onChange={(value) => setTime(value)}
        >
          <Select.Option value="week">本周</Select.Option>
          <Select.Option value="month">当月</Select.Option>
          <Select.Option value="year">今年</Select.Option>
        </Select>
        <Button type="primary" onClick={() => getCatalogPieData()}>
          确定
        </Button>
      </div>
      <Divider />
      <Tag color="processing">单位: {tagText}</Tag>
      <div className={style.chart}>
        <PieChart data={data} />
      </div>
    </div>
  )
}

export default PieStatistics
