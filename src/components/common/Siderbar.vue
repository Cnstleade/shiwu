<template>
    <div class="sidebar" id="sidebar" v-if="items">
        <!-- <el-menu class="sidebar-el-menu"  :default-active="onRoutes" :collapse="collapse" background-color="#324157"
                 text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened="true" router default-openeds="['url1','url2','affair']">
            <template v-for="item in items">
                <template v-if="item.children">
                    <el-submenu :index="item.url" :key="item.id">
                        <template slot="title">
                            <i class="iconfont" :class="item.icon"></i><span slot="title">{{ item.text }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.children" :key="i" :index="subItem.url">
                            <i :class="subItem.icon"></i><span slot="title">{{subItem.text}}</span>
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.url" :key="item.id">
                        <i class="iconfont" :class="item.icon"></i><span slot="title">{{ item.text }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu> -->
    <el-menu
    class="sidebar-el-menu"
    :collapse="collapse"
      @open="handleOpen"
      @close="handleClose"
      background-color="#324157"
      text-color="#bfcbd9" active-text-color="#20a0ff" 
      :default-active="onRoutes"
      router
      :default-openeds="arr"
      >
      <template v-for="item in items">
        <template v-if="item.children.length">
            <el-submenu :index="item.url" :key="item.id">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.text}}</span>
              </template>
              <el-menu-item-group>
                  <el-menu-item v-for="(subItem,i) in item.children" :key="i" :index="subItem.url">
                      <i :class="subItem.icon"></i><span slot="title">{{subItem.text}}</span>
                  </el-menu-item>                
              </el-menu-item-group>
            </el-submenu>
        </template>
        <template v-else-if="item.children.length == 0">
          <el-menu-item :index="item.url" :key="item.id">
            <i :class="item.icon" ></i>
            <span slot="title">{{item.text}}</span>
          </el-menu-item>          
        </template>
      </template>
      <!-- <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item> -->
    </el-menu>        
    </div>
</template>

<script>
import bus from "../../config/bus";
import { httpGetUserMenu } from "../../service/http";
export default {
  data() {
    return {
      collapse: false,
      items: [],
      arr: ["url1", "url2", "affair"]
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  },
  methods: {
    init() {
      let username = sessionStorage.getItem("hsjr_username");
      let _this = this;
      httpGetUserMenu(username)
        .then(res => {
          let data = res.data;
          if (data.code == 200) {
            _this.items = data.data.children;
          }else if (data.code == 500) {
            this.$message.error(data.msg);
            this.$router.push("/login");
          }else if(data.code == 1000){
            this.$message.error(data.msg);
            this.$router.push("/login");
          }
          console.log(_this.items);
        })
        .catch(err => {
          let data = err.response ? err.response.data : {};

          if (data.message == "当前登陆用户已失效，请重新登陆") {
            this.$message.error(data.message);
            this.$router.push("/login");
          } else {
            this.$message.error("网络错误请联系管理员");
          }
        });
    },
    getHttpGetCreditMenuList() {
      let _this = this;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  mounted() {
    // this.getHttpGetCreditMenuList();
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    this.init();
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });
  }
};
</script>
<style>
#sidebar .el-submenu__title,
.el-menu-item {
  font-size: 12px;
  height: 36px;
  line-height: 36px;
}
#sidebar .el-submenu .el-menu-item {
  font-size: 12px;
  height: 36px;
  line-height: 36px;
  padding-left: 20px;
  min-width: 160px;
}
#sidebar .el-menu-item-group__title {
  display: none;
}
#sidebar .el-upload--text {
  height: 36px;
}
</style>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 50px;
  bottom: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 185px;
}
.sidebar > ul {
  height: 100%;
}

.iconfont {
  margin-right: 5px;
}
</style>

