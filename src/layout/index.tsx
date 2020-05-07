import React, { Suspense, lazy, useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Layout } from 'antd'
import { routeMap, RouteMapType } from '@/route'
import Sidebar from '@/component/sidebar'
import HeaderBar from '@/component/header'
import style from './index.module.css'

const { Content } = Layout

/**Main Layout组件 */
const LayoutComponent: React.FC = () => {
  const loadComponent = (name: string) => lazy(() => import(`@/page/${name}`)) //动态引入组件
  const token = sessionStorage.getItem('token')
  const isPro = token?.startsWith('pro') || false //是否为Pro用户
  //判断登录和权限
  const AuthRoute: React.FC<RouteMapType> = ({ path, componentPath, userType = '' }) => {
    if (userType !== 'pro' || isPro)
      return <Route path={path} component={loadComponent(componentPath)}></Route>
    else return <Redirect to="/unathorized"></Redirect>
  }

  useEffect(() => {
    console.log('token=====' + token)
  }, [token])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar isPro={isPro} />
      <Layout>
        <HeaderBar isPro={isPro} />
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
              <Redirect exact from="/statistics" to="/pieChart"></Redirect>
              <Route component={loadComponent('404/index')}></Route>
            </Switch>
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  )
}

export default LayoutComponent
