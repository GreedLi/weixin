import Vue from 'vue'
import App from './app.vue'
import store from './store/store'

Vue.config.productionTip = false;

App.mpType = 'app'
// 将store对象放置在vue原型上
Vue.prototype.$store = store

const app = new Vue(App)


app.$mount()