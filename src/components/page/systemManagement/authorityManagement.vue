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
                    <el-button  icon="el-icon-plus" type="primary" @click="dialogVisible1=true" >新增</el-button>
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
            id="text"
          >
                   <el-table-column
              type="index"
              fixed
              align="center"
              width="55">
            </el-table-column>    
            <el-table-column prop="roleName" label="角色名称" align="center" width="180"  >
   
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" align="center" width="160" sortable>
                 <template slot-scope="scope">
                    {{scope.row.createTime|dateServer}}
                </template>     
            </el-table-column>               
            <el-table-column prop="remark" label="描述" align="center" min-width="200" >
                      <template slot-scope="scope">
                          <el-tooltip class="item" effect="dark" :content="scope.row.remark" placement="top">
                              <span>{{scope.row.remark}}</span>
                          </el-tooltip>
                    </template> 
            </el-table-column>
                <el-table-column prop="cz"  align="center" label="操作"   width="260">
                    <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="primary"
                        @click="handleAllocation(scope.$index, scope.row)"
                       >修改角色菜单</el-button>
                                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDlete(scope.$index, scope.row)"
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
          title="新增角色"
          :visible.sync="dialogVisible1"
          center
          width="30%"
          id="xzjs"
          >
            <el-form   :rules="rules" :model="ruleForm" status-icon  ref="ruleForm" label-width="100px" >
              <el-form-item label="角色姓名" prop="username">
                <el-input v-model="ruleForm.username" ></el-input>
              </el-form-item>
              <el-form-item label="用户描述">
                <el-input type="textarea" v-model="ruleForm.description"></el-input>
              </el-form-item>              
              <el-form-item label="可选角色" prop="roles">
                <el-checkbox-group v-model="ruleForm.roles">
                    <el-checkbox v-for="role in MenuList" :label="role.menuId" :key="role.menuId">{{role.menuName}}</el-checkbox>
                </el-checkbox-group>                
              </el-form-item>                                                                                                                 
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">创建</el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>            
        </el-dialog>
       <el-dialog
          title="修改角色权限"
          :visible.sync="dialogVisible2"
          center
          width="30%"
          id="xzjs"
          >
            <el-form   :rules="rules" :model="ruleForm2" status-icon  ref="ruleForm2" label-width="100px" >
              <el-form-item label="角色姓名" >
                <el-input v-model="ruleForm2.roleName" ></el-input>
              </el-form-item>
              <el-form-item label="用户描述">
                <el-input type="textarea" v-model="ruleForm2.remark"></el-input>
              </el-form-item>              
              <el-form-item label="可选角色">
                <el-checkbox-group v-model="ruleForm2.roles">
                    <el-checkbox v-for="role in roles" :label="role.menuId" :key="role.menuId">{{role.menuName}}</el-checkbox>
                </el-checkbox-group>                
              </el-form-item>                                                                                                                 
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm2')">修改</el-button>
                  <el-button @click="resetForm('ruleForm2')">重置</el-button>
                </el-form-item>
            </el-form>            
        </el-dialog>                                             
    </div>
</template>

