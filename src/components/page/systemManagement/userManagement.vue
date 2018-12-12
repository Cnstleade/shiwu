<template>
    <div class="container">
        <el-row>
            <el-alert
              :title="title"
              :closable="false"
              type="info">
            </el-alert>           
        </el-row>  
        <el-row class="m20" >
            <el-col :span="2">
                    <el-button  icon="el-icon-plus" type="primary" @click="dialogVisible1=true">新增</el-button>
            </el-col>           
            <el-col  :span="22" class="col-flex-end">
                    <!-- <el-button-group>
                      <el-button :type="execeedtimeType==0?'info':''" @click="changeExeceedtimeType(0)">重置</el-button>
                      <el-button :type="execeedtimeType==1?'primary':''" @click="changeExeceedtimeType(1)">M1</el-button>
                      <el-button :type="execeedtimeType==2?'success':''" @click="changeExeceedtimeType(2)">M2</el-button>
                      <el-button :type="execeedtimeType==3?'warning':''" @click="changeExeceedtimeType(3)">M3</el-button>
                      <el-button :type="execeedtimeType==4?'danger':''" @click="changeExeceedtimeType(4)">M3+</el-button>
                    </el-button-group>     -->
                    <el-button  type="primary" @click="reset">重置</el-button>
                    <div class="l20">
                        <el-input
                        style="padding:0px 10px 0px 0px"
                          placeholder="用户名"
                          v-model="search.name"
                          clearable>
                        </el-input> 
                    </div>      
                    <el-select class="l20" v-model="search.deptId" placeholder="部门名称">
                      <el-option
                        v-for="item in DeptNameList"
                        :key="item.deptId"
                        :label="item.deptName"
                        :value="item.deptId">
                      </el-option>
                    </el-select>   
                    <el-select class="l20" v-model="search.sexx" placeholder="性别">
                      <el-option
                        v-for="(item,i) in age"
                        :key="i"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>                
                    <div class="l20">
                        <el-input
                        style="padding:0px 10px 0px 0px"
                          placeholder="手机号"
                          v-model="search.mobile"
                          clearable>
                        </el-input> 
                    </div>                                                                    
                    <el-button @click="handleSearch" class="l20" style="margin-left:20px" icon="el-icon-search"  type="success" circle></el-button>                                                                  
            </el-col>             
        </el-row> 
        <el-table
            :data="tableData"  
            border  
            ref="multipleTable" 
            tooltip-effect="dark"
             highlight-current-row style="width: 100%;font-weight:bold"
            class="m20"
            @selection-change="handleSelectionChange"
            v-loading="loading"
            id="eleTable"
          >
                   <el-table-column
              type="index"
              fixed
              align="center"
              width="55">
            </el-table-column>    
            <el-table-column prop="username" label="用户名" align="center" width="180" >
            </el-table-column>
            <el-table-column prop="staffName" label="真实姓名" align="center" width="180" >
            </el-table-column>
            <el-table-column prop="email" label="邮件" align="center" width="215" >
            </el-table-column>
            <el-table-column prop="mobile" label="手机号" align="center" width="180" >
            </el-table-column>
            <el-table-column prop="crateTime" label="添加时间" align="center" width="180" sortable>
              <template slot-scope="scope">
                    {{scope.row.crateTime|dateServer}}
                </template>                  
            </el-table-column>
            <el-table-column prop="ssex" label="用户性别" align="center" width="180" >
                <template slot-scope="scope">
                    <el-tag
                        :type="scope.row.ssex==0?'success':scope.row.ssex==1?'primary':'danger'"
                    >{{scope.row.ssex==0?'男':scope.row.ssex==1?'女':'保密'}}</el-tag>
                </template>                
            </el-table-column>
            <el-table-column prop="deptName" label="部门名称" align="center" width="230" >
   
            </el-table-column>                                                                        

                <el-table-column prop="cz"  align="center" label="操作" min-width="200"  >
                    <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="success"
                        @click="handleDeit(scope.$index, scope.row)"
                       >编辑</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                       >删除</el-button>                       
                    </template> 
                    
                </el-table-column>            
        </el-table>     
        <el-row class="m20" v-if="total>0">
             <div style="float:right">
                 <el-pagination
                   @current-change="handleCurrentChange"
                    @size-change="handleSizeChange"
                   :current-page="npage"
                    :page-sizes="[10, 20, 30, 40]"
                     :page-size="pagesize"
                   background
                   layout="total,sizes,prev, pager, next,jumper"
                   :total="total">
                 </el-pagination>   
             </div>
        </el-row> 
        <el-dialog
          title="新增用户"
          :visible.sync="dialogVisible1"
          center
          width="30%"
          id="xzjs"
          >
            <el-form :rules="rules" :model="ruleForm2" status-icon  ref="ruleForm2" label-width="100px" >
              <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm2.username" ></el-input>
              </el-form-item>
              <el-form-item label="真实姓名" prop="staffName">
                <el-input v-model="ruleForm2.staffName"></el-input>
              </el-form-item>  
              <el-form-item label="用户密码" prop="password">
                <el-input v-model="ruleForm2.password" ></el-input>
              </el-form-item>  
              <el-form-item label="手机号" prop="mobile">
                <el-input v-model="ruleForm2.mobile" ></el-input>
              </el-form-item>  
              <!-- <el-form-item label="邮件" >
                <el-input v-model="ruleForm2.email" ></el-input>
              </el-form-item>    -->
              <el-form-item label="用户状态" >
                <el-input   disabled placeholder="激活"></el-input>
              </el-form-item> 
              <!-- <el-form-item label="用户性别" prop="ssex">
                    <el-select  v-model="ruleForm2.ssex" placeholder="性别">
                      <el-option
                        v-for="item in age"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select> 
              </el-form-item>    -->
              <el-form-item label="部门名称" prop="deptId">
                    <el-select  v-model="ruleForm2.deptId" placeholder="部门名称">
                      <el-option
                        v-for="item in DeptNameList"
                        :key="item.deptId"
                        :label="item.deptName"
                        :value="item.deptId">
                      </el-option>
                    </el-select> 
              </el-form-item> 
              <el-form-item label="可选角色" prop="roles">
                <el-checkbox-group v-model="ruleForm2.roles">
                    <el-checkbox v-for="role in MenuList" :label="role.roleId" :key="role.roleId">{{role.roleName}}</el-checkbox>
                </el-checkbox-group>                
              </el-form-item>                                                                                                                 
              <el-form-item label="用户描述">
                <el-input type="textarea" v-model="ruleForm2.description"></el-input>
              </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                  <el-button @click="resetForm('ruleForm2')">重置</el-button>
                </el-form-item>
            </el-form>       
        </el-dialog>    
       <el-dialog
          title="编辑用户"
          :visible.sync="dialogVisible2"
          center
          width="30%"
          id="xzjs"
          >
            <el-form :rules="rules" :model="ruleForm3" status-icon  ref="ruleForm3" label-width="100px" >
              <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm3.username" ></el-input>
              </el-form-item>
              <el-form-item label="真实姓名" prop="staffName">
                <el-input v-model="ruleForm3.staffName"></el-input>
              </el-form-item>  
              <el-form-item label="用户密码" >
                <el-input v-model="ruleForm3.password" ></el-input>
              </el-form-item> 
              <!-- <el-form-item label="用户密码" prop="password">
                <el-input v-model="ruleForm3.password" ></el-input>
              </el-form-item>   -->
              <el-form-item label="手机号" prop="mobile">
                <el-input v-model="ruleForm3.mobile" ></el-input>
              </el-form-item>  
              <el-form-item label="邮件" >
                <el-input v-model="ruleForm3.email" ></el-input>
              </el-form-item>   
              <el-form-item label="用户状态" >
                <el-input   disabled placeholder="激活"></el-input>
              </el-form-item> 
              <el-form-item label="用户性别" >
                    <el-select  v-model="ruleForm3.ssex" placeholder="性别">
                      <el-option
                        v-for="item in age"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select> 
              </el-form-item>   
              <el-form-item label="部门名称" prop="deptId">
                    <el-select  v-model="ruleForm3.deptId" placeholder="部门名称">
                      <el-option
                        v-for="item in DeptNameList"
                        :key="item.deptId"
                        :label="item.deptName"
                        :value="item.deptId">
                      </el-option>
                    </el-select> 
              </el-form-item> 
              <el-form-item label="可选角色" prop="roles">
                <el-checkbox-group v-model="ruleForm3.roles">
                    <el-checkbox v-for="role in MenuList" :label="role.roleId" :key="role.roleId">{{role.roleName}}</el-checkbox>
                </el-checkbox-group>                
              </el-form-item>                                                                                                                 
              <el-form-item label="用户描述">
                <el-input type="textarea" v-model="ruleForm3.description"></el-input>
              </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm3')">提交</el-button>
                  <el-button @click="dialogVisible2=false">取消</el-button>
                </el-form-item>
            </el-form>       
        </el-dialog>                                           
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import {
  httpDeptNameList,
  httpUserList,
  httpUserAdd,
  httpUserDelete,
  httpRoleList,
  httpUserRoleList
} from "../../../service/http";
export default {
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value != null && value != "") {
        var reg = /^[a-zA-Z0-9_-]{4,16}$/;
        if (!reg.test(value)) {
          return callback(
            new Error("请输入4-16位包含大小写字母和数字的用户名！")
          );
        } else {
          callback();
        }
      } else {
        return callback(
          new Error("请输入4-16位包含大小写字母和数字的用户名！")
        );
      }
    };

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

    var validateEmail = (rule, value, callback) => {
      if (value != null && value != "") {
        var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        if (!reg.test(value)) {
          return callback(new Error("请输入正确邮箱！"));
        } else {
          callback();
        }
      } else {
        return callback(new Error("请输入正确邮箱！"));
      }
    };

    var validateMobile = (rule, value, callback) => {
      if (value != null && value != "") {
        var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9]|19[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9])\d{8}$/;
        if (!reg.test(value)) {
          return callback(new Error("请输入正确手机号码！"));
        } else {
          callback();
        }
      } else {
        return callback(new Error("请输入正确手机号码！"));
      }
    };
    return {
      title: "用户管理",
      search: {
        input: "",
        time: ""
      },
      tableData: [],
      loading: true,
      npage: 1,
      pagesize: 10,
      total: 0,
      multipleSelection: [], //全部选中嘛
      DeptNameList: [],
      age: [
        { label: "男", value: "0" },
        { label: "女", value: "1" },
        { label: "保密", value: "2" }
      ],
      roles: [
        { label: "系统管理员", value: "0" },
        { label: "女", value: "1" },
        { label: "保密", value: "2" }
      ],
      dialogVisible1: false,
      dialogVisible2: false,
      ruleForm2: {
        username: "",
        password: "",
        email: "",
        mobile: "",
        ssex: "",
        description: "",
        roles: [],
        status: "",
        deptId: "",
        staffName: ""
      },
      ruleForm3: {
        username: "",
        password: "",
        email: "",
        mobile: "",
        ssex: "",
        description: "",
        roles: [],
        status: "",
        deptId: "",
        staffName: ""
      },
      rules: {
        staffName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" }
        ],
        username: [
          { require: true, validator: validateUsername, trigger: "change" }
        ],
        password: [
          { require: true, validator: validatePassword, trigger: "change" }
        ],
        email: [{ require: true, validator: validateEmail, trigger: "change" }],
        mobile: [
          { require: true, validator: validateMobile, trigger: "change" }
        ],
        roles: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个角色",
            trigger: "change"
          }
        ],
        ssex: [{ required: true, message: "请选择性别", trigger: "change" }],
        deptId: [{ required: true, message: "请选择部门", trigger: "change" }]
      },
      roleList: [],
      MenuList: []
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    hasUser() {
      if (
        this.userInfo == "" &&
        this.userInfo == null &&
        this.userInfo == "undefined"
      ) {
        this.$message.error("当前登陆用户已失效，请重新登陆");
      //  this.$router.push("/login");
        return;
      }
    },
    //用户角色
    _httpUserRoleList(userId, row) {
      httpUserRoleList(userId, row)
        .then(res => {
          let data = res.data;
          if (data.code == 200) {
            let list = data.rows;
            let roles = list.filter((v, i, a) => {
              return v.checked;
            });
            let roleList = [];
            roles.forEach((v, i, a) => {
              roleList.push(v.roleId);
            });
            this.roleList = roleList;
            this.ruleForm3 = Object.assign({}, row, {
              roles: roleList
            });
            this.dialogVisible2 = true;
          } else if(data.code == 1000){
            this.$message.error(data.msg);
            this.$router.push("/login");
          }else if (data.code == 500) {
            this.$message.error(data.msg);
            this.$router.push("/login");
          }
        })
        // .catch(err => {
        //   console.log(err);
        //   let data = err.response ? err.response.data : {};

        //   if (data.message == "当前登陆用户已失效，请重新登陆") {
        //     this.$message.error(data.message);
        //   //  this.$router.push("/login");
        //   } else {
        //     this.$message.error("网络错误请联系管理员");
        //   }
        // });
    },
    //可选角色
    _httpMenuList() {
      this.hasUser();
      let _this = this;
      httpRoleList(1, 10000)
        .then(res => {
          let data = res.data;
          if (data.code == 200) {
            _this.MenuList = data.data.rows;
          } else if (data.code == 500) {
            this.$message.error(data.msg);
            this.$router.push("/login");
          } else {
            this.$message.error(data.msg);
          }
          this.init(this.npage, this.pagesize);
        })
        // .then(res => {
        //   let data = res.data;
        //   _this.MenuList = data.rows;
        // })
      //   .catch(err => {
      //     console.log(err);
      //     let data = err.response ? err.response.data : {};

      //     if (data.message == "当前登陆用户已失效，请重新登陆") {
      //       this.$message.error(data.message);
      // //      this.$router.push("/login");
      //     } else {
      //       this.$message.error("网络错误请联系管理员");
      //     }
      //     _this.tableData = [];
      //     _this.loading = false;
      //   });
    },
    init(pageNum, pageSize, Username, ssex, mobile, deptId) {
      this.hasUser();
      let _this = this;
      this.loading = true;
      httpUserList(pageNum, pageSize, Username, ssex, mobile, deptId)
        .then(res => {
          let data = res.data;
          if (data.code == 200) {
            _this.tableData = data.data.rows;
            _this.total = data.data.total;
            _this.loading = false;
          }else if(data.code == 1000){
            this.$message.error(data.msg);
            this.$router.push("/login");
          } else if (data.code == 500) {
            this.$message.error(data.msg);
            this.$router.push("/login");
          } else {
            _this.loading = false;
            this.$message.error(data.msg);
          }
        })
      //   .catch(err => {
      //     console.log(err);
      //     let data = err.response ? err.response.data : {};

      //     if (data.message == "当前登陆用户已失效，请重新登陆") {
      //       this.$message.error(data.message);
      //  //     this.$router.push("/login");
      //     } else {
      //       this.$message.error("网络错误请联系管理员");
      //     }
      //     _this.tableData = [];
      //     _this.loading = false;
      //   });
    },
    //得到部门列表
    _httpDeptNameList() {
      this.hasUser();
      let _this = this;
      httpDeptNameList()
        .then(res => {
          let data = res.data;
          if (data.code == 200) {
            _this.DeptNameList = data.data;
          }else if(data.code == 1000){
            this.$message.error(data.msg);
            this.$router.push("/login");
          } else if (data.code == 500) {
            this.$message.error(data.msg);
            this.$router.push("/login");
          } else {
            this.$message.error(data.msg);
          }
        })
      //   .catch(err => {
      //     console.log(err);
      //     let data = err.response ? err.response.data : {};

      //     if (data.message == "当前登陆用户已失效，请重新登陆") {
      //       this.$message.error(data.message);
      //  //     this.$router.push("/login");
      //     } else {
      //       this.$message.error("网络错误请联系管理员");
      //     }
      //   });
    },
    handleSearch() {
      this.init(
        this.npage,
        this.pagesize,
        this.search.name,
        this.search.sexx,
        this.search.mobile,
        this.search.deptId
      );
    },
    handleAllocation(index, row) {},
    handleCurrentChange(val) {
      this.npage = val;
      this.handleSearch();
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.handleSearch();
    },
    reset() {
      this.npage = 1;
      this.pagesize = 10;
      this.search = {};
        this.init(this.npage, this.pagesize);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // resetForm(formName) {
    //   console.log(this.$refs[formName]);
    //   formName = {};
    // },
    onSubmit(formName) {
      let _this = this;
      if (formName == "ruleForm2") {
        this.$jQuery.ajax({
          type: "post",
         //url: "http://localhost:8088/user/add",
       //url: "http://47.88.171.117:8088/user/add",
         url: "http://101.132.171.38:8088/user/add",
          data: {
            username: _this.ruleForm2.username,
            password: _this.ruleForm2.password,
            email: _this.ruleForm2.email,
            mobile: _this.ruleForm2.mobile,
            ssex: _this.ruleForm2.ssex,
            description: _this.ruleForm2.description,
            roles: _this.ruleForm2.roles,
            status: 1,
            deptId: _this.ruleForm2.deptId,
            staffName: _this.ruleForm2.staffName
          },
          success: function(data) {
            console.log(data);
            _this.resetForm("ruleForm2");
            if (data.code == 200) {
              _this.$message({
                message: data.msg,
                type: "success"
              });
              _this.dialogVisible1 = false;
              _this.init(this.npage, this.pagesize);
            } else if (data.code == 500) {
              this.$message.error(data.msg);
              this.$router.push("/login");
            } else {
              _this.$message.error(data.msg);
            }
          },
          error: response => {
            let data = response ? response.responseJSON : {};
            console.log(JSON.stringify(response));
            if (data.message == "当前登陆用户已失效，请重新登陆") {
              _this.$message.error(data.message);
      //        _this.$router.push("/login");
            } else {
              _this.$message.error("网络错误请联系管理员");
            }

            _this.resetForm("ruleForm2");
            _this.dialogVisible1 = false;
          }
        });
      } else {
        this.$jQuery.ajax({
          type: "post",
         //url: "http://localhost:8088/user/update",
        //url: "http://47.88.171.117:8088/user/update",
          url: "http://101.132.171.38:8088/user/update",
          data: {
            id: _this.ruleForm3.id,
            username: _this.ruleForm3.username,
            password: _this.ruleForm3.password,
            email: _this.ruleForm3.email,
            mobile: _this.ruleForm3.mobile,
            ssex: _this.ruleForm3.ssex,
            description: _this.ruleForm3.description,
            roles: _this.ruleForm3.roles,
            status: 1,
            deptId: _this.ruleForm3.deptId,
            staffName: _this.ruleForm3.staffName,
                 password: _this.ruleForm3.password,
          },
          success: function(data) {
            _this.resetForm("ruleForm3");
            if (data.code == 200) {
              _this.$message({
                message: data.msg,
                type: "success"
              });
              _this.dialogVisible2 = false;
              _this.init(this.npage, this.pagesize);
            } else if (data.code == 500) {
              this.$message.error(data.msg);
              this.$router.push("/login");
            } else {
              _this.$message.error(data.msg);
            }
          },
          error: response => {
            let data = response ? response.responseJSON : {};
            console.log(JSON.stringify(response));
            if (data.message == "当前登陆用户已失效，请重新登陆") {
              _this.$message.error(data.message);
         //     _this.$router.push("/login");
            } else {
              _this.$message.error("网络错误请联系管理员");
            }
            _this.resetForm("ruleForm3");
            _this.dialogVisible2 = false;
          }
        });
      }
    },
    submitForm(formName) {
      let _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          _this.onSubmit(formName);
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleDeit(index, row) {
      let _this = this;
      let id = row.id;
      this._httpUserRoleList(id, row);
      // this.ruleForm3 = Object.assign({}, row, {
      //   roles: [11]
      // });
      // this.dialogVisible2 = true;
    },
    handleDelete(index, row) {
      this.hasUser();
      let id = row.id;
      let _this = this;
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _this._httpUserDelete(id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    _httpUserDelete(ids) {
      this.hasUser();
      let _this = this;
      httpUserDelete(ids)
        .then(res => {
          let data = res.data;
          if (data.code == 200) {
            _this.$message({
              message: data.msg,
              type: "success"
            });
            _this.init(this.npage, this.pagesize);
          } else if(data.code == 1000){
            this.$message.error(data.msg);
            this.$router.push("/login");
          }else if (data.code == 500) {
            this.$message.error(data.msg);
            this.$router.push("/login");
          } else {
            _this.$message.error(data.msg);
          }
        })
        // .catch(err => {
        //   console.log(err);
        //   let data = err.response ? err.response.data : {};

        //   if (data.message == "当前登陆用户已失效，请重新登陆") {
        //     this.$message.error(data.message);
        //  //   this.$router.push("/login");
        //   } else {
        //     this.$message.error("网络错误请联系管理员");
        //   }
        // });
    }
  },
  mounted() {
    // this._httpDeptNameList();
    this.init(this.npage, this.pagesize);
    this._httpMenuList();
  },
  created() {
    this._httpDeptNameList();
  }
};
</script>

<style>
#xzjs .el-checkbox-group label {
  margin-left: 20px;
}
</style>
