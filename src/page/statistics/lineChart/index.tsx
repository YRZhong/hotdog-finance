import React, { useState, useEffect } from 'react'
import { Select, Button, Divider, Tag } from 'antd'
import { Serie } from '@nivo/line'
import style from './index.module.css'
import LineChart from './component/lineChart'
import { testData } from '@/service/lineTestData'

const Statistics: React.FC = () => {
  const [data, setData] = useState<Serie[]>([])
  const [type, setType] = useState('catalog')
  const [time, setTime] = useState('week')

  const getLineData = () => {
    if (type === 'catalog') {
      if (time === 'week') setData(testData.week)
      else if (time === 'month') setData(testData.month)
      else if (time === 'year') setData(testData.year)
    } else {
      if (time === 'week') setData(testData.weekTotal)
      else if (time === 'month') setData(testData.monthTotal)
      else if (time === 'year') setData(testData.yearTotal)
    }
  }

  useEffect(() => {
    getLineData()
  }, []) //eslint-disable-line

  return (
    <div>
      <div className={style.searchBar}>
        <Select
          defaultValue="catalog"
          className={style.searchItem}
          onChange={(value) => setType(value)}
        >
          <Select.Option value="catalog">类别花费</Select.Option>
          <Select.Option value="total">总花费</Select.Option>
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
        <Button type="primary" onClick={() => getLineData()}>
          确定
        </Button>
      </div>
      <Divider />
      <Tag color="processing">单位: 元</Tag>
      <div className={style.chart}>
        <LineChart data={data} />
      </div>
    </div>
  )
}

export default Statistics
