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
    path: '/pieChart',
    componentPath: 'statistics/pieChart/index',
    userType: 'pro'
  },
  {
    path: '/barChart',
    componentPath: 'statistics/barChart/index',
    userType: 'pro'
  },
  {
    path: '/lineChart',
    componentPath: 'statistics/lineChart/index',
    userType: 'pro'
  },
  {
    path: '/Unathorized',
    componentPath: '403/index'
  },
  {
    path: '/404',
    componentPath: '404/index'
  }
]
