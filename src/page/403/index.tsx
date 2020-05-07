import React from 'react'
import { Result, Button } from 'antd'

const Unathorized: React.FC = () => {
  return (
    <Result
      status="403"
      title="无法访问"
      subTitle="该页面只对Pro用户开放"
      extra={<Button type="primary">升级到Pro</Button>}
    ></Result>
  )
}

export default Unathorized
