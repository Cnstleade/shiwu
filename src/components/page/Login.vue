<template>

  <div class="login-wrap">
    <div class="ms-title">
      恒舜金融事务和信息管理系统
    </div>
    <transition name="sw-login">
    <div class="ms-login" v-if="!show">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demp-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" v-model="ruleForm.password"
                    @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>
        <!-- <el-form-item prop="code">
          <el-row>
            <el-col :span='12'>
                <el-input type="password" placeholder="验证码" v-model="ruleForm.code"
                          @keyup.enter.native="submitForm('ruleForm')"></el-input>
            </el-col>
            <el-col :span="12" >
                <img src="../../assets/img/gifCode.gif" alt="">
            </el-col>
          </el-row>
        </el-form-item>  -->
        <el-form-item prop="rememberMe" >
          <el-col :span='12'>
            <el-checkbox v-model="ruleForm.rememberMe">记住我</el-checkbox>
          </el-col>
          <el-col :span="12" style="text-align:center">
            <!-- <el-button type="primary"  @click="changeShow('ruleForm')">去注册</el-button> -->
          </el-col>
        </el-form-item>               
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">
            登录
          </el-button>
          <p style="font-size:12px;line-height:30px;color:#999">
            Tips: 账户不存在或密码错误请联系管理员。
          </p>
        </div>
      </el-form>
    </div>
    </transition >
    <transition name="sw-register">
      <div class="ms-login ms-register" v-if="show">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demp-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" v-model="ruleForm.password"
                    @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>
        <el-form-item prop="passwordtwo">
          <el-input type="password" placeholder="再次输入密码" v-model="ruleForm.passwordtwo"
                    @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>        
        <!-- <el-form-item prop="code">
          <el-row>
            <el-col :span='12'>
                <el-input type="password" placeholder="验证码" v-model="ruleForm.code"
                          @keyup.enter.native="submitForm('ruleForm')"></el-input>
            </el-col>
            <el-col :span="12" >
                <img :src="gifCode" alt="">
            </el-col>
          </el-row>
        </el-form-item>  -->
        <el-form-item prop="rememberMe" >
          <el-col :span='12'>
            <el-checkbox v-model="ruleForm.rememberMe">记住我</el-checkbox>
          </el-col>
          <el-col :span="12" style="text-align:center">
            <el-button type="primary" @click="changeShow('ruleForm')">去登录</el-button>
          </el-col>
        </el-form-item>               
        <div class="login-btn">
          <el-button type="primary" @click="submitFormRegister('ruleForm')">
            注册
          </el-button>
          <p style="font-size:12px;line-height:30px;color:#999">
            Tips: 注册失败请联系管理员。
          </p>
        </div>
      </el-form>
    </div>
    </transition> 
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { httpLogin, httpUserRegister } from "../../service/http";
// import {config} from "../../util/config";
import { Message } from "element-ui";

export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      show: false,
      gifCode: "",
      ruleForm: {
        username: "",
        password: "",
        code: "",
        rememberMe: false
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        passwordtwo: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapMutations(["RECORD_USERINFO"]),
    //得到gif
    _httpGifCode() {
      // httpGifCode()
      //   .then(res => {
      //     console.log(res);
      //   })
      //   .catch();
      let _this = this;
      this.$jQuery.get("http://47.88.171.117:8088/gifCode", function(result) {
        _this.gifCode = result;
      });
    },
    _httpLogin(username, password, code, rememberMe) {
      httpLogin(username, password, code, rememberMe)
        .then(res => {
          let data = res.data;
          if (data.code == 200) {
            let info = {
              username,
              password,
             role: data.data
            };
            this.$store
              .dispatch("Logins", info)
              .then(re => {
                console.log("成功看");
              })
              .catch(err => {
                console.log("++++++++++++++++++++++++++++++" + err);
              });
            this.$message({
              message: "登录成功",
              type: "success"
            });
            let userInfo = username;
            this.RECORD_USERINFO(userInfo);
            // sessionStorage.setItem("hsjr_username", username);
            this.resetForm("ruleForm");
            this.$router.push("/admin");
            // this.$router.push({ path: "/" });
          } else if(data.code == 1000){
            this.$message.error(data.msg);
            this.$router.push("/login");
          }else if (data.code == 500) {
            this.$message.error(data.msg);
            this.$router.push("/login");
          } else {
            this.$message.error(data.msg);
          }
        })
        .catch(err => {
          let data = err.response ? err.response.data : {};

          if (data.message == "当前登陆用户已失效，请重新登陆") {
            this.$message.error(data.message);
          //  this.$router.push("/login");
          } else {
            console.log(err);
            this.$message.error("网络错误请联系管理员");
          }
        });
    },
    _httpUserRegister(username, password) {
      httpUserRegister(username, password)
        .then(res => {
          let data = res.data;
          if (data.code == 200) {
            this.$message({
              message: data.msg,
              type: "success"
            });
            this.changeShow("ruleForm");
          } else if(data.code == 1000){
            this.$message.error(data.msg);
            this.$router.push("/login");
          }else if (data.code == 500) {
            this.$message.error(data.msg);
            this.$router.push("/login");
          } else {
            this.$message.error(data.msg);
          }
        })
        // .catch(err => {
        //   let data = err.response ? err.response.data : {};

        //   if (data.message == "当前登陆用户已失效，请重新登陆") {
        //     this.$message.error(data.message);
        //    // this.$router.push("/login");
        //   } else {
        //     this.$message.error("网络错误请联系管理员");
        //   }
        // });
    },
    //清空数据
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //提交数据
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this._httpLogin(
            this.ruleForm.username,
            this.ruleForm.password,
            null,
            this.ruleForm.rememberMe
          );
        } else {
          return false;
        }
      });
    },
    //提交数据
    submitFormRegister(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this._httpUserRegister(
            this.ruleForm.username,
            this.ruleForm.password
          );
          this.resetForm(formName);
        } else {
          return false;
        }
      });
    },
    changeShow(formName) {
      this.show = !this.show;
      this.resetForm(formName);
    }
  },
  mounted() {}
};
</script>

<style>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background: #324157;
}

.ms-title {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -230px;
  text-align: center;
  font-size: 30px;
  color: #fff;
}

.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 200px;
  margin: -150px 0 0 -190px;
  padding: 40px;
  border-radius: 5px;
  background: #fff;
}
.ms-register {
  height: 260px;
}
.login-btn {
  text-align: center;
}

.login-btn button {
  width: 100%;
  height: 36px;
}
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.sw-register-enter-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.sw-register-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.sw-register-enter, .sw-register-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(100%);
  opacity: 0;
}
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.sw-login-enter-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.sw-login-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.sw-login-enter, .sw-login-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(-100%);
  opacity: 0;
}
</style>

