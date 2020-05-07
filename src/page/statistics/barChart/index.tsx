import React, { useState, useEffect } from 'react'
import { Select, Button, Divider, Tag } from 'antd'
import { BarDatum } from '@nivo/bar'
import style from './index.module.css'
import BarChart from './component/barChart'
import { testData } from '@/service/barTestData'

const BarStatistics: React.FC = () => {
  const [data, setData] = useState<BarDatum[]>([])
  const [time, setTime] = useState('week')
  //随机生成测试数据
  const getBarData = () => {
    if (time === 'week') setData(testData.week)
    else if (time === 'month') setData(testData.month)
    else if (time === 'year') setData(testData.year)
  }

  useEffect(() => {
    getBarData()
  }, []) //eslint-disable-line

  return (
    <div>
      <div className={style.searchBar}>
        <Select
          defaultValue="week"
          className={style.searchItem}
          onChange={(value) => setTime(value)}
        >
          <Select.Option value="week">本周</Select.Option>
          <Select.Option value="month">当月</Select.Option>
          <Select.Option value="year">今年</Select.Option>
        </Select>
        <Button type="primary" onClick={() => getBarData()}>
          确定
        </Button>
      </div>
      <Divider />
      <Tag color="processing">单位: 元</Tag>
      <div className={style.chart}>
        <BarChart data={data} />
      </div>
    </div>
  )
}

export default BarStatistics
