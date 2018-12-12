<template>
<div>
    <box  gap="10px 10px">
        <group label-width="8em"  title="请输入关键字和时间区间进行搜索">
            <x-input title="请输入关键字" placeholder="请输入关键字"  v-model="search.input" ></x-input>
            <datetime title="请选择开始时间" v-model="search.time1" value-text-align="left"></datetime>
            <datetime title="请选择结束时间" v-model="search.time2" value-text-align="left"></datetime>
        </group>
        {{search}}
        <div style="padding:15px;">
           <x-button type="primary" @click.native="handleSearch">搜索</x-button>
        </div>
    <scroller lock-x height="-320" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="300">
      <div class="box2">
        <swipeout  class="m20">
            <template v-for="(data,i) in tableData">
                <swipeout-item :key="i" @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow">
                  <div slot="right-menu">
                    <swipeout-button @click.native="onButtonClick(data)" type="primary">详情</swipeout-button>
                    <swipeout-button @click.native="onButtonDelete('delete')" type="warn">撤销</swipeout-button>
                  </div>
                  <div slot="content" class="demo-content">
	      <card :header="{title: data.messageContent}">
         <div slot="content" class="card-demo-flex card-demo-content01">
           <div class="vux-1px-r">
             <span>{{data.sendTimeStr}}</span>
             <br/>
             发送时间
           </div>
           <div class="vux-1px-r">
             <span>
                  <template >
                        {{isNaN(data.sendDate)?'每'+data.sendDate:'每月'+data.sendDate+'日'}}
                    </template>                
             </span>
             <br/>
             发送日期
           </div>
           <div class="vux-1px-r">
             <span>{{data.mobilePhone}}</span>
             <br/>
            手机
           </div>
           <div>
             <span>{{data.id}}</span>
             <br/>
             接收人
           </div>
         </div>
        </card>                      
     
                  </div>
                </swipeout-item>                   
            </template>          
        </swipeout>
        <load-more tip="loading"></load-more>
      </div>
    </scroller>    
     <actionsheet v-model="show3" :menus="menus3" @on-click-menu="click" @on-click-menu-delete="onDelete" show-cancel></actionsheet>    
    </box>
</div>
</template>

<script>
import bus from "../../../config/bus";
import {
  XInput,
  Group,
  Divider,
  Datetime,
  XButton,
  Box,
  Swipeout,
  SwipeoutItem,
  SwipeoutButton,
  XTable,
  Card,
  Scroller,
  LoadMore,
  XDialog,
  Grid,
  GridItem,
  Actionsheet
} from "vux";
import {
  httpGifCode,
  httpGetPeriodicMessage,
  httpSmsPeriodicMessage,
  httpDownload,
  httpSmsDetails,
  httpSmsDelete
} from "../../../service/http";
export default {
  components: {
    Scroller,
    XInput,
    Group,
    Divider,
    Datetime,
    XButton,
    Box,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    XTable,
    Card,
    LoadMore,
    Scroller,
    XDialog,
    Grid,
    GridItem,
    Actionsheet
  },
  data() {
    return {
      title: "周期短信",
      search: {
        input: "",
        time1: "",
        time2: ""
      },
      tableData: [],
      loading: false,
      npage: 1,
      pagesize: 10,
      total: 1000,
      bottomCount: 20,
      onFetching: false,
      show2: false,
      show3: false,
      menus3: {
        "title.noop": `确定?<br/><span style="color:#666;font-size:12px;">撤销后无法操作</span>`,
        delete: '<span style="color:red">撤销</span>'
      }
    };
  },
  methods: {
    init(pageNumber, pageSize, keywords, startDate, endDate) {
      let _this = this;
      this.loading = true;
      httpGetPeriodicMessage(pageNumber, pageSize, keywords, startDate, endDate)
        .then(res => {
          let data = res.data;
          if (data.code == 200) {
            _this.tableData = data.data.list;
            _this.total = data.data.total;
          }else if(data.code == 1000){
            this.$message.error(data.msg);
            this.$router.push("/login");
          } else if (data.code == 500) {
            this.$message.error(data.msg);
            this.$router.push("/login");
          } else {
            _this.$message.error(data.msg);
          }
        })
        .catch(err => {
          // let data = err.response ? err.response.data : {};

          if (data.message == "当前登陆用户已失效，请重新登陆") {
            this.$message.error(data.message);
            this.$router.push("/login");
          } else {
            this.$message.error("网络错误请联系管理员");
          }
        });
    },
    handleSearch() {
      this.pagesize = 10;
      this.init(this.npage, this.pagesize);
    },
    onButtonClick(data) {
      setTimeout(() => {
        bus.$emit("detail", data);
      }, 100);
      this.$router.push(`/h5/cycleShortMessage/${data.id}`);
    },
    onButtonDelete() {
      this.show3 = true;
    },
    handleEvents(type) {
      console.log("event: ", type);
    },
    handleCurrentChange() {},
    handleSizeChange() {},
    onScrollBottom() {
      if (this.onFetching) {
      } else {
        this.onFetching = true;
        setTimeout(() => {
          this.pagesize += 10;
          this.init(this.npage, this.pagesize);
          this.$nextTick(() => {
            this.$refs.scrollerBottom.reset();
          });
          this.onFetching = false;
        }, 2000);
      }
    },
    _httpSmsDelete(id) {
      let _this = this;
      httpSmsDelete(id).then(res => {
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
        this.init(this.npage, this.pagesize);
      });
    },
    console(msg) {
      console.log(msg);
    },
    click(key) {
      console.log(key);
    },

    onDelete() {
      //这地方撤销这个短信
      this.showSuccess = true;
    }
  },
  mounted() {
    this.init(this.npage, this.pagesize);
  }
};
</script>

<style lang="less" scoped>
.demo-content {
}
.card-demo-flex {
  display: flex;
}
.card-demo-content01 {
  padding: 10px 0;
}
.card-padding {
  padding: 15px;
}
.card-demo-flex > div {
  flex: 1;
  text-align: center;
  font-size: 12px;
}
.card-demo-flex span {
  color: #f74c31;
}
</style>
<style>
.demo-contentSpan span {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>


