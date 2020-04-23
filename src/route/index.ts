interface RouteMap {
  path: string
  componentPath: string
}

export const routeMap: RouteMap[] = [
  {
    path: '/bookKeep',
    componentPath: 'bookKeep/index'
  },
  {
    path: '/record',
    componentPath: 'record/index'
  },
  {
    path: '/404',
    componentPath: '404/index'
  }
]