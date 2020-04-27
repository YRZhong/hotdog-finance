export interface RouteMapType {
  path: string
  componentPath: string
  userType?: string
}

export const routeMap: RouteMapType[] = [
  {
    path: '/bookKeep',
    componentPath: 'bookKeep/index'
  },
  {
    path: '/record',
    componentPath: 'record/index'
  },
  {
    path: '/statistics',
    componentPath: 'statistics/index',
    userType: 'pro'
  },
  {
    path: '/403',
    componentPath: '403/index'
  },
  {
    path: '/404',
    componentPath: '404/index'
  }
]
