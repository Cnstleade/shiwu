// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {
  powerRouter
} from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as custom from './config/dateFilter';
import axios from 'axios';
import Element from 'element-ui';
import jQuery from 'jquery'
import store from './store'
Vue.config.productionTip = false
Vue.use(Element, {
  size: 'small',
  zIndex: 3000
});
Vue.prototype.$axios = axios;
Vue.prototype.$jQuery = jQuery;
Object.keys(custom).forEach(key => {
  Vue.filter(key, custom[key])
})


/* eslint-disable no-new */
// router.beforeEach((to, from, next) => {
//   //NProgress.start();
//   if (to.path == '/login') {
//     sessionStorage.removeItem('hsjr_username');
//   }
//   let user = sessionStorage.getItem('hsjr_username');
//   if (!user && to.path != '/login') {
//     next({
//       path: '/login'
//     })
//   } else {
//     next()
//   }
// })
// 消除点击延迟
const FastClick = require('fastclick')
FastClick.attach(document.body)

// router.beforeEach((to, from, next) => {
//   if (store.getters.role) { //判断role 是否存在
//     let arr = Array.isArray(store.getters.role) ? store.getters.role : store.getters.role.split(',');

//     if (store.getters.newrouter.length !== 0) {
//       let ar = arr.concat(['admin', '404', '403', 'login'])
//       next();
//       if (ar.some(v => {
//           return to.fullPath.slice(1) == v
//         })) {
//         next();
//       } else {
//         next('/403')
//       }

//     } else {
//       let newrouter, roles = [];
//       arr.forEach(role => {
//         if (powerRouter[0].children.filter(route => {
//             if (route.meta) {
//               return route.meta.role == role
//             } else {
//               return true
//             }
//           })[0] !== undefined) {
//           roles.push(
//             powerRouter[0].children.filter(route => {
//               if (route.meta) {
//                 return route.meta.role == role
//               } else {
//                 return true
//               }
//             })[0]
//           )
//         }
//       })
//       newrouter = powerRouter
//       newrouter[0].children = roles;
//       router.addRoutes(newrouter) //添加动态路由
//       store.dispatch('Roles', newrouter).then(res => {
//         next({ ...to
//         })
//       }).catch(() => {

//       })
//     }
//   } else {
//     if (['/login'].indexOf(to.path) !== -1) {
//       next()
//     } else {
//       // sessionStorage.removeItem('hsjr_username');
//       next('/login')
//     }
//   }
//   // commit('UPDATE_DIRECTION', to)
//     store.dispatch('GetRouter', to).then(res => {

//     }).catch(() => {

//     })
// })
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
