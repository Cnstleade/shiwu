import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/sms',
      redirect: '/message'
    },
    {
      path: '/message',
      component: resolve => require(['../page/smsManagement/cycleShortMessage.vue'], resolve),
      meta: {
        title: '周期短信',
        role: 'message'
      }
    },
    {
      path: '/message/:id',
      component: resolve => require(['../page/smsManagement/cycleDetail.vue'], resolve),
      meta: {
        title: '短信详情',
        role: 'message'
      }
    },
    {
      path: '/acyclicMessage',
      component: resolve => require(['../page/smsManagement/timingMessages.vue'], resolve),
      meta: {
        title: '定时短信',
        role: 'acyclicMessage'
      }
    },
    {
      path: '/acyclicMessage/:id',
      component: resolve => require(['../page/smsManagement/timeDetail'], resolve),
      meta: {
        title: '短信详情',
        role: 'acyclicMessage'
      },
    },
    {
      path: '/marketing',
      component: resolve => require(['../page/smsManagement/marketingMessages.vue'], resolve),
      meta: {
        title: '营销短信',
        role: 'marketing'
      }
    },
    {
      path: '/affair',
      component: resolve => require(['../page/transactionManagement/transactionManagement.vue'], resolve),
      meta: {
        title: '事务管理',
        role: 'affair'
      }
    },
    {
      path: '/affairDes/:id',
      component: resolve => require(['../page/transactionManagement/affairDes.vue'], resolve),
      meta: {
        title: '描述详情',
        role: 'affair'
      }
    },
    {
      path: '/affair/:id',
      component: resolve => require(['../page/transactionManagement/transactionManagementDetai.vue'], resolve),
      meta: {
        title: '事务详情',
        role: 'affair'
      }
    },    
    {
      path: '/affairD/:id',
      component: resolve => require(['../page/transactionManagement/affairAdd.vue'], resolve),
      meta: {
        title: '增加事务描述',
        role: 'affair'
      }
    },
    {
      path: '/login',
      component: resolve => require(['../page/login.vue'], resolve),
      meta: {
        title: '恒舜金融管理系统',
        role: 'login'
      }
    },
    {
      path: '/admin',
      component: resolve => require(['../page/common.vue'], resolve),
      meta: {
        title: '个人主页',
        role: 'admin'
      }
    },
    {
      path: '/admin/:data',
      component: resolve => require(['../page/common.vue'], resolve),
      meta: {
        title: '个人主页',
        role: 'admin'
      }
    },
    {
      path: '/logging',
      component: resolve => require(['../page/systemManagement/managementLog.vue'], resolve),
      meta: {
        title: '日志列表',
        role: 'logging'
      }
    },
    {
      path: '/passwordManagement',
      component: resolve => require(['../page/systemManagement/passwordManagement.vue'], resolve),
      meta: {
        title: '密码修改',
        role: 'passwordManagement'
      }
    },
    {
      path: '/role',
      component: resolve => require(['../page/systemManagement/authorityManagement.vue'], resolve),
      meta: {
        title: '权限管理',
        role: 'role'
      }
    },
    {
      path: '/user',
      component: resolve => require(['../page/systemManagement/userManagement.vue'], resolve),
      meta: {
        title: '用户管理',
        role: 'user'
      }
    },
  ],
  mode: 'hash',
  strict: process.env.NODE_ENV !== 'production',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return {
        x: 0,
        y: to.meta.savedPosition || 0
      }
    }
  }
})
