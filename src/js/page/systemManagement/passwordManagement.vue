<template>
    <div>
        <box gap="100px 10px">
            <group label-width="140px" label-margin-right="2em" label-align="center">
                <x-input type="password" title="请输入原始密码" v-model="oldPassword"></x-input>                
                <x-input type="password" title="请输入新密码"  v-model="newPassword1"></x-input>
                <x-input type="password" title="请再次输入密码" v-model="newPassword2"></x-input>
                <x-button style="margin-top:20px" type="primary" action-type="button" @click.native="changePass">修改密码</x-button>
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
import { httpUpdatePassword } from "../../../service/http";
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
      oldPassword: null,
      newPassword1: null,
      newPassword2: null,
      show10: false,
      msg: ""
    };
  },
  methods: {
    ...mapMutations(["SET_ROLE", "IS_LOGIN"]),
    changePass() {
      if (
        this.oldPassword == null ||
        this.oldPassword == "" ||
        this.newPassword1 == null ||
        this.newPassword1 == "" ||
        this.newPassword2 == null ||
        this.newPassword2 == ""
      ) {
        this.show10 = true;
        this.msg = "请输入密码";
      } else {
        if (this.newPassword1 != this.newPassword2) {
          this.show10 = true;
          this.msg = "新密码不一致";
        } else {
          httpUpdatePassword(this.oldPassword, this.newPassword1).then(res => {
            let data = res.data;
            if (data.code == 200) {
              this.show10 = true;
              this.msg = data.msg;
            } else {
              this.show10 = true;
              this.msg = data.msg;
            }
          });
        }

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
  },
  mounted() {
    this.oldPassword = null;
    this.newPassword1 = null;
    this.newPassword2 = null;
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