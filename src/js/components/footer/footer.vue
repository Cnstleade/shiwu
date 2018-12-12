<template>
  <div>
    <tabbar  v-if="login">
      <template v-for="(temp,index) in roleList">
        <tabbar-item :link="'/'+temp.path" :key="index">
          <img slot="icon"  src="../../../assets/logo.png">
          <span slot="label">{{temp.title}}</span>
        </tabbar-item>        
      </template>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Group, Cell } from "vux";

import { mapState } from "vuex";
export default {
  components: {
    Tabbar,
    TabbarItem,
    Group,
    Cell
  },
  data() {
    return {
      roleList: []
    };
  },
  watch: {
    router(n, o) {
      if (!Array.prototype.some) {
        Array.prototype.some = function(fun /*, thisp*/) {
          var len = this.length;
          if (typeof fun != "function") throw new TypeError();

          var thisp = arguments[1];
          for (var i = 0; i < len; i++) {
            if (i in this && fun.call(thisp, this[i], i, this)) return true;
          }

          return false;
        };
      }
      let list = [],
        roleList = [],
        footerList;
        roleList = this.role.split(',');
      if (this.router.path == "/login") {
        return list;
      }
      if (
        ["message", "acyclicMessage", "marketing"].some(v => {
          return roleList.includes(v);
        })
        // roleList
        //   .forEach(v => {})
        //   [("message", "acyclicMessage", "marketing")].indexOf(roleList) > -1
      ) {
        let list1 = {
          title: "短信管理",
          children: []
        };
        ["message", "acyclicMessage", "marketing"].forEach(v => {
          if (roleList.includes(v)) {
            list1.children.push(
              v == "message"
                ? { title: "周期短信", path: "message" }
                : v == "acyclicMessage"
                  ? { title: "定时短信", path: "acyclicMessage" }
                  : v == "marketing"
                    ? { title: "营销短信", path: "marketing" }
                    : null
            );
          }
        });
        list.push(list1);
      }
      if (
        ["affair"].some(v => {
          return roleList.includes(v);
        })
        // ["affair"].indexOf(roleList) > -1
      ) {
        let list2 = {
          title: "事务管理",
          children: []
        };
        ["affair"].forEach(v => {
          if (roleList.includes(v)) {
            list2.children.push(
              v == "affair"
                ? { title: "事务管理", path: "affair" }
                : // : v == "acyclicMessage"
                  //   ? { title: "定时短信", path: "acyclicMessage" }
                  //   : v == "marketing"
                  //     ? { title: "营销短信", path: "marketing" }
                  null
            );
          }
        });
        list.push(list2);
      }
      if (
        ["logging", "passwordManagement", "role", "user"].some(v => {
          return roleList.includes(v);
        })
        // ["logging", "passwordManagement", "role", "user"].indexOf(this.role) >

        // -1
      ) {
        let list3 = {
          title: "系统管理",
          children: []
        };
        ["logging", "passwordManagement", "role", "user"].forEach(v => {
          if (roleList.includes(v)) {
            list3.children.push(
              v == "logging"
                ? { title: "日志列表", path: "logging" }
                : v == "passwordManagement"
                  ? { title: "密码修改", path: "passwordManagement" }
                  : v == "role"
                    ? { title: "权限管理", path: "role" }
                    : v == "user" ? { title: "用户管理", path: "user" } : null
            );
          }
        });
        list.push(list3);
      }
      let path = this.router.role;
      if (path == "admin") {
        footerList = list.map((item, index) => ({
          title: item.title,
          path: item.children[0].path
        }));
      } else {
        let index;
        list.forEach((v, i) => {
          if (
            v.children.some(s => {
              return s.path == path;
            })
            // v.children.indexOf(this.role) > -1
          ) {
            index = i;
          }
        });
        footerList = list[index].children.map((item, index) => ({
          title: item.title,
          path: item.path
        }));
      }
      this.roleList = footerList;
    }
  },
  computed: {
    ...mapState(["router", "role", "login"])
    // roleList() {
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
    //     footerList;
    //   if (this.router.path == "/login") {
    //     return list;
    //   }
    //   if (
    //     ["message", "acyclicMessage", "marketing"].some(v => {
    //       return this.role.includes(v);
    //     })
    //   ) {
    //     let list1 = {
    //       title: "短信管理",
    //       children: []
    //     };
    //     ["message", "acyclicMessage", "marketing"].forEach(v => {
    //       if (this.role.includes(v)) {
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
    //       return this.role.includes(v);
    //     })
    //   ) {
    //     let list2 = {
    //       title: "事务管理",
    //       children: []
    //     };
    //     ["affair"].forEach(v => {
    //       if (this.role.includes(v)) {
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
    //       return this.role.includes(v);
    //     })
    //   ) {
    //     let list3 = {
    //       title: "系统管理",
    //       children: []
    //     };
    //     ["logging", "passwordManagement", "role", "user"].forEach(v => {
    //       if (this.role.includes(v)) {
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
    //     footerList = list[index].children.map((item, index) => ({
    //       title: item.title,
    //       path: item.path
    //     }));
    //   }

    //   return footerList;
    // }
  },
  mounted() {
    this.$nextTick(function() {});
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/mixin";
</style>
