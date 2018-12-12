<template>
    <div class="page">
      <box  gap="10px 10px">
      
        <swipeout  class="m20" v-if="tableData">
            <template v-for="(data,i) in tableData">
                <swipeout-item :key="i"  transition-mode="follow">
                  <div slot="content" class="demo-content">
	                  <card :header="{title: data.discription}">
                     <div slot="content" class="card-demo-flex card-demo-content01">
                       <div class="vux-1px-r">
                         序号
                          <br/>
                           <span>{{data.id}}</span>
                       </div>
                       <div class="vux-1px-r">
                         办理人
                         <br/>
                         <span> {{data.transatorName}}</span>
                       </div>
                       <div class="vux-1px-r">
                        办理时间
                         <br/>
                         <span>{{data.TransatorTime}}</span>
                       </div>
                       <div>
                         所花金额
                           <br/>
                         <span>{{data.money}}</span>
                        </div>
                      </div>
                    </card>                      
                  </div>
                </swipeout-item>      
            </template>          
        </swipeout>
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
  Flexbox,
  FlexboxItem,
  Actionsheet,
  Toast,
  Popup
} from "vux";
import { httpAffairAffairLogs } from "../../../service/http";
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
    Flexbox,
    FlexboxItem,
    Actionsheet,
    Toast,
    Popup
  },
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    _httpAffairAffairLogs(id) {
      httpAffairAffairLogs(id)
        .then(res => {
          let data = res.data;
          if (data.code == 200) {
            this.tableData = data.data;
          }
        })
        .catch();
    }
  },

  mounted() {
    this._httpAffairAffairLogs(this.$route.params.id);
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
.position-vertical-demo {
  background-color: #ffe26d;
  color: red;
  text-align: center;
  padding: 15px;
}
</style>