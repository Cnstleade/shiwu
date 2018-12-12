<template>
    <div class="container">
        <el-row>
            <el-alert
              :title="title"
              :closable="false"
              type="info">
            </el-alert>           
        </el-row>  
        <el-row class="m20  col-flex-end" >
          
             <el-button class="l20 " type="danger" @click="download" size="small" >下载模板</el-button>
        
            <div class="l20 ">                            
                  <el-upload
                    class="upload-demo flex"
                    ref="upload"
                    action="123"
                    :before-upload="beforeAvatarUpload"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                    <!-- <div slot="tip" class="el-upload__tip">上传格式为"txt"或"xsl"文件</div> -->
                  </el-upload>                
            </div>   
           
              <el-button style="margin-left: 10px;" size="small" type="success" @click="dialogVisible1=true">批量发送短信</el-button>
            
            
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
                          placeholder="请输入关键字"
                          v-model="search.input"
                          clearable>
                        </el-input> 
                    </div>   
                    <el-date-picker
                      v-model="search.time1"
                       value-format="yyyy-MM-dd"
                      style="width:160px"
                    class="l20"
                      type="date"
                      placeholder="发送日期">
                    </el-date-picker>                     
                    <!-- <el-select class="l20" v-model="search.sendPlatform" placeholder="发送平台">
                      <el-option
                        v-for="item in sendPlatform"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>                                                       -->
                    <!-- <el-date-picker
                    style="width:340px"
                    class="l20"
                      v-model="search.time"
                      type="daterange"
                      value-format="yyyy-MM-dd"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>  -->
    <el-date-picker
    class="l20"
      v-model="search.time"
         value-format="yyyy-MM-dd"
      type="date"
      placeholder="选择日期">
    </el-date-picker>                    
                    <el-button @click="handleSearch" class="l20" style="margin-left:20px" icon="el-icon-search"  type="success" circle></el-button>                                                                  
                    
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
 <el-table-column prop="id" label="编号" fixed align="center" sortable></el-table-column>
            <el-table-column prop="messageContent" label="发送内容" align="center" ></el-table-column>
            <el-table-column prop="sendPlatform" label="发送平台" align="center" 
             :filters="[{ text: '华信', value: '1' }, { text: '创蓝', value: '2' }]" :filter-method="filterSendPlatform" filter-placement="bottom-end"
                    >
                    <template slot-scope="scope">
                        <el-tag style="margin-left: 10px" :type="scope.row.sendStatus ===1?'success':'danger'">
                          {{ scope.row.sendPlatform ===1?'华信':'创蓝' }}
                        </el-tag>
                    </template> 

            </el-table-column> 
            <el-table-column prop="sendDate" label="发送时间" align="center" sortable></el-table-column>
                <!-- <el-table-column prop="cz"  align="center" label="操作"   >
                    <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="success"
                        @click="handleAllocation(scope.$index, scope.row)"
                       >分配</el-button>
                    </template> 
                </el-table-column>             -->
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
          title="批量发送短信"
          :visible.sync="dialogVisible1"
          center
          width="50%"
          >
            <el-form  :rules="rules" :model="ruleForm" status-icon  ref="ruleForm" label-width="100px" >
              <el-form-item label="服务商" prop="oprator">
                <el-select v-model="ruleForm.oprator" placeholder="请选择活动区域">
                    <el-option
                       v-for="item in oprator"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="发送数量" prop='number'>
                <el-input v-model="ruleForm.number"></el-input>
              </el-form-item>  
           

         
              <el-form-item label="发送时间" prop="sendDate">
                <el-col :span="11">
                  <el-date-picker type="date" 
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期" 
                  v-model="ruleForm.sendDate" 
                  style="width: 100%;"></el-date-picker>
                </el-col>
              </el-form-item>
        <el-form-item label="发送内容">
                <el-input type="textarea" v-model="ruleForm.messageContent"></el-input>
              </el-form-item>    
               <el-form-item>
                  <el-button type="primary" @click="onSubmit">提交</el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>                        
            </el-form>
        </el-dialog>                              
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import axios from "axios";
import {
  httpSelectMarketingMsg,
  httpSendMarketMsg
} from "../../../service/http";
import { timeFormat } from "../../../config/time";
export default {
  data() {
    var validateMoney = (rule, value, callback) => {
      if (value != null && value != "") {
        var reg = /^\d+$/;
        if (!reg.test(value) || value < 500 || value > 20000) {
          return callback(new Error("最少发送500次且最多发送20000次！"));
        } else {
          callback();
        }
      } else {
        return callback(new Error("最少发送500次且最多发送20000次！"));
      }
    };
    return {
      oprator: [
        { label: "中国移动", value: 1 },
        { label: "中国联通 ", value: 2 },
        { label: "中国电信", value: 3 }
      ],
      dialogVisible1: false,
      title: "营销短信",
      search: {
        input: "",
        sendPlatform: "",
        time: ""
      },
      ruleForm: {},
      tableData: [],
      fileList: [],
      sendPlatform: [{ label: "华信", value: 2 }, { label: "创蓝", value: 1 }],
      loading: true,
      npage: 1,
      pagesize: 10,
      total: 0,
      multipleSelection: [], //全部选中嘛
      rules: {
        sendDate: [{ required: true, message: "请输入时间", trigger: "blur" }],
        name: [{ required: true, message: "请输入事务名称", trigger: "blur" }],
        reciverName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" }
        ],
        senderName: [{ message: "请输入真实姓名", trigger: "blur" }],
        number: [{ require: true, validator: validateMoney, trigger: "blur" }],
        roles: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个角色",
            trigger: "change"
          }
        ],
        signature: [
          {
            required: true,
            message: "请选择发送签名",
            trigger: "change"
          }
        ],
        ssex: [{ required: true, message: "请选择性别", trigger: "change" }],
        deptId: [{ required: true, message: "请选择部门", trigger: "change" }],
        sendStatus: [
          { required: true, message: "请选择状态", trigger: "change" }
        ],
        oprator: [
          { required: true, message: "请选择服务商", trigger: "change" }
        ],
        messageType: [
          { required: true, message: "请选择发送平台", trigger: "change" }
        ]
      }
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
        //   this.$router.push("/login");
        return;
      }
    },
    _httpSendMarketMsg(oprator, sendDate, number, messageContent) {
      httpSendMarketMsg(oprator, sendDate, number, messageContent).then(res => {
        let data = res.data;
        if (data.code == 200) {
          this.$message({
            message: data.msg,
            type: "success"
          });
          this.getData("", this.npage, this.pagesize);
        } else if(data.code == 1000){
            this.$message.error(data.msg);
            this.$router.push("/login");
          }else if (data.code == 500) {
          this.$message.error(data.msg);
          this.$router.push("/login");
        } else {
          this.$message.error(data.msg);
        }
      });
      // .catch(err => {
      //   let data = err.response ? err.response.data : {};

      //   if (data.message == "当前登陆用户已失效，请重新登陆") {
      //     this.$message.error(data.message);
      //     //      this.$router.push("/login");
      //   } else {
      //     this.$message.error("网络错误请联系管理员");
      //   }
      // });
    },
    getData(sendDate, pageNumber, pageSize, keywords) {
      this.hasUser();
      let _this = this;
      this.loading = true;
      httpSelectMarketingMsg(sendDate, pageNumber, pageSize, keywords).then(
        res => {
          let data = res.data;
          if (data.code == 200) {
            // this.$message({
            //   message: data.msg,
            //   type: "success"
            // });
            _this.tableData = data.data.list;
            _this.total = data.data.total;
            _this.loading = false;
          }else if(data.code == 1000){
            this.$message.error(data.msg);
            this.$router.push("/login");
          } else if (data.code == 500) {
            this.$message.error(data.msg);
            this.$router.push("/login");
          } else {
            this.$message.error(data.msg);
          }
        }
      );
      // .catch(err => {
      //   let data = err.response ? err.response.data : {};

      //   if (data.message == "当前登陆用户已失效，请重新登陆") {
      //     this.$message.error(data.message);
      //     //      this.$router.push("/login");
      //   } else {
      //     this.$message.error("网络错误请联系管理员");
      //   }
      // });
    },

    handleSearch() {
      this.getData(
        this.npage,
        this.pagesize,
        this.search.input,
        this.search.sendPlatform,
        this.search.time
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
      this.search = {
        input: "",
        sendPlatform: "",
        time: ""
      };
      this.getData(
        this.npage,
        this.pagesize,
        this.search.input,
        this.search.sendPlatform
      );
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    filterSendPlatform(value, row, column) {
      return row.sendPlatform == value;
    },
    beforeAvatarUpload(file) {
      //将文件 的所有的内容都添加在这一起上传
      let fd = new FormData();
      fd.append("file", file);
      // fd.append("realMoney", Number(this.editForm.realMoney)); //其他参数
      // fd.append("withdrawId", Number(this.editForm.withdrawId)); //其他参数
      // fd.append("discountAmt", Number(this.editForm.discountAmt)); //其他参数
      // fd.append("mustPayBackAmt", Number(this.editForm.mustPayBackAmt)); //其他参数
      // fd.append("actualPayBackAmt", Number(this.editForm.actualPayBackAmt)); //其他参数
      // fd.append("remark", this.editForm.remark); //其他参数
      // console.log(fd);
      // const isJPG = /image\/\w+/.test(file.type);
      // const isLt2M = file.size / 1024 / 1024 < 4;

      // if (!isJPG) {
      //   this.$message.error("必须上传图片!");
      // }
      // if (!isLt2M) {
      //   this.$message.error("上传头像图片大小不能超过 4MB!");
      // }
      // return isJPG && isLt2M;
      // console.log(file);
      // var re = /\w+\.(txt|xlsx)/;
      // const isJPG = re.test(file.name);
      // console.log(isJPG);
      // const isLt2M = file.size / 1024 / 1024 < 4;

      // if (!isJPG) {
      //   return this.$message.error("上传头像图片只能是 txt和xlsx格式!");
      // }
      // if (!isLt2M) {
      //   return this.$message.error("上传头像图片大小不能超过 2MB!");
      // }
      // if (!file) {
      //   return this.$message.error("请上传文本");
      // }
      // this.$message({
      //   message: "申请提交成功等待审核",
      //   type: "success"
      // });
      axios.post("/sms/uploadTxt", fd, {}).then(res => {
        let data = res.data;
        if (data.code == 200) {
          this.$message({
            message: data.msg,
            type: "success"
          });
        }else if(data.code == 1000){
            this.$message.error(data.msg);
            this.$router.push("/login");
          } else if (data.code == 500) {
          this.$message.error(data.msg);
          this.$router.push("/login");
        } else {
          this.$message.error(data.msg);
        }
        this.getData("", this.npage, this.pagesize);
      });
      // .catch(err => {
      //   let data = err.response ? err.response.data : {};
      //   if (err.response) {
      //     if (data.message == "当前登陆用户已失效，请重新登陆") {
      //       this.$message.error(data.message);
      //       //    this.$router.push("/login");
      //     } else {
      //       this.$message.error("网络错误请联系管理员");
      //     }
      //   }
      // });
      return;
    },
    handleRemove(file, fileList) {},
    handlePreview(file) {},
    submitUpload() {
      this.$refs.upload.submit();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    onSubmit() {
      this.hasUser();
      let _this = this;
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          _this._httpSendMarketMsg(
            this.ruleForm.oprator,
            this.ruleForm.sendDate,
            this.ruleForm.number,
            this.ruleForm.messageContent
          );
        } else {
          return false;
        }
      });
    },
    download() {
      window.open(
        "http://paxfivrd0.bkt.clouddn.com/EXCEL20180731105752611%20%281%29.xls"
      );
    }
  },
  mounted() {
    this.getData("", this.npage, this.pagesize);
  }
};
</script>

<style>
</style>

