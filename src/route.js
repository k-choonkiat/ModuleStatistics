import SearchModules from "./components/searchModules.vue";
// import ProfilePage from "./components/ProfilePage.vue";
import singleModule from "./components/singleModule.vue";

import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);


export default new Router({
    routes:[ 
//   {
//     path: '/',
//     component: ProfilePage
//   },
  {
    path: '/searchModule',
    component: SearchModules
  },
  {
    path:"/module/:id",
    name: 'SingleModule',
    component: singleModule
  }
]
})