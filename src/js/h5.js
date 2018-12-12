import Vue from 'vue'
import happ from './h5.vue'
import FastClick from 'fastclick'
// import '../config/rem'
import VueRouter from 'vue-router'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as custom from '../config/dateFilter';
import Element from 'element-ui';
import {
  httpLoginCode
} from "../service/http";
Vue.config.productionTip = false
Object.keys(custom).forEach(key => {
  Vue.filter(key, custom[key])
})
Vue.use(Element, {
  size: 'small',
  zIndex: 3000
});
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body);
  }, false);
}
document.addEventListener(
  'touchstart',
  function () {}, {
    passive: false
  });

router.beforeEach((to, from, next) => {
  if (window.location.search && !store.state.login) {
    // var parseQuery = function (query) {
    //   var reg = /([^ =& \s] + )[ = \s] * ([^ & \s] * )/g;
    //   var obj = {};
    //   while (reg.exec(query)) {
    //     obj[RegExp.$1] = RegExp.$2;
    //   }
    //   return obj;
    // }
    // var url = parseQuery("key0=a&key1=b&key2=c")
    // console.log(url)
    let code = window.location.search.slice(1).split('&')[0].split('=')[1]

    httpLoginCode(code).then(res => {
      let data = res.data;
      if (data.code == 200) {
        // store.commit('SET_ROLE', data.data);
        store.commit('SET_ROLE', data.data.join(','));
        store.commit('IS_LOGIN', true);
        next('/admin');
      } else {
        ElementUI.Message({
          type: 'error',
          message: data.msg
        })
        window.location.search='';
         next('/login');
      }
    })
  } else
  if (store.state.login) {
    // next();
    // var loca = window.location;
    // var baseUrl = loca.origin + loca.pathname;
    // window.location.href = baseUrl;        
    store.commit('GET_ROUTER', {
      path: to.fullPath.slice(1),
      role: to.meta.role,
      title: to.meta.title
    })
    next()

  } else {
    store.commit('GET_ROUTER', {
      path: '/login',
      role: 'login',
      title: '恒舜金融管理系统'
    })
    if (['/login'].indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }

  // if (to.fullPath.slice(1) == 'login') {
  //   next()
  // }
  // if (store.state.login) {
  //   next();
  // } else {
  //   next('/login')
  // }
  // else {
  //   
  // }
  // if (window.location.search) {
  //   console.log(window.location.search)
  //   next('/h5/cycleShortMessage')
  // }

})


/* eslint-disable no-new */
new Vue({
  el: '#happ',

  render: h => h(happ),
  components: {
    happ
  },
  store,
  router,
  template: '<happ/>'
})
