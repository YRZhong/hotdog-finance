import { ReactNode, createElement } from 'react'
import {
  AlipayOutlined,
  WechatOutlined,
  CreditCardOutlined,
  PayCircleOutlined,
  AppstoreAddOutlined
} from '@ant-design/icons'

interface PaymentType {
  value: string
  label: string
  icon: ReactNode
}

export const Payment: PaymentType[] = [
  {
    value: 'alipay',
    label: '支付宝',
    icon: createElement(AlipayOutlined)
  },
  {
    value: 'wechatPay',
    label: '微信',
    icon: createElement(WechatOutlined)
  },
  {
    value: 'creditCard',
    label: '信用卡',
    icon: createElement(CreditCardOutlined)
  },
  {
    value: 'cash',
    label: '现金',
    icon: createElement(PayCircleOutlined)
  },
  {
    value: 'others',
    label: '其他',
    icon: createElement(AppstoreAddOutlined)
  }
]
