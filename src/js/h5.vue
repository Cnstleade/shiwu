<template>
 <div id="happ " style="height:100%;">
    <view-box body-padding-top="45px" body-padding-bottom="60px" >
      <head-top  style="width:100%;position:absolute;left:0;top:0;z-index:100;"></head-top>
        <div  >
		      <transition name="router-fade" mode="out-in">
		      	<keep-alive>
		      	    <router-view ></router-view>
		      	</keep-alive>
          </transition> 
        </div>
      <footer-bottom style="width:100%;position:absolute;left:0;bottom:0;z-index:100;"></footer-bottom>
     </view-box>
 </div>
</template>
<script>
import { ViewBox } from "vux";
import headTop from "./components/header/header";
import footerBottom from "./components/footer/footer";
export default {
  name: "happ",
  data() {
    return {
      msg: "I am h5"
    };
  },
  components: {
    headTop,
    footerBottom,
    ViewBox
  }
};
</script>
<style lang="scss">
@import "./style/common";
.router-fade-enter-active,
.router-fade-leave-active {
  transition: opacity 0.3s;
}
.router-fade-enter,
.router-fade-leave-active {
  opacity: 0;
}
</style>