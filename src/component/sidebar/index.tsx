import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Layout, Menu, Badge } from 'antd'
import {
  MoneyCollectOutlined,
  AlignLeftOutlined,
  AreaChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
  BarChartOutlined
} from '@ant-design/icons'
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
    icon: <AreaChartOutlined />,
    requirePro: true,
    children: [
      {
        key: 'pieChart',
        title: '类别分析',
        icon: <PieChartOutlined />
      },
      {
        key: 'barChart',
        title: '同比分析',
        icon: <BarChartOutlined />
      },
      {
        key: 'lineChart',
        title: '趋势分析',
        icon: <LineChartOutlined />
      }
    ]
  }
]

const { Sider } = Layout

const Sidebar: React.FC<{ isPro: boolean }> = ({ isPro }) => {
  const { pathname } = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const [defaultSelectedKey, setDefaultSelectedKey] = useState('')
  // const [subMenuOpen, setSubMenuOpen] = useState(false)
  const updateSidebarMenu = (pathname: string) => {
    setDefaultSelectedKey(pathname.split('/')[1] === '' ? 'bookKeep' : pathname.split('/')[1])
  }
  //监听url变化设置Link选中
  useEffect(() => {
    updateSidebarMenu(pathname)
  }, [pathname])

  const renderMenuItem = (item: MenuType) => {
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
  }

  const renderSubMenu = (item: MenuType) => {
    return (
      <Menu.SubMenu
        key={item.key}
        title={
          <span>
            {item.icon}
            {item.title}
          </span>
        }
      >
        {item.children?.map((children) => renderMenuItem(children))}
      </Menu.SubMenu>
    )
  }

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
      <div className={style.logo}>Hotdog Finance</div>
      <Menu
        theme="dark"
        mode="vertical"
        defaultSelectedKeys={[defaultSelectedKey]}
        selectedKeys={[defaultSelectedKey]}
      >
        {menu.map((item) => {
          return item.children && isPro ? renderSubMenu(item) : renderMenuItem(item)
        })}
      </Menu>
    </Sider>
  )
}

export default Sidebar
