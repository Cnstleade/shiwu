import axios from 'axios';
import Vue from 'vue';
import router from '../router'
import {
  Message
} from 'element-ui';
// import HzInterface from './config';
var qs = require('qs');
Vue.prototype.$message = Message;
//axios 配置
axios.defaults.timeout = 6000000;
//axios.defaults.baseURL = 'http://localhost:8088'; //本地服务器
//axios.defaults.baseURL = 'http://192.168.2.103:8088'; //本地服务器
//axios.defaults.baseURL = 'http://47.88.171.117:8088'; //本地服务器
axios.defaults.baseURL = 'http://101.132.171.38:8088'; //本地服务器
// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      if (error.response.data) {
        if (error.response.data.message == "当前登陆用户已失效，请重新登陆") {
          Message({
            message: '当前登陆用户已失效，请重新登陆',
            type: 'error',
            center: true
          });
          router.push("/login");
          return;
        } else {
          Message({
            message: '网络错误请联系管理员',
            type: 'error',
            center: true
          });
        }
      }
    }
    return Promise.reject(error.response ? error.response.data : error)
  });

//   /*密码修改*/
//   modifyPassword: '/user/updatePassword',

//   /*查询左侧树*/
//   queryLeftMenu: '/menu/getUserMenu',

//   /*查询短信列表接口*/
//   querySelectTbable: '/selectTable',

//   /*保存短信编辑接口*/
//   saveMessage: '/updateMessageAll',

//   /*撤销短信内容接口*/
//   repealMessage: '/deleteData',

//   /*删除短信列表接口*/
//   deleteData: '/deleteData',

//   /*短信模板下载*/
//   downloadMsgTemplete: '/common/msgTemplateDownload',

//   /*事务管理列表*/
//   queryAffairTable: '/selectAffairTable',

//   /*新增事务接口*/
//   addAffair: '/insertAffair',

//   /*修改事务接口*/
//   modifyAffair: '/updateAffair',

//   /*查询事务日志列表*/
//   queryAfairLog: '/selectAffairLogging',

//   /*删除事务日志*/
//   deleteAfairLog: '/delectAffairLogging',

//   /*事务完成*/
//   completeAffair: '/insertAffairLogging',

//   /*成员列表查询*/
//   queryPeopleList: 'user/UserNamelist',

//   /*查询用户列表*/
//   queryUserList: '/user/list',

//   /*新增用户信息*/
//   addUserInfo: '/user/add',

//   /*修改用户信息*/
//   modifyUserInfo: '/user/update',

//   /*删除用户信息*/
//   deleteUserInfo: '/user/delete',

//   /*获取用户权限*/
//   getUserAuthority: '/role/roleNamelist',

//   /*获取部门列表*/
//   getSectionList: '/dept/deptNamelist',

//   /*查询营销短信*/
//   queryMarkMessage: '/selectMarketingMsg',

//   /*查看已发送营销号码*/
//   lookSendOperatorMsg: '/selectByMarketingMsg',

//   /*发送短信*/
//   sendOperatorMessages: '/sendMarketMsg',

//   /*日志列表*/
//   logTableSelect: '/log/list',

//   /*权限列表*/
//   roleList: '/role/list',

//   /*新增权限*/
//   addRole: '/role/add',

//   /*保存新增权限*/
//   addUserRole: '/role/Useraddlist',

//   /*删除权限*/
//   deleteRole: '/role/delete',

//   /*保存删除权限*/
//   deleteUserRole: '/role/Userdeletelist',

//   /*菜单列表*/
//   menuList: '/menu/list',

//   /*用户列表*/
//   queryUserRoleList: '/role/Userlist',

//   /*修改角色权限*/
//   editRole: '/role/getRoleMenu',

//   /*保存修改角色权限*/
//   saveEditRole: 'role/update'

