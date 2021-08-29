import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import dayJs from 'dayjs'
// import 'element-ui/lib/theme-chalk/index.css'

// 加载全局样式
import './styles/index.scss'

Vue.use(ElementUI, {
  size: 'small'
})

Vue.config.productionTip = false
Vue.prototype.$dayJs = dayJs
Vue.filter('formatTime', function (val: string) {
  return dayJs(val).format('YYYY-MM-DD HH:mm:ss')
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
