import React from 'react'
import { Result, Button } from 'antd'
import { useHistory } from 'react-router-dom'

const NotFount: React.FC = () => {
  const history = useHistory()
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="页面不存在"
        extra={
          <Button
            type="primary"
            onClick={() => {
              history.push('/bookKeep')
            }}
          >
            返回首页
          </Button>
        }
      ></Result>
    </div>
  )
}

export default NotFount
