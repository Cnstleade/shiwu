<template>
  <div>
    <x-header :left-options="{showBack:login && router.role != 'admin'}" :right-options="{showMore:login}"  @on-click-more="showMenus = true">{{router.title}}</x-header>
    <div v-transfer-dom>
      <actionsheet @on-click-menu="click" :menus="menus" v-model="showMenus" show-cancel></actionsheet>
    </div>
  </div>
</template>

<script>
import { XHeader, Actionsheet, TransferDom } from "vux";
import { mapState, mapMutations } from "vuex";
export default {
  directives: {
    TransferDom
  },
  components: {
    XHeader,
    Actionsheet
  },
  data() {
    return {
      showMenus: false,
      menus: {
        admin: "个人中心",
        login: "退出"
      }
    };
  },
  watch: {
    // router(n, o) {
    //   if (!Array.prototype.some) {
    //     Array.prototype.some = function(fun /*, thisp*/) {
    //       var len = this.length;
    //       if (typeof fun != "function") throw new TypeError();
    //       var thisp = arguments[1];
    //       for (var i = 0; i < len; i++) {
    //         if (i in this && fun.call(thisp, this[i], i, this)) return true;
    //       }
    //       return false;
    //     };
    //   }
    //   let list = [],
    //     roleList = [],
    //     footerList;
    //   roleList = this.role.split(",");
    //   this.menus = {};
    //   this.menus = {
    //     admin: "个人中心",
    //     login: "退出"
    //   };
    //   if (this.router.path == "/login") {
    //     return list;
    //   }
    //   if (
    //     ["message", "acyclicMessage", "marketing"].some(v => {
    //       return roleList.includes(v);
    //     })
    //     // ["message", "acyclicMessage", "marketing"].indexOf(this.role) > -1
    //   ) {
    //     let list1 = {
    //       title: "短信管理",
    //       children: []
    //     };
    //     ["message", "acyclicMessage", "marketing"].forEach(v => {
    //       if (roleList.includes(v)) {
    //         list1.children.push(
    //           v == "message"
    //             ? { title: "周期短信", path: "message" }
    //             : v == "acyclicMessage"
    //               ? { title: "定时短信", path: "acyclicMessage" }
    //               : v == "marketing"
    //                 ? { title: "营销短信", path: "marketing" }
    //                 : null
    //         );
    //       }
    //     });
    //     list.push(list1);
    //   }
    //   if (
    //     ["affair"].some(v => {
    //       return roleList.includes(v);
    //     })
    //     // ["affair"].indexOf(this.role) > -1
    //   ) {
    //     let list2 = {
    //       title: "事务管理",
    //       children: []
    //     };
    //     ["affair"].forEach(v => {
    //       if (roleList.includes(v)) {
    //         list2.children.push(
    //           v == "affair"
    //             ? { title: "事务管理", path: "affair" }
    //             : // : v == "acyclicMessage"
    //               //   ? { title: "定时短信", path: "acyclicMessage" }
    //               //   : v == "marketing"
    //               //     ? { title: "营销短信", path: "marketing" }
    //               null
    //         );
    //       }
    //     });
    //     list.push(list2);
    //   }
    //   if (
    //     ["logging", "passwordManagement", "role", "user"].some(v => {
    //       return roleList.includes(v);
    //     })
    //     // ["logging", "passwordManagement", "role", "user"].indexOf(roleList) >
    //     // -1
    //   ) {
    //     let list3 = {
    //       title: "系统管理",
    //       children: []
    //     };
    //     ["logging", "passwordManagement", "role", "user"].forEach(v => {
    //       if (roleList.includes(v)) {
    //         list3.children.push(
    //           v == "logging"
    //             ? { title: "日志列表", path: "logging" }
    //             : v == "passwordManagement"
    //               ? { title: "密码修改", path: "passwordManagement" }
    //               : v == "role"
    //                 ? { title: "权限管理", path: "role" }
    //                 : v == "user" ? { title: "用户管理", path: "user" } : null
    //         );
    //       }
    //     });
    //     list.push(list3);
    //   }
    //   let path = this.router.role;
    //   if (path == "admin") {
    //     footerList = list.map((item, index) => ({
    //       title: item.title,
    //       path: item.children[0].path
    //     }));
    //     list.forEach(v => {
    //       this.menus[v.children[0].path] = v.title;
    //     });
    //   } else {
    //     let index;
    //     list.forEach((v, i) => {
    //       if (
    //         // v.children.some(s => {
    //         //   return s.path == path;
    //         // })
    //         v.children.indexOf(roleList) > -1
    //       ) {
    //         index = i;
    //       }
    //     });
    //     list[index].children.forEach(v => {
    //       this.menus[v.path] = v.title;
    //     });
    //     footerList = list[index].children.map((item, index) => ({
    //       title: item.title,
    //       path: item.path
    //     }));
    //   }
    // }
  },
  computed: {
    ...mapState(["router", "role", "login"])
    // roleList() {
    //   let list = [],
    //     roleLists = [],
    //     footerList;
    //   this.menus = {};
    //   this.menus = {
    //     admin: "个人中心",
    //     login: "退出"
    //   };
    //   roleLists = this.role.split(",");
    //   if (this.router.path == "/login") {
    //     return list;
    //   }
    //   if (
    //     ["message", "acyclicMessage", "marketing"].some(v => {
    //       return roleLists.includes(v);
    //     })
    //   ) {
    //     let list1 = {
    //       title: "短信管理",
    //       children: []
    //     };
    //     ["message", "acyclicMessage", "marketing"].forEach(v => {
    //       if (roleLists.includes(v)) {
    //         list1.children.push(
    //           v == "message"
    //             ? { title: "周期短信", path: "message" }
    //             : v == "acyclicMessage"
    //               ? { title: "定时短信", path: "acyclicMessage" }
    //               : v == "marketing"
    //                 ? { title: "营销短信", path: "marketing" }
    //                 : null
    //         );
    //       }
    //     });
    //     list.push(list1);
    //   }
    //   if (
    //     ["affair"].some(v => {
    //       return roleLists.includes(v);
    //     })
    //   ) {
    //     let list2 = {
    //       title: "事务管理",
    //       children: []
    //     };
    //     ["affair"].forEach(v => {
    //       if (roleLists.includes(v)) {
    //         list2.children.push(
    //           v == "affair"
    //             ? { title: "事务管理", path: "affair" }
    //             : // : v == "acyclicMessage"
    //               //   ? { title: "定时短信", path: "acyclicMessage" }
    //               //   : v == "marketing"
    //               //     ? { title: "营销短信", path: "marketing" }
    //               null
    //         );
    //       }
    //     });
    //     list.push(list2);
    //   }
    //   if (
    //     ["logging", "passwordManagement", "role", "user"].some(v => {
    //       return roleLists.includes(v);
    //     })
    //   ) {
    //     let list3 = {
    //       title: "系统管理",
    //       children: []
    //     };
    //     ["logging", "passwordManagement", "role", "user"].forEach(v => {
    //       if (roleLists.includes(v)) {
    //         list3.children.push(
    //           v == "logging"
    //             ? { title: "日志列表", path: "logging" }
    //             : v == "passwordManagement"
    //               ? { title: "密码修改", path: "passwordManagement" }
    //               : v == "role"
    //                 ? { title: "权限管理", path: "role" }
    //                 : v == "user" ? { title: "用户管理", path: "user" } : null
    //         );
    //       }
    //     });
    //     list.push(list3);
    //   }
    //   console.log(list);
    //   let path = this.router.role;
    //   if (path == "admin") {
    //     footerList = list.map((item, index) => ({
    //       title: item.title,
    //       path: item.children[0].path
    //     }));
    //     // list.forEach(v => {
    //     //   this.menus[v.children[0].path] = v.title;
    //     // });
    //   } else {
    //     let index;
    //     list.forEach((v, i) => {
    //       if (
    //         v.children.some(s => {
    //           return s.path == path;
    //         })
    //       ) {
    //         index = i;
    //       }
    //     });

    //     list[index].children.forEach(v => {
    //       this.menus[v.path] = v.title;
    //     });
    //     footerList = list[index].children.map((item, index) => ({
    //       title: item.title,
    //       path: item.path
    //     }));
    //   }

    //   footerList;
    //   return footerList;
    // }
  },
  mounted() {},
  methods: {
    ...mapMutations(["IS_LOGIN"]),
    click(key) {
      console.log(key);
      if (key == "login") {
        this.IS_LOGIN(false);
        var loca = window.location;
        var baseUrl = loca.origin + loca.pathname;
        window.location.href = baseUrl;
      } else if (key == "cancel") {
        return;
      } else {
        this.$router.push(`/${key}`);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/mixin";
</style>
