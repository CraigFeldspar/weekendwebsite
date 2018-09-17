import Vue from 'vue'
import Index from './index.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios)
Vue.use(BootstrapVue);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(Index)
})