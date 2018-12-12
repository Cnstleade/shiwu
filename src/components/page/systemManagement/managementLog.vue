<template>
    <div class="container">
        <el-row>
            <el-alert
              :title="title"
              :closable="false"
              type="info">
            </el-alert>           
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
                 <el-table-column prop="id" label="编号" fixed align="center" width="80" sortable>
   
            </el-table-column>
            <el-table-column prop="username" label="操作用户" align="center" width="160"  sortable>
   
            </el-table-column>
            <el-table-column prop="operation" label="描述" align="center"  min-width="150">
                    <template slot-scope="scope">
                          <el-tooltip class="item" effect="dark" :content="scope.row.operation" placement="top">
                              <span>{{scope.row.operation}}</span>
                          </el-tooltip>
                    </template> 
            </el-table-column>
            <el-table-column prop="time" label="耗时（毫秒）" align="center" width="120" sortable>
   
            </el-table-column>
            <el-table-column prop="method" label="操作方法" align="center"  min-width="400">
                     <template slot-scope="scope">
                          <el-tooltip class="item" effect="dark" :content="scope.row.method" placement="top">
                              <span>{{scope.row.method}}</span>
                          </el-tooltip>
                    </template> 
            </el-table-column>
            <el-table-column prop="ip" label="登陆IP地址" align="center" width="140"  >
   
            </el-table-column>   
            <el-table-column prop="createTimeStr" label="操作时间" align="center" width="180" sortable>
   
            </el-table-column>                                                            
            

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
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { httpLogList } from "../../../service/http";
export default {
  data() {
    return {
      title: "日志列表",
      search: {
        input: "",
        time: ""
      },
      tableData: [],
      loading: true,
      npage: 1,
      pagesize: 10,
      total: 0,
      multipleSelection: [] //全部选中嘛
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
    getData(pageNum, pageSize) {
      this.hasUser();
      let _this = this;
      httpLogList(pageNum, pageSize)
        .then(res => {
          let data = res.data;
          if (data.code == 200) {
            _this.tableData = data.data.list;
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
        //   console.log(err);
        //   let data = err.response ? err.response.data : {};

        //   if (data.message == "当前登陆用户已失效，请重新登陆") {
        //     this.$message.error(data.message);
        //   //  this.$router.push("/login");
        //   } else {
        //     this.$message.error("网络错误请联系管理员");
        //   }
        //   _this.tableData = [];
        //   _this.loading = false;
        // });
    },
    handleSearch() {
      this.getData(this.npage, this.pagesize);
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
      this.search = null;
      this.getData(this.npage, this.pagesize);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  },
  mounted() {
    this.getData(this.npage, this.pagesize);
  }
};
</script>

<style>
#text .cell {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
