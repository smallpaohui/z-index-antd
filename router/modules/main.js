import test from './test'
import test2 from './test2'
import test3 from './test3'

export default {
  path: '/',
  component: () => import('@/components/main'),
  children: [test, test2, test3],
}
