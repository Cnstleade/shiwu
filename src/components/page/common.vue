<template>
    <div class="container">
        <el-row :gutter="20">
            <el-col :span="8">
                <el-row>
                    <el-col>
                        <el-card shadow="hover" class="mgb20">
                            <div class="user-info">
                                <img src="static/img/img.jpg" class="user-avator" alt="">
                                <div class="user-info-cont">
                                    <div class="user-info-name">{{username}}</div>
                                    <div>{{userI.staffName}}</div>
                                </div>
                            </div>
                            <div class="user-info-list">上次登录时间：<span>{{userI.lastLoginTime|dateServer}}</span></div>
                            <div class="user-info-list">上次登录IP：<span>{{userInfo.prevLoginIp}}</span></div>
                            <div class="user-info-list" style="color:rgba(30, 144, 255, 1)"> 如非您本人操作，请及时更改密码</div>
                        </el-card>
                        <el-card shadow="hover" >
                            <div slot="header" class="clearfix">
                                <span>
                                  <i class="el-icon-warning" style="color:rgb(45, 140, 240)"></i>
                                  系统提示</span>
                            </div>
                            <span style="font-size:14px">
                            1=>如您在使用过程有发现出错请及时与我们取得联系；为保证您得到我们的后续服务，强烈建议您购买我们的正版系统或向我们定制系统！
                            <br/>2=>强烈建议您将IE9以上版本或其他的浏览器
                            </span>

                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8" :offset="1">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-view grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{userI.loginTimes}}</div>
                                    <div>访问次数</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8" :offset="3">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-date grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{currentDate}}</div>
                                    <div>时间</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <!-- <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-goods grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">5000</div>
                                    <div>数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col> -->
                </el-row>
                <el-row >
                  <el-col :span="10">
                      <el-card shadow="hover" :body-style="{ height: '304px'}">
                          <div slot="header" class="clearfix">
                                <span>
                                  <i class="el-icon-goods "></i>
                                  网站信息</span>
                          </div>
                          <el-table :data="webImformation" :show-header="false" height="304" style="width: 100%;font-size:14px;" v-if="number!==undefined">
                              <el-table-column >
                                  <template slot-scope="scope">
                                      <span>{{scope.row.title}}</span>
                                      <span>{{scope.row.message}}</span>
                                  </template>
                              </el-table-column>
                          </el-table>
                      </el-card>
                  </el-col>
                  <el-col :span="10" :offset="2">
                      <el-card shadow="hover" :body-style="{ height: '304px'}">
                          <div slot="header" class="clearfix">
                                <span>
                                  <i class="el-icon-news "></i>
                                  服务器信息</span>
                          </div>
                          <el-table :data="serverImformation" :show-header="false" height="304" style="width: 100%;font-size:14px;">
                              <el-table-column >
                                  <template slot-scope="scope">
                                      <span>{{scope.row.title}}</span>
                                      <span>{{scope.row.message}}</span>
                                  </template>
                              </el-table-column>
                          </el-table>
                      </el-card>
                  </el-col>
                </el-row>


            </el-col>
        </el-row>
    </div>
</template>

