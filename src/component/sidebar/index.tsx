import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { Layout, Menu, Badge } from 'antd'
import { MoneyCollectOutlined, AlignLeftOutlined, LineChartOutlined } from '@ant-design/icons'
import style from './index.module.css'

interface MenuType {
  key: string
  title: string
  icon: React.ReactNode
  children?: MenuType[]
  requirePro?: boolean
}

//测试数据
const menu: MenuType[] = [
  {
    key: 'bookKeep',
    title: '记账',
    icon: <MoneyCollectOutlined />
  },
  {
    key: 'record',
    title: '账单记录',
    icon: <AlignLeftOutlined />
  },
  {
    key: 'statistics',
    title: '统计',
    icon: <LineChartOutlined />,
    requirePro: true
  }
]

const { Sider } = Layout

const Sidebar: React.FC<{ isPro: boolean }> = ({ isPro }) => {
  const { pathname } = useLocation()
  const { listen } = useHistory()
  const [defaultSelectedKey, setDefaultSelectedKey] = useState('')
  const [collapsed, setCollapsed] = useState(false)
  const updateSidebarMenu = (pathname: string) => {
    setDefaultSelectedKey(pathname.split('/')[1] === '' ? 'bookKeep' : pathname.split('/')[1])
  }

  useEffect(() => {
    updateSidebarMenu(pathname)
    return listen((location) => {
      updateSidebarMenu(location.pathname)
    })
  }, []) //eslint-disable-line

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
      <div className={style.logo}>Hotdog Finance</div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[defaultSelectedKey]}
        selectedKeys={[defaultSelectedKey]}
      >
        {menu.map((item) => {
          return (
            <Menu.Item key={item.key}>
              <Link to={`/${item.key}`}>
                {item.icon}
                <span>
                  {item.title}
                  {item.requirePro && !isPro ? (
                    <Badge style={{ marginLeft: '10px' }} count={'Pro'} />
                  ) : null}
                </span>
              </Link>
            </Menu.Item>
          )
        })}
      </Menu>
    </Sider>
  )
}

export default Sidebar
