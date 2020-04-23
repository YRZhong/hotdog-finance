import React, { Suspense, lazy, useState, useEffect, ReactNode } from 'react'
import { Link, Switch, Route, Redirect, useLocation, useHistory } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { MoneyCollectOutlined, AlignLeftOutlined } from '@ant-design/icons'
import { routeMap } from '../route'
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
      <div className={style.logo}>Hotdog</div>
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

/**Main Layout组件 */
const LayoutComponent: React.FC<{}> = () => {
  const loadComponent = (name: string) => lazy(() => import(`../page/${name}`)) //动态引入组件
  const token = sessionStorage.getItem('token')
  useEffect(() => {
    console.log('token=====' + token)
  }, [token])
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout className={style.siteLayout} style={{ padding: '0 24px 24px' }}>
        <Header className={style.siteLayout} style={{ padding: 0 }}></Header>
        <Content>
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
