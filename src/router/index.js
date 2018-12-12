import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  // mode:'history',
  routes: [{
      path: '/',
      redirect: '/login'
    },
    // {
    //   path: '/admin',
    //   component: resolve => require(['../components/common/Home.vue'], resolve),
    //   meta: {
    //     title: '自述文件'
    //   },
    //   children: [{
    //       path: '/',
    //       redirect: '/message'
    //     },
    //     {
    //       path: '/message',
    //       component: resolve => require(['../components/page/smsManagement/cycleShortMessage.vue'], resolve),
    //       meta: {
    //         title: '周期短信'
    //       }
    //     },
    //     {
    //       path: '/acyclicMessage',
    //       component: resolve => require(['../components/page/smsManagement/timingMessages.vue'], resolve),
    //       meta: {
    //         title: '定时短信'
    //       }
    //     }, 
    //     {
    //       path: '/marketing',
    //       component: resolve => require(['../components/page/smsManagement/marketingMessages.vue'], resolve),
    //       meta: {
    //         title: '营销短信'
    //       }
    //     },                
    //     {
    //       path: '/affair',
    //       component: resolve => require(['../components/page/transactionManagement/transactionManagement.vue'], resolve),
    //       meta: {
    //         title: '事务管理'
    //       }
    //     },  
    //     {
    //       path: '/logging',
    //       component: resolve => require(['../components/page/systemManagement/managementLog.vue'], resolve),
    //       meta: {
    //         title: '日志列表'
    //       }
    //     }, 
    //     {
    //       path: '/passwordManagement',
    //       component: resolve => require(['../components/page/systemManagement/passwordManagement.vue'], resolve),
    //       meta: {
    //         title: '密码修改'
    //       }
    //     },         
    //     {
    //       path: '/role',
    //       component: resolve => require(['../components/page/systemManagement/authorityManagement.vue'], resolve),
    //       meta: {
    //         title: '权限管理'
    //       }
    //     },         
    //     {
    //       path: '/user',
    //       component: resolve => require(['../components/page/systemManagement/userManagement.vue'], resolve),
    //       meta: {
    //         title: '用户管理'
    //       }
    //     },          
    //     {
    //       path: '/managementLog',
    //       component: resolve => require(['../components/page/systemManagement/managementLog.vue'], resolve),
    //       meta: {
    //         title: '日志管理'
    //       }
    //     },  
    //     {
    //       path: '/authorityManagement',
    //       component: resolve => require(['../components/page/systemManagement/authorityManagement.vue'], resolve),
    //       meta: {
    //         title: '权限管理'
    //       }
    //     },                                
    //   ]
    // },
    {
      path: '/login',
      component: resolve => require(['../components/page/Login.vue'], resolve)
    },
    {
      path: '/404',
      component: resolve => require(['../components/page/404.vue'], resolve)
    },
    {
      path: '/403',
      component: resolve => require(['../components/page/403.vue'], resolve)
    },
    // {
    //   path: '*',
    //   redirect: '/403'
    // },
    {
      path: '/admin',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      meta: {
        title: '自述文件'
      },
      children: [{
          path: '/',
          component: resolve => require(['../components/page/common.vue'], resolve),
          meta: {
            title: '个人主页'
          },
        },
        {
          path: '/message',
          component: resolve => require(['../components/page/smsManagement/cycleShortMessage.vue'], resolve),
          meta: {
            title: '周期短信',
            role: 'message'
          }
        },
        {
          path: '/acyclicMessage',
          component: resolve => require(['../components/page/smsManagement/timingMessages.vue'], resolve),
          meta: {
            title: '定时短信',
            role: 'acyclicMessage'
          }
        },
        {
          path: '/marketing',
          component: resolve => require(['../components/page/smsManagement/marketingMessages.vue'], resolve),
          meta: {
            title: '营销短信',
            role: 'marketing'
          }
        },
        {
          path: '/affair',
          component: resolve => require(['../components/page/transactionManagement/transactionManagement.vue'], resolve),
          meta: {
            title: '事务管理',
            role: 'affair'
          }
        },
        {
          path: '/logging',
          component: resolve => require(['../components/page/systemManagement/managementLog.vue'], resolve),
          meta: {
            title: '日志列表',
            role: 'logging'
          }
        },
        {
          path: '/passwordManagement',
          component: resolve => require(['../components/page/systemManagement/passwordManagement.vue'], resolve),
          meta: {
            title: '密码修改',
            role: 'passwordManagement'
          }
        },
        {
          path: '/role',
          component: resolve => require(['../components/page/systemManagement/authorityManagement.vue'], resolve),
          meta: {
            title: '权限管理',
            role: 'role'
          }
        },
        {
          path: '/user',
          component: resolve => require(['../components/page/systemManagement/userManagement.vue'], resolve),
          meta: {
            title: '用户管理',
            role: 'user'
          }
        },
        {
          path: '/managementLog',
          component: resolve => require(['../components/page/systemManagement/managementLog.vue'], resolve),
          meta: {
            title: '日志管理',
            role: 'managementLog'
          }
        },
        {
          path: '/authorityManagement',
          component: resolve => require(['../components/page/systemManagement/authorityManagement.vue'], resolve),
          meta: {
            title: '权限管理',
            role: 'authorityManagement'
          }
        },
      ]
    },
    {
      path: '/h5',
      component: resolve => require(['../components/H5/Home.vue'], resolve),
      meta: {
        title: '自述文件'
      },
      children: [{
          path: '/',
          redirect: 'cycleShortMessage'
        },
        {
          path: 'cycleShortMessage',
          component: resolve => require(['../components/H5/smsManagement/cycleShortMessage'], resolve),
          meta: {
            title: '周期短信'
          },
        },
        {
          path: 'cycleShortMessage/:id',
          component: resolve => require(['../components/H5/smsManagement/cycleShortDetail'], resolve),
          meta: {
            title: '周期短信'
          },
        }
      ]
    }
  ]

})
export const powerRouter = [{
  path: '/admin',
  component: resolve => require(['../components/common/Home.vue'], resolve),
  meta: {
    title: '自述文件'
  },
  children: [
    // {
    //   path: '/',
    //   redirect: '/message'
    // },
    {
      path: '/message',
      component: resolve => require(['../components/page/smsManagement/cycleShortMessage.vue'], resolve),
      meta: {
        title: '周期短信',
        role: 'message'
      }
    },
    {
      path: '/acyclicMessage',
      component: resolve => require(['../components/page/smsManagement/timingMessages.vue'], resolve),
      meta: {
        title: '定时短信',
        role: 'acyclicMessage'
      }
    },
    {
      path: '/marketing',
      component: resolve => require(['../components/page/smsManagement/marketingMessages.vue'], resolve),
      meta: {
        title: '营销短信',
        role: 'marketing'
      }
    },
    {
      path: '/affair',
      component: resolve => require(['../components/page/transactionManagement/transactionManagement.vue'], resolve),
      meta: {
        title: '事务管理',
        role: 'affair'
      }
    },
    {
      path: '/logging',
      component: resolve => require(['../components/page/systemManagement/managementLog.vue'], resolve),
      meta: {
        title: '日志列表',
        role: 'logging'
      }
    },
    {
      path: '/passwordManagement',
      component: resolve => require(['../components/page/systemManagement/passwordManagement.vue'], resolve),
      meta: {
        title: '密码修改',
        role: 'passwordManagement'
      }
    },
    {
      path: '/role',
      component: resolve => require(['../components/page/systemManagement/authorityManagement.vue'], resolve),
      meta: {
        title: '权限管理',
        role: 'role'
      }
    },
    {
      path: '/user',
      component: resolve => require(['../components/page/systemManagement/userManagement.vue'], resolve),
      meta: {
        title: '用户管理',
        role: 'user'
      }
    },
    {
      path: '/managementLog',
      component: resolve => require(['../components/page/systemManagement/managementLog.vue'], resolve),
      meta: {
        title: '日志管理',
        role: 'managementLog'
      }
    },
    {
      path: '/authorityManagement',
      component: resolve => require(['../components/page/systemManagement/authorityManagement.vue'], resolve),
      meta: {
        title: '权限管理',
        role: 'authorityManagement'
      }
    },
  ]

}];
