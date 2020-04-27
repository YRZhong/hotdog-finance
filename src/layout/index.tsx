import React, { Suspense, lazy, useState, useEffect, ReactNode } from 'react'
import { Link, Switch, Route, Redirect, useLocation, useHistory } from 'react-router-dom'
import { Layout, Menu, Avatar, Dropdown, Badge, message } from 'antd'
import {
  MoneyCollectOutlined,
  AlignLeftOutlined,
  SettingOutlined,
  LogoutOutlined,
  DownOutlined,
  LineChartOutlined
} from '@ant-design/icons'
import { routeMap, RouteMapType } from '@/route'
import style from './index.module.css'

interface MenuType {
  key: string
  title: string
  icon: ReactNode
  children?: MenuType[]
  requirePro?: boolean
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
  },
  {
    key: 'statistics',
    title: '统计',
    icon: <LineChartOutlined />,
    requirePro: true
  }
]

/**侧边栏组件 */
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

/**Header组件 */
const MyHeader: React.FC<{ isPro: boolean }> = ({ isPro }) => {
  const userName: string = sessionStorage.getItem('token') || ''
  const { Item } = Menu
  const history = useHistory()
  const handleLogout = () => {
    sessionStorage.removeItem('token')
    history.replace('/login')
    message.info('已退出登录')
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
        {isPro ? (
          <Badge count={'Pro'}>
            <Avatar className={style.avatar}>{userName.slice(0, 1).toUpperCase()}</Avatar>
          </Badge>
        ) : (
          <Avatar className={style.avatar}>{userName.slice(0, 1).toUpperCase()}</Avatar>
        )}
        <Dropdown overlay={menu} trigger={['click']}>
          <span className={style.headerUserName} onClick={(e) => e.preventDefault()}>
            {userName} <DownOutlined />
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
  //判断登录和权限
  const isPro = token?.startsWith('pro') || false //是否为Pro用户
  const AuthRoute: React.FC<RouteMapType> = ({ path, componentPath, userType = '' }) => {
    if (userType !== 'pro' || isPro)
      return <Route key={path} path={path} component={loadComponent(componentPath)}></Route>
    else return <Redirect to="/403"></Redirect>
  }

  useEffect(() => {
    console.log('token=====' + token)
  }, [token])
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar isPro={isPro} />
      <Layout>
        <MyHeader isPro={isPro} />
        <Content className={style.mainContent}>
          <Suspense fallback={<div>loading...</div>}>
            <Switch>
              {token ? (
                routeMap.map((item) => {
                  return (
                    <AuthRoute
                      path={item.path}
                      componentPath={item.componentPath}
                      userType={item.userType || ''}
                      key={item.path}
                    />
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
