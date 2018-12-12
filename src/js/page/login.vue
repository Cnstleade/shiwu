<template>
    <div>
        <box gap="100px 10px">
            <group label-width="140px" label-margin-right="2em" label-align="center">
                <x-input title="请输入账号" v-model="username"></x-input>
                <x-input type="password" title="请输入密码" v-model="password"></x-input>
                <x-button style="margin-top:20px" type="primary" action-type="button" @click.native="login">登录</x-button>
            </group>
        </box>
      <popup v-model="show10" position="top" :show-mask="false">
        <div class="position-vertical-demo">
            {{msg}}
        </div>
      </popup>        
    </div>
</template>

<script>
import { Box, XInput, Group, XButton, Popup } from "vux";
import { httpLogin } from "../../service/http";
import { mapMutations } from "vuex";
export default {
  components: {
    Box,
    XInput,
    Group,
    XButton,
    Popup
  },
  data() {
    return {
      username: null,
      password: null,
      show10: false,
      msg: ""
    };
  },
  methods: {
    ...mapMutations(["SET_ROLE", "IS_LOGIN"]),
    login() {
      if (
        this.username == null ||
        this.username == "" ||
        this.password == null ||
        this.password == ""
      ) {
        this.show10 = true;
        this.msg = "请输入账户或密码";
      } else {
        httpLogin(this.username, this.password).then(res => {
          let data = res.data;
          if (data.code == 200) {
            // this.SET_ROLE(data.data);
             this.SET_ROLE(data.data.join(','));
            this.IS_LOGIN(true);
            this.$router.push("/admin");
          } else {
            this.show10 = true;
            this.msg = data.msg;
          }
        });
        // .catch(err => {
        //   this.show10 = true;
        //   this.msg = "网络错误请联系管理员";
        // });
      }
    }
  },
  watch: {
    show10(val) {
      if (val) {
        setTimeout(() => {
          this.show10 = false;
        }, 1000);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.position-vertical-demo {
  background-color: #ffe26d;
  color: red;
  text-align: center;
  padding: 15px;
}
</style>