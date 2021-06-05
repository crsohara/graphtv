import Vue from 'vue'
import App from './App.vue'
import HighchartsVue from "highcharts-vue";
import query from '/src/services/Query'

import "./assets/app.scss";

Vue.use(HighchartsVue);

Vue.$query = query
Object.defineProperty(Vue.prototype, '$query', {
  get () {
    return query
  }
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
