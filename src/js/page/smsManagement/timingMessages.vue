
<template>
    <div class="page">
      <box  gap="10px 10px">
        <group label-width="140px"  title="请输入关键字和时间区间进行搜索">
            <x-input title="请输入关键字" placeholder="请输入关键字"  v-model="input" ></x-input>
             <x-input title="请输入手机号码" placeholder="请输入手机号码"  v-model="mobile" ></x-input>

        </group>
        <x-button style="margin-top:10px;" type="primary" @click.native="handleSearch">搜索</x-button>
        <scroller lock-x height="-270" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="600">
        <swipeout  class="m20">
            <template v-for="(data,i) in tableData">
                <swipeout-item :key="i" @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow">
                  <div slot="right-menu">
                    <swipeout-button @click.native="onButtonClick(data)" type="primary">详情</swipeout-button>
                    <swipeout-button @click.native="onButtonDelete(data)" type="warn">撤销</swipeout-button>
                  </div>
                  <div slot="content" class="demo-content">
	                  <card :header="{title: data.messageContent}">
                     <div slot="content" class="card-demo-flex card-demo-content01">
                       <div class="vux-1px-r">
                         <span>{{data.senddatetime | dateServer }}</span>
                         <br/>
                         发送时间
                       </div>
                       <div class="vux-1px-r">
                         <span>{{data.mobilePhone}}</span>
                         <br/>
                        手机
                       </div>
                       <div>
                         <span>{{data.reciverName}}</span>
                         <br/>
                         接收人
                        </div>
                      </div>
                    </card>                      
                  </div>
                </swipeout-item>                   
            </template>          
        </swipeout>
         <load-more v-if="show2" tip="loading"></load-more>
        </scroller>
        <actionsheet v-model="show3" :menus="menus3" @on-click-menu="click" show-cancel></actionsheet>
        <toast v-model="showSuccess">撤销成功</toast>
      <popup v-model="show10" position="top" :show-mask="false">
        <div class="position-vertical-demo">
            {{msg}}
        </div>
      </popup>          
      </box>
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import {
  Datetime,
  XInput,
  Group,
  XButton,
  Box,
  Scroller,
  Swipeout,
  SwipeoutItem,
  SwipeoutButton,
  Card,
  LoadMore,
  Actionsheet,
  Toast,
  Popup
} from "vux";
import { httpSelectTable } from "../../../service/http";
export default {
  components: {
    XInput,
    Group,
    Datetime,
    XButton,
    Box,
    Scroller,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    Card,
    LoadMore,
    Actionsheet,
    Toast,
    Popup
  },
  data() {
    return {
      input: "",
      tableData: [],
      npage: 1,
      pagesize: 10,
      show2: false,
      show3: false,
      show10: false,
      showSuccess: false,
      startDate: "",
      endDate: "",
      mobile: "",
      dataId: null,
      msg: "",
      menus3: {
        "title.noop": `确定?<br/><span style="color:#666;font-size:12px;">撤销后无法操作</span>`,
        delete: '<span style="color:red">撤销</span>'
      }
    };
  },
  methods: {
    ...mapMutations(["MSG_DETAIL"]),
    getData(pageNumber, pageSize, mobilePhone, sendStatus, messageContent) {
      httpSelectTable(
        pageNumber,
        pageSize,
        mobilePhone,
        sendStatus,
        messageContent
      ).then(res => {
        let data = res.data;
        if (data.code == 200) {
          this.tableData = data.data.rows;
          this.total = data.data.total;
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    handleSearch() {
      this.npage = 1;
      this.pagesize = 10;
      this.getData(this.npage, this.pagesize, this.mobile, "", this.input);
    },
    handleEvents(type) {
      console.log("event: ", type);
    },
    onButtonClick(data) {
      this.MSG_DETAIL(data);
      this.$router.push(`/acyclicMessage/${data.id}`);
    },
    onButtonDelete() {
      this.dataId = data.id;
      this.show3 = true;
    },
    onScrollBottom() {
      if (this.onFetching) {
      } else {
        this.onFetching = true;
        this.show2 = true;
        setTimeout(() => {
          this.pagesize += 5;
          this.getData(this.npage, this.pagesize, this.mobile, "", this.input);
          this.$nextTick(() => {
            this.$refs.scrollerBottom.reset();
          });
          this.onFetching = false;
          this.show2 = false;
        }, 2000);
      }
    }
  },
  mounted() {
    this.getData(this.npage, this.pagesize);
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/mixin";
</style>
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