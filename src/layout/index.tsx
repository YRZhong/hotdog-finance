import React, { Suspense, lazy, useState, useEffect, ReactNode } from 'react'
import { Link, Switch, Route, Redirect, useLocation, useHistory } from 'react-router-dom'
import { Layout, Menu, Avatar, Dropdown } from 'antd'
import {
  MoneyCollectOutlined,
  AlignLeftOutlined,
  SettingOutlined,
  LogoutOutlined,
  DownOutlined
} from '@ant-design/icons'
import { routeMap } from '@/route'
import style from './index.module.css'

interface MenuType {
  key: string
  title: string
  icon: ReactNode
  children?: MenuType[]
}

const { Header, Sider, Content } = Layout

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
  }
]

/**侧边栏组件 */
const Sidebar: React.FC<{}> = () => {
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
                <span>{item.title}</span>
              </Link>
            </Menu.Item>
          )
        })}
      </Menu>
    </Sider>
  )
}

/**Header组件 */
const MyHeader: React.FC<{}> = () => {
  const { Item } = Menu
  const history = useHistory()
  const handleLogout = () => {
    sessionStorage.removeItem('token')
    history.replace('/login')
  }
  const menu = () => {
    return (
      <Menu>
        <Item>
          <SettingOutlined /> 个人设置
        </Item>
        <Item
          onClick={() => {
            handleLogout()
          }}
        >
          <LogoutOutlined /> 退出登录
        </Item>
      </Menu>
    )
  }
  return (
    <Header className={style.header}>
      <div>
        <Avatar src="https://cdn.freebiesupply.com/logos/large/2x/react-1-logo-png-transparent.png" />
        {/* <span className={style.headerUserName}>test</span> */}
        <Dropdown overlay={menu} trigger={['click']}>
          <span className={style.headerUserName} onClick={(e) => e.preventDefault()}>
            Test User <DownOutlined />
          </span>
        </Dropdown>
      </div>
    </Header>
  )
}

/**Main Layout组件 */
const LayoutComponent: React.FC<{}> = () => {
  const loadComponent = (name: string) => lazy(() => import(`@/page/${name}`)) //动态引入组件
  const token = sessionStorage.getItem('token')
  useEffect(() => {
    console.log('token=====' + token)
  }, [token])
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout>
        <MyHeader />
        <Content className={style.mainContent}>
          <Suspense fallback={<div>loading...</div>}>
            <Switch>
              {token ? (
                routeMap.map((item) => {
                  return (
                    <Route
                      key={item.path}
                      path={item.path}
                      component={loadComponent(item.componentPath)}
                    ></Route>
                  )
                })
              ) : (
                <Redirect to="/login"></Redirect>
              )}
              <Redirect exact from="/" to="/bookKeep"></Redirect>
              <Route component={loadComponent('404/index')}></Route>
            </Switch>
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  )
}

export default LayoutComponent
