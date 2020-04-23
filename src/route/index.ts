interface RouteMap {
  path: string
  componentPath: string
}

export const routeMap: RouteMap[] = [
  {
    path: '/',
    componentPath: 'bookKeep/index'
  },
  {
    path: '/bookKeep',
    componentPath: 'bookKeep/index'
  },
  {
    path: '/record',
    componentPath: 'record/index'
  }
]