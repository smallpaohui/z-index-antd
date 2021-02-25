import { $get, $post } from './axios'
import { $ms, $me, $mi, $mw } from './message'
import { $valid } from './valid'

export default Vue => {
  Vue.mixin({
    data () {
      return {}
    },
    methods: {
      $get,
      $post,
      $ms,
      $me,
      $mi,
      $mw,
      $valid
    },
  })
}