<script>
import {
  httpUserList,
  httpRoleList,
  httpUserRoleList,
  httpUserDetail
} from "../../service/http";
import { timeFormat, sFormat } from "../../config/time";
export default {
  data() {
    return {
      //用户信息
      userInfo: {
        name: "",
        role: "",
        prevLoginTime: timeFormat(new Date()),
        prevLoginIp: "127.0.0.1",
        LoginCount: 80
      },
      //
      userI: {},
      number: null,
      currentDate: timeFormat(new Date(), 0, false),
      name: localStorage.getItem("fk_username"),
      webImformation: [
        {
          title: "会员注册:",
          message: "开启"
        },
        {
          title: "会员投稿:",
          message: "开启"
        },
        // {
        //   title: "管理员个数:",
        //   message: `${number}`+"人"
        // },
        {
          title: "管理者IP:",
          message: "192.168.1.156"
        },
        {
          title: "程序编码:",
          message: "UTF-8"
        }
      ],
      serverImformation: [
        {
          title: "服务器软件：",
          message: "Apache/2.2.6 (Win32) PHP/5.2.5"
        },
        {
          title: "PHP版本：",
          message: "5.2.5"
        },
        {
          title: "MYSQL版本:",
          message: "5.0.45-community-nt"
        },
        {
          title: "魔术引用:",
          message: "开启 (建议开启)"
        },
        {
          title: "使用域名:",
          message: "192.168.1.124 "
        }
      ],
      todoList: [
        {
          title: "今天要修复100个bug",
          status: false
        },
        {
          title: "今天要修复100个bug",
          status: false
        },
        {
          title: "今天要写100行代码加几个bug吧",
          status: false
        },
        {
          title: "今天要修复100个bug",
          status: false
        },
        {
          title: "今天要修复100个bug",
          status: true
        },
        {
          title: "今天要写100行代码加几个bug吧",
          status: true
        }
      ]
    };
  },
  computed: {
    username() {
      let username = sessionStorage.getItem("hsjr_username");
      if (username != "" && username != null && username != "undefined") {
        return username ? username : "";
      } else {
        this.$router.push("/login");
      }
    }
  },
  methods: {
    _httpUserDetail() {
      httpUserDetail().then(res => {
        let data = res.data;
        if (data.code == 200) {
          this.userI = data.data;
        } else if (data.code == 1000) {
          this.$message.error(data.msg);
          this.$router.push("/login");
        }
      });
    },
    init(pageNum, pageSize, Username, ssex, mobile, deptId) {
      let _this = this;
      this.loading = true;
      httpUserList(pageNum, pageSize, Username, ssex, mobile, deptId).then(
        res => {
          let data = res.data;
          if (data.code == 200) {
            _this.number = data.data.rows.length;
            console.log(data.data.rows.length);
            data.data.rows.forEach(row => {
              if (row.username == this.username) {
                httpUserRoleList(row.id).then(res => {
                  let data = res.data;
                  if (data.code == 200) {
                    let list = data.rows;

                    let roles = list.filter((v, i, a) => {
                      return v.checked;
                    });
                    let roleList = [];
                    roles.forEach((v, i, a) => {
                      roleList.push(v.roleName);
                    });
                    this.userInfo.role = roleList.join(" ");
                    console.log(roleList);
                  } else if (data.code == 1000) {
                    this.$message.error(data.msg);
                    this.$router.push("/login");
                  } else if (data.code == 500) {
                    this.$message.error(data.msg);
                    this.$router.push("/login");
                  }
                });
                //   .catch(err => {
                //     console.log(err);
                //     if (err.response.status) {
                //       if (err.response.status == 302) {
                //         this.$router.push("/login");
                //       }
                //     }
                //     let data = err.response ? err.response.data : {};

                //     if (data.message == "当前登陆用户已失效，请重新登陆") {
                //       this.$message.error(data.message);
                //  //     this.$router.push("/login");
                //     } else {
                //       this.$message.error("网络错误请联系管理员");
                //     }
                //   });
              }
            });
          } else if (data.code == 500) {
            this.$message.error(data.msg);
            this.$router.push("/login");
          } else {
            _this.loading = false;
            this.$message.error(data.msg);
          }
        }
      );
      //   .catch(err => {
      //     if (err.response.status) {
      //       if (err.response.status == 302) {
      //         this.$router.push("/login");
      //       }
      //     }
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
    }
  },
  mounted: function() {
    // this.init(1, 10000);
    this._httpUserDetail();
  }
};
</script>


<style scoped>
.el-row {
  margin-bottom: 20px;
}

.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 12px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;

  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  float: right;
  margin-left: 70px;
}

.mgb20 {
  margin-bottom: 20px;
}

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}
</style>