<script>
import {
  httpRoleList,
  httpRoleDeletet,
  httpMenuList,
  httpRoleMenu
} from "../../../service/http";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      title: "权限管理",
      search: {
        input: "",
        time: ""
      },
      tableData: [],
      loading: true,
      dialogVisible1: false,
      dialogVisible2: false,
      npage: 1,
      pagesize: 10,
      total: 0,
      multipleSelection: [], //全部选中嘛
      MenuList: [],
      ruleForm: {
        username: "",
        roles: [],
        description: ""
      },
      ruleForm2: {
        username: "",
        roles: [],
        description: ""
      },
      rules: {
        roles: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个角色",
            trigger: "change"
          }
        ]
      },
      roles: [],
      rolesCheck: []
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
    //    this.$router.push("/login");
        return;
      }
    },
    _httpRoleDeletet(ids) {
      this.hasUser();
      let _this = this;
      httpRoleDeletet(ids)
        .then(res => {
          let data = res.data;
          if (data.code == 200) {
            _this.$message({
              message: data.msg,
              type: "success"
            });
          } else if(data.code == 1000){
            this.$message.error(data.msg);
            this.$router.push("/login");
          }else if (data.code == 500) {
            this.$message.error(data.msg);
            this.$router.push("/login");
          } else {
            _this.$message.error(data.msg);
          }
          _this.getData(this.npage, this.pagesize);
        })
        // .catch(err => {
        //   let data = err.response ? err.response.data : {};

        //   if (data.message == "当前登陆用户已失效，请重新登陆") {
        //     this.$message.error(data.message);
        //  //   this.$router.push("/login");
        //   } else {
        //     console.log(err);
        //     this.$message.error("网络错误请联系管理员");
        //   }
        // });
    },
    _httpRoleMenu(id) {
      this.hasUser();
      let _this = this;
      this.roles.length = 0;
      httpRoleMenu(id)
        .then(res => {
          let data = res.data;
          _this.roles = data;
          _this.rolesCheck.length = 0;
          for (let a = 0; a < data.length; a++) {
            if (data[a].checked) {
              _this.rolesCheck.push(data[a].menuId);
            }
          }
          _this.dialogVisible2 = true;
        })
        // .catch(err => {
        //   let data = err.response ? err.response.data : {};

        //   if (data.message == "当前登陆用户已失效，请重新登陆") {
        //     this.$message.error(data.message);
        //  //   this.$router.push("/login");
        //   } else {
        //     console.log(err);
        //     this.$message.error("网络错误请联系管理员");
        //   }
        // });
    },
    _httpMenuList() {
      this.hasUser();
      let _this = this;
      httpMenuList()
        .then(res => {
          let data = res.data;
          if (data.code == 200) {
            _this.MenuList = data.data.rows;
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
        // //    this.$router.push("/login");
        //   } else {
        //     console.log(err);
        //     this.$message.error("网络错误请联系管理员");
        //   }
        // });
    },
    getData(pageNum, pageSize) {
      this.hasUser();
      let _this = this;
      httpRoleList(pageNum, pageSize)
        .then(res => {
          let data = res.data;
          if (data.code == 200) {
            _this.tableData = data.data.rows;
            _this.total = data.data.total;
            _this.loading = false;
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
        //     console.log(err);
        //     this.$message.error("网络错误请联系管理员");
        //   }
        //   _this.tableData = [];
        //   _this.loading = false;
        // });
    },
    handleSearch() {
      this.getData(this.npage, this.pagesize);
    },
    handleAllocation(index, row) {
      let id = row.roleId;
      this._httpRoleMenu(id);
      this.ruleForm2 = Object.assign({}, row, { roles: this.rolesCheck });
    },
    handleCurrentChange(val) {
      this.npage = val;
      this.handleSearch();
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.handleSearch();
    },
    reset() {
      this.search = null;
      this.getData();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    onSubmit(formName) {
      let _this = this;
      if (formName == "ruleForm") {
        this.$jQuery.ajax({
          type: "post",
      //url: "http://localhost:8088/role/add",
        //   url: "http://47.88.171.117:8088/role/add",
  url: "http://101.132.171.38:8088/role/add",  
          data: {
            roleName: this.ruleForm.username,
            remark: this.ruleForm.description,
            menuId: this.ruleForm.roles
          },
          success: function(data) {
            console.log(data);
            _this.resetForm("ruleForm");
            if (data.code == 200) {
              _this.$message({
                message: data.msg,
                type: "success"
              });
              _this.dialogVisible1 = false;
              _this.getData(this.npage, this.pagesize);
            } else if (data.code == 500) {
              _this.$message.error(data.msg);
              _this.$router.push("/login");
            } else {
              _this.$message.error(data.msg);
            }
          },
          error: function() {
            _this.$message.error("网络错误");
            _this.resetForm("ruleForm");
            _this.dialogVisible1 = false;
          }
        });
      } else {
        this.$jQuery.ajax({
          type: "post",
        //url: "http://localhost:8088/role/update",
         //  url: "http://47.88.171.117:8088/role/update",
         url: "http://101.132.171.38:8088/role/update",           
          data: {
            roleId: this.ruleForm2.roleId,
            roleName: this.ruleForm2.roleName,
            remark: this.ruleForm2.remark,
            menuId: this.ruleForm2.roles
          },
          success: function(data) {
            console.log(data);
            _this.resetForm("ruleForm2");
            if (data.code == 200) {
              _this.$message({
                message: data.msg,
                type: "success"
              });
              _this.dialogVisible2 = false;
            } else if (data.code == 500) {
              this.$message.error(data.msg);
              this.$router.push("/login");
            } else {
              _this.$message.error(data.msg);
            }
          },
          error: function() {
            _this.$message.error("网络错误");
            _this.resetForm("ruleForm2");
            _this.dialogVisible2 = false;
          }
        });
      }
    },
    handleDlete(index, row) {
      this.hasUser();
      let id = row.roleId;
      let _this = this;
      this.$confirm("此操作将永久撤销该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _this._httpRoleDeletet(id);
          // _this.getData(this.npage, this.pagesize);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消撤销"
          });
        });
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
    }
  },
  mounted() {
    this.getData(this.npage, this.pagesize);
    this._httpMenuList();
  }
};
</script>

<style>
#xzjs .el-checkbox-group label {
  margin-left: 20px;
}
#text .cell {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
