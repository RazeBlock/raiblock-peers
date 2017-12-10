// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'element-ui/lib/theme-chalk/index.css'
import 'leaflet/dist/leaflet.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import Vue2Leaflet from 'vue2-leaflet'

Vue.component('v-map', Vue2Leaflet.Map)
Vue.component('v-tilelayer', Vue2Leaflet.TileLayer)
Vue.component('v-marker', Vue2Leaflet.Marker)
Vue.component('v-popup', Vue2Leaflet.Popup)
window.L.Icon.Default.imagePath = '/static/images/'

Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
