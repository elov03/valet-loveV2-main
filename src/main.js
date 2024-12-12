
import Vue from 'vue'
import App from './App'
import router from './router'
// npm install axios@0.25.0 
import axios from 'axios';

axios.defaults.withCredentials = true; // PASSPORT
Vue.prototype.$http = axios;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: (h) => h(App),
  components: { App },
  template: '<App/>',
  mounted() {
    console.log('Vue.js app mounted');
  }
})





