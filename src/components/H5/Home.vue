
<template>
<div class="home" >
  <div class="vux-demo-header-box">
    <x-header :left-options="leftOptions" :transition="headerTransition" :title="title" @on-click-title="scrollTop" :right-options="{showMore: true}" @on-click-more="showMore = true"></x-header>
  </div>
  
  <div class="home-box" style="height:100%">
    <keep-alive>
     <router-view></router-view>
    </keep-alive>
     
  </div>

    <tabbar>
      <tabbar-item>
        <img slot="icon" src="../../assets/img/img.jpg">
        <span slot="label">短信</span>
      </tabbar-item>
      <tabbar-item show-dot>
        <img slot="icon" src="../../assets/img/img.jpg">
        <span slot="label">事务</span>
      </tabbar-item>
      <tabbar-item badge="2">
        <img slot="icon"  src="../../assets/img/img.jpg">
        <img slot="icon-active"  src="../../assets/logo.png">
        <span slot="label">系统</span>
      </tabbar-item>
    </tabbar>
    <actionsheet v-model="showMore" :menus="menus1" @on-click-menu="click" show-cancel></actionsheet>
</div>

</template>


<script>
import { mapState } from "vuex";
import {
  ViewBox,
  XHeader,
  Tabbar,
  TabbarItem,
  Actionsheet,
  TransferDom,
  Icon
} from "vux";

export default {
  directives: {
    TransferDom
  },
  components: {
    ViewBox,
    XHeader,
    Tabbar,
    TabbarItem,
    Actionsheet
  },
  data() {
    return {
      showMore: false,
      menus1: {
        menu1: "个人中心",
        menu2: "退出"
      },
      isTabbarDemo: false,
      componentName: "",
      router: { path: "/h5" }
    };
  },
  computed: {
    //根据vuex 计算当前页的路由
    route() {
      // return this.$store.state.route
      return { path: "/h5" };
    },
    //计算左侧的回调
    leftOptions() {
      return {
        showBack: this.route.path !== "/h5"
      };
    },
    headerTransition() {
      return this.direction === "forward"
        ? "vux-header-fade-in-right"
        : "vux-header-fade-in-left";
    },
    //通过路由判断页面
    title() {
      if (this.route.path === "/h5") return "主页";
      if (this.route.path === "/h5/cycleShortMessage") return "周期短信";
      if (this.route.path === "/project/donate") return "Donate";
      if (this.route.path === "/demo") return "Demo list";
      return this.componentName ? `Demo/${this.componentName}` : "Demo/~~";
    },

    // ...mapState(["route"])
  },
  methods: {
    scrollTop() {
      //   this.$refs.viewbox.$refs.viewboxbody.scrollTop = 0;
    },
    click(key) {
      console.log(key);
    }
  },
  mounted() {

  }
};
</script>

<style lang="less">
@import "~vux/src/styles/1px.less";
@import "~vux/src/styles/close.less";
.home {
  position: relative;
  height: 100%;
  .vux-demo-header-box {
    z-index: 100;
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
  }
  .home-box {
    box-sizing: border-box;
    height: 100%;
    padding-bottom: 55px;
    padding-top: 46px;
    overflow: auto;
  }
  .vux-demo-tabbar {
    z-index: 100;
    position: absolute;
    width: 100%;
    bottom: 0;
    backdrop-filter: blur(10px);
    background-color: none;
    background: rgba(247, 247, 250, 0.5);
  }
  .demo-icon-22:before {
    content: attr(icon);
  }
}
</style>