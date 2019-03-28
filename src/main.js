/* eslint-disable */
import Vue from "vue";
import App from "./App";
import VueRouter from 'vue-router'
import router from './route'

// import Chart from "chart.js";

import VueCharts from "vue-charts";
import VueChartkick from "vue-chartkick";
import Highcharts from "highcharts";
import VueResource from "vue-resource";
import Vuetify from "vuetify";
import 'vuetify/dist/vuetify.min.css';
import VueFire from 'vuefire'

Vue.use(VueChartkick, { adapter: Highcharts });
// Vue.use(VueRouter);
Vue.use(Vuetify);
Vue.use(VueCharts);
Vue.use(VueFire);
// Vue.use(Chart);

// const router = new VueRouter({

// });


Vue.use(VueResource);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
}).$mount(`#app`);
