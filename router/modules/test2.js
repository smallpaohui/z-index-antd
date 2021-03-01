export default [
  {
    path: '/test2',
    component: () => import('@/components/test2'),
    meta: {
      name: '测试2',
    },
  }, {
    path: '/test2/add',
    component: () => import('@/components/add'),
    meta: {
      name: '新增',
      hide: true,
      menuKey: '/test2',
    },
  },
]