//   /*登录*/
export function httpLogin(username,
  password,
  code = 1231,
  rememberMe = false) {
  let data = {
    username,
    password,
    code,
    rememberMe
  };
  //console.log(data);
  return axios({
    url: "/login",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}


// //credit 获取验证码
// export function httpGifCode() {
//   return axios({
//     url: "/gifCode",
//     method: "get",
//     headers: {
//         'Content-type': 'image/gif'
//       },
//   })
// }

//   /*注册*/
export function httpUserRegister(username, password) {
  let data = {
    username,
    password
  };
  //console.log(data);
  return axios({
    url: "/user/regist",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

//   /*得到列表*/
export function httpGetUserMenu(userName) {
  let data = {
    userName
  };
  //console.log(data);
  return axios({
    url: "/menu/getUserMenu",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

//   /*得到事务管理*/
export function httpSelectAffairTable(pageNum,
  pageSize,
  name,
  type,
  createTime,
  commissionTime) {
  let data = {
    pageNum,
    pageSize,
    name,
    type,
    createTime,
    commissionTime
  };
  //console.log(data);
  return axios({
    url: "/selectAffairTable",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

//   /*得到代办人/
export function httpUserNamelist() {
  //console.log(data);
  return axios({
    url: "/user/UserNamelist",
    method: "get",

  })
}

//   /*得到日志/
export function httpSelectAffairLogging(affairId,
  pageNum,
  pageSize) {
  let data = {
    affairId,
    pageNum,
    pageSize
  };
  return axios({
    url: "/selectAffairLogging",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

// 提交完成信息

export function httpInsertAffairLogging(affairId,
  transatorId,
  affairName,
  transatorTime,
  money,
  discription) {
  let data = {
    affairId,
    transatorId,
    affairName,
    transatorTime,
    money,
    discription
  };
  return axios({
    url: "/insertAffairLogging",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

// 得到部门列表

export function httpDeptNameList() {

  return axios({
    url: "/dept/deptNamelist",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
  })
}

// 得到用户

export function httpUserList(pageNum,
  pageSize,
  Username,
  ssex,
  mobile, deptId) {
  let data = {
    pageNum,
    pageSize,
    Username,
    ssex,
    mobile,
    deptId
  };
  return axios({
    url: "/user/list",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

// 新增用户

export function httpUserAdd(username,
  password,
  email,
  mobile,
  ssex,
  description,
  roles,
  status,
  deptId,
  staffName) {
  let data = {
    username,
    password,
    email,
    mobile,
    ssex,
    description,
    roles,
    status,
    deptId,
    staffName
  };
  return axios({
    url: "/user/add",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}
// 删除用户

export function httpUserDelete(ids) {
  let data = {
    ids
  };
  return axios({
    url: "/user/delete",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}


// 查询周期性短信

export function httpGetPeriodicMessage(pageNumber, pageSize, keywords, startDate, endDate) {
  let data = {
    pageNumber,
    pageSize,
    keywords,
    startDate,
    endDate
  };
  return axios({
    url: "/sms/getPeriodicMessage",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

// 查询定时性短信

export function httpSelectTable(pageNum, pageSize, mobilePhone, sendStatus, messageContent, sendPlatform) {
  let data = {
    pageNum,
    pageSize,
    mobilePhone,
    sendStatus,
    messageContent,
    sendPlatform
  };
  return axios({
    url: "/apmsg/selectTable",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

// 查询新增定时短信

export function httpUpdateMessageAll(Id, senddatetime, mobilePhone, sendTime, sendStatus, reciverName, senderName, sendDate, remarks, sendPlatform, messageContent, messageType, signature) {
  let data = {
    Id,
    senddatetime,
    mobilePhone,
    sendTime,
    sendStatus,
    reciverName,
    senderName,
    sendDate,
    remarks,
    sendPlatform,
    messageContent,
    messageType,
    signature
  };
  return axios({
    url: "/apmsg/updateMessageAll",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

// 删除新增定时短信

export function httpApmsgDeleteData(ids) {
  let data = {
    ids
  };
  return axios({
    url: "/apmsg/deleteData",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

// 日志管理

export function httpLogList(pageNumber,
  pageSize) {
  let data = {
    pageNumber,
    pageSize
  };
  return axios({
    url: "/log/logList",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

// 权限管理

export function httpRoleList(pageNum,
  pageSize) {
  let data = {
    pageNum,
    pageSize
  };
  return axios({
    url: "/role/list",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

// 删除角色

export function httpRoleDeletet(ids) {
  let data = {
    ids
  };
  return axios({
    url: "/role/delete",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

// 所有角色

export function httpMenuList() {
  return axios({
    url: "/menu/list",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },

  })
}


// 得到角色的权限

export function httpRoleMenu(RoleId) {
  let data = {
    RoleId
  };
  return axios({
    url: "/role/getRoleMenu",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

//事务信息管理 / 新增周期短信接口

export function httpSmsPeriodicMessage(receiverName,
  messageType,
  sendDate,
  messageContent,
  endDate,
  signatureType,
  mobilePhone,
  sendTime,
  remarks,
  cycleType,
  beginDate) {
  let data = {
    receiverName,
    messageType,
    sendDate,
    messageContent,
    endDate,
    signatureType,
    mobilePhone,
    sendTime,
    remarks,
    cycleType,
    beginDate
  };
  return axios({
    url: "/sms/periodicMessage",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

//   /*得到代办人/
// export function httpDownload() {
//   //console.log(data);
//   return axios({
//     url: "/common/download",
//     method: "post",

//   })
// }

//事务信息管理 / 营销短信

export function httpSelectMarketingMsg(sendDate, pageNumber, pageSize, keywords) {
  let data = {
    sendDate,
    pageNumber,
    pageSize,
    keywords
  };
  return axios({
    url: "/sms/selectMarketingMsg",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

//事务信息管理 / 短信详情营销短信

export function httpFindMessageRecording(pageNum, pageSize, messagerId) {
  let data = {
    pageNum,
    pageSize,
    messagerId
  };
  return axios({
    url: "/apmsg/findMessageRecording",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

//   /*得到代办人/
export function httpFindAllSignature() {
  //console.log(data);
  return axios({
    url: "/apmsg/findAllSignature",
    method: "get",

  })
}

//事务信息管理 / 短信详情营销短信

export function httpDownload(fileName = 'messageTemplate') {
  let data = {
    fileName
  };
  return axios({
    url: "/common/download",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

//事务信息管理 / 查看周期短信详情接口

export function httpSmsDetails(id) {
  let data = {
    id
  };
  return axios({
    url: "/sms/details",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

//事务信息管理 / 撤销

export function httpSmsDelete(id) {
  let data = {
    id
  };
  return axios({
    url: "/sms/delete",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

//事务信息管理 / 更新事务

export function httpInsertAffair(name, commissionUser, commissionUserId, commissionTime, sendTime, type, stop, commissionAddres, mobile, endDate, startDate) {
  let data = {
    name,
    commissionUser,
    commissionUserId,
    commissionTime,
    sendTime,
    type,
    stop,
    commissionAddres,
    mobile,
    endDate,
    startDate
  };
  return axios({
    url: "/insertAffair",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}



// //credit /user/UserNamelist
// export function httpUserName() {
//   return axios({
//     url: "/user/UserNamelist",
//     method: "get",
//   })
// }


//事务信息管理 / 更新事务

export function httpUpdateAffair(id, name, commissionUser, commissionUserId, commissionTime, sendTime, type, stop, commissionAddres, mobile, endDate, startDate) {
  let data = {
    id,
    name,
    commissionUser,
    commissionUserId,
    commissionTime,
    sendTime,
    type,
    stop,
    commissionAddres,
    mobile,
    endDate,
    startDate
  };
  return axios({
    url: "/updateAffair",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

//事务完成

// export function httpInsertAffairLogging(affairId, transatorId, affairName, affairName, money, discription) {
//   let data = {
//     affairId,
//     transatorId,
//     affairName,
//     affairName,
//     money,
//     discription
//   };
//   return axios({
//     url: "/insertAffairLogging",
//     method: "post",
//     headers: {
//       'Content-type': 'application/x-www-form-urlencoded'
//     },
//     data: qs.stringify(data)
//   })
// }
//事务信息管理 / 更新事务

export function httpSendMarketMsg(oprator, sendDate, number, messageContent) {
  let data = {
    oprator,
    sendDate,
    number,
    messageContent
  };
  return axios({
    url: "/sms/sendMarketMsg",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

//事务信息管理 / 得到用户角色

export function httpUserRoleList(userId) {
  let data = {
    userId
  };
  return axios({
    url: "/userRole/list",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

//事务信息管理 / 得到用户角色

export function httpUpdatePassword(oldpassword, newPassword) {
  let data = {
    oldpassword,
    newPassword
  };
  return axios({
    url: "/user/updatePassword",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}


//事务信息管理 / 得到用户角色

export function httpUserDetail() {

  return axios({
    url: "/userDetail",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },

  })
}

//事务信息管理 / 得到用户角色

export function httpGetSianature() {

  return axios({
    url: "/affair/signature",
    method: "get",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },

  })
}


//事务信息管理 / 得到用户角色

export function httpGetaffairtype() {

  return axios({
    url: "/affair/type",
    method: "get",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },

  })
}


//事务信息管理 / 新增事务

export function httpPeriodic(
  content, commissionUserId, commissionTime, sendTime, remark, mobile, startDate, endDate, type, preDays, reminderType, affairTypeId, signatureId, signatureValue, commissionDay, id
) {
  let data = {
    content,
    commissionUserId,
    commissionTime,
    sendTime,
    remark,
    mobile,
    startDate,
    endDate,
    type,
    preDays,
    reminderType,
    affairTypeId,
    signatureId,
    signatureValue,
    commissionDay,
    id
  };
  return axios({
    url: "/affair/periodic",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

//事务信息管理 / 得到用户角色

export function httpAddAffairType(value) {
  let data = {
    value
  };
  return axios({
    url: "/affair/affairType",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

//事务信息管理 / 得到用户角色

export function httpAffairAffairs(pageNum, pageSize, keywords, startDate, endDate) {
  let data = {
    pageNum,
    pageSize,
    keywords,
    startDate,
    endDate
  };
  return axios({
    url: "/affair/affairs",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}


//事务信息管理 / code

export function httpLoginCode(code) {
  let data = {
    code
  };
  return axios({
    url: "/loginCode",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

//事务短信详情
export function httpAffairDetails(id, periodicType) {
  let data = {
    id,
    periodicType
  };
  return axios({
    url: "/affair/details",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

//事务短信详情
export function httpAffairLogging(affairId, description, money, transatorTime, file) {
  let data = {
    affairId,
    description,
    money,
    transatorTime,
    file
  };
  return axios({
    url: "/affair/affairLogging",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}


//事务短信详情
export function httpAffairDelete(id, periodicType) {
  let data = {
    id,
    periodicType
  };
  return axios({
    url: "/affair/delete",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

//后台管理模块 / admin 贷后管理 逾期列表展示 下拉点击查看详细信息
export function httpAffairAffairLogs(id) {
  return axios({
    url: "/affair/affairLogs",
    method: "get",
    params: {
      'id': id
    }
  })
}
