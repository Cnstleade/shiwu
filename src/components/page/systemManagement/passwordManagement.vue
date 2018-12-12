<template>
    <div class="container" >
              <el-row>
            <el-alert
              title="密码修改"
              :closable="false"
              type="info">
            </el-alert>           
        </el-row>  
        <el-row class="m20">
            <el-col :span="8" :offset="5">
                <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                  <el-form-item label="旧密码" >
                    <el-input type="password" v-model="ruleForm2.oldPass" auto-complete="off"></el-input>
                  </el-form-item>                    
                  <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                  </el-form-item>
                </el-form>             
            </el-col>            
        </el-row>

    </div>
</template>

<script>
import { httpUpdatePassword } from "../../../service/http";
export default {
  data() {
    var validatePassword = (rule, value, callback) => {
      if (value != null && value != "") {
        var reg = /^[A-Za-z]+[0-9]+[A-Za-z0-9]*|[0-9]+[A-Za-z]+[A-Za-z0-9]*$/g;
        if (!reg.test(value)) {
          return callback(
            new Error("密码必须由6-16个英文字母和数字的字符串组成！")
          );
        } else {
          callback();
        }
      } else {
        return callback(
          new Error("密码必须由6-16个英文字母和数字的字符串组成！")
        );
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value != null && value != "") {
        var reg = /^[A-Za-z]+[0-9]+[A-Za-z0-9]*|[0-9]+[A-Za-z]+[A-Za-z0-9]*$/g;
        if (!reg.test(value)) {
          return callback(
            new Error("密码必须由6-16个英文字母和数字的字符串组成！")
          );
        } else {
          callback();
        }
      } else {
        return callback(
          new Error("密码必须由6-16个英文字母和数字的字符串组成！")
        );
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value != null && value != "") {
        var reg = /^[A-Za-z]+[0-9]+[A-Za-z0-9]*|[0-9]+[A-Za-z]+[A-Za-z0-9]*$/g;
        if (!reg.test(value)) {
          return callback(
            new Error("密码必须由6-16个英文字母和数字的字符串组成！")
          );
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      } else {
        return callback(
          new Error("密码必须由6-16个英文字母和数字的字符串组成！")
        );
      }
    };

    // var validatePass = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请输入密码"));
    //   } else {
    //     if (this.ruleForm2.checkPass !== "") {
    //       this.$refs.ruleForm2.validateField("checkPass");
    //     }
    //     callback();
    //   }
    // };
    // var validatePass2 = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请再次输入密码"));
    //   } else if () {

    //   } else {
    //     callback();
    //   }
    // };
    return {
      ruleForm2: {
        oldPass: "",
        pass: "",
        checkPass: ""
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        oldPass: [{ validator: validatePassword, trigger: "blur" }]
      }
    };
  },
  methods: {
    _httpUpdatePassword(oldpassword, newPassword) {
      httpUpdatePassword(oldpassword, newPassword)
        .then(res => {
          let data = res.data;
          if (data.code == 200) {
            this.$message({
              message: data.msg,
              type: "success"
            });
            this.resetForm("ruleForm2");
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
      //   .catch(err => {
      //     let data = err.response ? err.response.data : {};

      //     if (data.message == "当前登陆用户已失效，请重新登陆") {
      //       this.$message.error(data.message);
      // //      this.$router.push("/login");
      //     } else {
      //       this.$message.error("网络错误请联系管理员");
      //     }
      //   });
    },
    submitForm(formName) {
      let _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          _this._httpUpdatePassword(
            this.ruleForm2.oldPass,
            this.ruleForm2.pass
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
    
<style>
</style>
