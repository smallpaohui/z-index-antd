let context = require.context('./modules', true, /\.js$/)
let childrenRoutes = context.keys().reduce((routes, filePath) => {
  routes.push(...context(filePath).default)
  return routes
}, [])


let routes = [
  {
    path: '/',
    component: () => import('@/components/main.vue'),
    children: childrenRoutes,
  },
  {
    path: '/login',
    component: () => import('@/components/login.vue'),
    meta: {
      need: true,
    },
  }, {
    path: '*',
    component: () => import('@/components/404.vue'),
  },
]

export default routes
