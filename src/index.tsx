import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Login from './page/login'
import LayoutComponent from './layout'
import * as serviceWorker from './serviceWorker'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  RouteComponentProps,
  withRouter
} from 'react-router-dom'

const App: React.FC<RouteComponentProps> = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Switch>
        <Route exact path="/login" component={Login}></Route>
        <Route path="/" component={LayoutComponent}></Route>
      </Switch>
    </Suspense>
  )
}

const AppComponent = React.memo(withRouter(App))

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Router forceRefresh={false}>
      <AppComponent />
    </Router>
  </ConfigProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
