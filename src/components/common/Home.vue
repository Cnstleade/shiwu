<template>
    <div >

        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div v-if="show" class="content-box" :class="{'content-collapse':collapse}" >
            <v-tags></v-tags>
            <div class="content">
                <transition name="move" mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
        <div v-if="!show" style="margin:300px auto;width:100px">
          <div id="preloader_3"></div>
        </div>
    </div>
</template>

<script>
import vHead from "./Header.vue";
import vSidebar from "./Siderbar.vue";
import vTags from "./Tags.vue";
import bus from "../../config/bus";
export default {
  data() {
    return {
      collapse: false,
      error: true,
      show: false
    };
  },
  components: {
    vHead,
    vSidebar,
    vTags
  },
  created() {
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });
    bus.$on("error", msg => {
      this.error = msg;
      console.log(this.error);
    });
  },
  mounted() {
    setTimeout(() => {
      this.show = true;
    }, 2000);
  }
};
</script>

<style>
.content-box {
  position: absolute;
  left: 185px;
  right: 0px;
  top: 50px;
  bottom: 0;
  overflow-y: scroll;
  -webkit-transition: left 0.3s ease-in-out;
  transition: left 0.3s ease-in-out;
  background: #f0f0f0;
}
.content {
  width: auto;
  padding: 20px 10px;
}
.content-collapse {
  left: 65px;
}
#preloader_3 {
  position: relative;
}
#preloader_3:before {
  width: 20px;
  height: 20px;
  border-radius: 20px;
  background: blue;
  content: "";
  position: absolute;
  background: #9b59b6;
  -webkit-animation: preloader_3_before 1.5s infinite ease-in-out;
  -moz-animation: preloader_3_before 1.5s infinite ease-in-out;
  -ms-animation: preloader_3_before 1.5s infinite ease-in-out;
  animation: preloader_3_before 1.5s infinite ease-in-out;
}

#preloader_3:after {
  width: 20px;
  height: 20px;
  border-radius: 20px;
  background: blue;
  content: "";
  position: absolute;
  background: #2ecc71;
  left: 22px;
  -webkit-animation: preloader_3_after 1.5s infinite ease-in-out;
  -moz-animation: preloader_3_after 1.5s infinite ease-in-out;
  -ms-animation: preloader_3_after 1.5s infinite ease-in-out;
  animation: preloader_3_after 1.5s infinite ease-in-out;
}

@-webkit-keyframes preloader_3_before {
  0% {
    -webkit-transform: translateX(0px) rotate(0deg);
  }
  50% {
    -webkit-transform: translateX(50px) scale(1.2) rotate(260deg);
    background: #2ecc71;
    border-radius: 0px;
  }
  100% {
    -webkit-transform: translateX(0px) rotate(0deg);
  }
}
@-webkit-keyframes preloader_3_after {
  0% {
    -webkit-transform: translateX(0px);
  }
  50% {
    -webkit-transform: translateX(-50px) scale(1.2) rotate(-260deg);
    background: #9b59b6;
    border-radius: 0px;
  }
  100% {
    -webkit-transform: translateX(0px);
  }
}

@-moz-keyframes preloader_3_before {
  0% {
    -moz-transform: translateX(0px) rotate(0deg);
  }
  50% {
    -moz-transform: translateX(50px) scale(1.2) rotate(260deg);
    background: #2ecc71;
    border-radius: 0px;
  }
  100% {
    -moz-transform: translateX(0px) rotate(0deg);
  }
}
@-moz-keyframes preloader_3_after {
  0% {
    -moz-transform: translateX(0px);
  }
  50% {
    -moz-transform: translateX(-50px) scale(1.2) rotate(-260deg);
    background: #9b59b6;
    border-radius: 0px;
  }
  100% {
    -moz-transform: translateX(0px);
  }
}

@-ms-keyframes preloader_3_before {
  0% {
    -ms-transform: translateX(0px) rotate(0deg);
  }
  50% {
    -ms-transform: translateX(50px) scale(1.2) rotate(260deg);
    background: #2ecc71;
    border-radius: 0px;
  }
  100% {
    -ms-transform: translateX(0px) rotate(0deg);
  }
}
@-ms-keyframes preloader_3_after {
  0% {
    -ms-transform: translateX(0px);
  }
  50% {
    -ms-transform: translateX(-50px) scale(1.2) rotate(-260deg);
    background: #9b59b6;
    border-radius: 0px;
  }
  100% {
    -ms-transform: translateX(0px);
  }
}

@keyframes preloader_3_before {
  0% {
    transform: translateX(0px) rotate(0deg);
  }
  50% {
    transform: translateX(50px) scale(1.2) rotate(260deg);
    background: #2ecc71;
    border-radius: 0px;
  }
  100% {
    transform: translateX(0px) rotate(0deg);
  }
}
@keyframes preloader_3_after {
  0% {
    transform: translateX(0px);
  }
  50% {
    transform: translateX(-50px) scale(1.2) rotate(-260deg);
    background: #9b59b6;
    border-radius: 0px;
  }
  100% {
    transform: translateX(0px);
  }
}
</style>

