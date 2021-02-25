let context = require.context('./modules', true, /\.js$/)
let childrenRoutes = context.keys().map(filePath => context(filePath).default)


let routes = [
  {
    path: '/',
    component: () => import('@/components/main.vue'),
    children: childrenRoutes,
  },
  {
    path: '/login',
    component: () => import('@/components/login.vue'),
  }, {
    path: '*',
    component: () => import('@/components/404.vue'),
  },
]

export default routes
