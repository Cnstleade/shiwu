<template>
    <div>
        <box gap="10px 10px">
            <form-preview :header-label="'短信详情'"  :body-items="list" :footer-buttons="buttons" :name="this.$route.params.id"></form-preview>            
            <template v-for="(temp,index) in smsDetail" >
             <form-preview :key="index"   :body-items="temp" id="cycleShortDetail"></form-preview>            
            </template>
            <template v-for="(data,index) in datas" v-if="datas">
	                  <card  :key="index">
                     <div slot="content" class="card-demo-flex card-demo-content01">
                       <div>
                           序号
                           <br/>
                         <span>{{index+1}}</span>
                        </div>                       
                       <div class="vux-1px-r">
                         发送时间
                         <br/>
                         <span>{{data.sendTime|dateServer}}</span>
                       </div>
                       <!-- <div class="vux-1px-r">
                           实际时间
                             <br/>
                         <span><template v-if="data.actualSendTime">{{data.actualSendTime|dateServer}}</template><template else-if>&nbsp;<br></template></span> 
                       </div> -->
                       <div class="vux-1px-r">
                             状态
                             <br/>
                         <span>{{data.sendstatus ===1?'成功':'失败'}}</span>
                       </div>

                      </div>
                    </card>                  
            </template>            
        </box>
    </div>
</template>

<script>
import { Box, FormPreview, Card } from "vux";
import { httpFindMessageRecording } from "../../../service/http";
import { timeFormat, sFormat } from "../../../config/time";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    Box,
    FormPreview,
    Card
  },
  data() {
    return {
      datas: null,
      buttons: [
        {
          style: "primary",
          text: "查看发送记录",
          onButtonClick: name => {
            this._httpSmsDetails(name);
          }
        }
      ],
      smsDetail: []
    };
  },
  computed: {
    ...mapState(["msgDetail"]),
    list() {
      this.datas = null;
      return [
        {
          label: "序号:",
          value: this.msgDetail.id
        },
        {
          label: "发送时间:",
          value: timeFormat(this.msgDetail.senddatetime)
        },
        {
          label: "电话:",
          value: this.msgDetail.mobilePhone
        },
        {
          label: "短信状态:",
          value:
            this.msgDetail.sendStatus == 1
              ? "发送成功"
              : this.msgDetail.sendStatus == 2
                ? "待发送"
                : this.msgDetail.sendStatus == 3
                  ? "发送失败"
                  : this.msgDetail.sendStatus == 4 ? "失败重发中" : "撤销"
        },
        {
          label: "接收人姓名:",
          value: this.msgDetail.reciverName
        },
        {
          label: "创建人:",
          value: this.msgDetail.senderName
        },
        {
          label: "发送次数:",
          value: this.msgDetail.sendTimes
        },
        {
          label: "发送平台:",
          value: this.msgDetail.sendPlatform === 1 ? "华信" : "创蓝"
        },
        {
          label: "短信类型:",
          value:
            this.msgDetail.messageType === 1
              ? "下款"
              : this.msgDetail.messageType === 2
                ? "还款"
                : this.msgDetail.messageType === 3
                  ? "还本"
                  : this.msgDetail.messageType === 4
                    ? "付息提醒"
                    : this.msgDetail.messageType === 5 ? "付本提醒" : "其他"
        },
        {
          label: "消息内容:",
          value: this.msgDetail.messageContent
        },
        {
          label: "备注:",
          value: this.msgDetail.remarks
        }
      ];
    }
  },
  methods: {
    _httpSmsDetails(id) {
      httpFindMessageRecording(0, 10, id)
        .then(res => {
          let data = res.data;
          if (data.code == 200) {
            this.datas = data.data.rows;
          } else if (data.code == 500) {
            this.$message.error(data.msg);
            this.$router.push("/login");
          } else {
            this.$message.error(data.msg);
          }
        })
        .catch(err => {
          // let data = {
          //   msg: "操作成功",
          //   code: 200,
          //   data: [
          //     {
          //       number: 1,
          //       messageId: null,
          //       planSendTime: 1534820400000,
          //       actualSendTime: 1534820502000,
          //       message: "操作成功",
          //       sendTimes: 1,
          //       sendStatusStr: "发送成功"
          //     },
          //     {
          //       number: 2,
          //       messageId: null,
          //       planSendTime: 1537498800000,
          //       actualSendTime: null,
          //       message: null,
          //       sendTimes: null,
          //       sendStatusStr: "待发送"
          //     },
          //     {
          //       number: 3,
          //       messageId: null,
          //       planSendTime: 1540090800000,
          //       actualSendTime: null,
          //       message: null,
          //       sendTimes: null,
          //       sendStatusStr: "待发送"
          //     },
          //     {
          //       number: 4,
          //       messageId: null,
          //       planSendTime: 1542769200000,
          //       actualSendTime: null,
          //       message: null,
          //       sendTimes: null,
          //       sendStatusStr: "待发送"
          //     },
          //     {
          //       number: 5,
          //       messageId: null,
          //       planSendTime: 1545361200000,
          //       actualSendTime: null,
          //       message: null,
          //       sendTimes: null,
          //       sendStatusStr: "待发送"
          //     }
          //   ]
          // };
          // this.smsDetail.length = 0;
          // if (data.code == 200) {
          //   data.data.forEach(v => {
          //     let d = [
          //       {
          //         label: "发送状态:",
          //         value: v.sendStatusStr
          //       },
          //       {
          //         label: "计划发送时间:",
          //         value: timeFormat(v.planSendTime)
          //       },
          //       {
          //         label: "实际发送时间:",
          //         value: v.actualSendTime ? timeFormat(v.actualSendTime) : ""
          //       },
          //       {
          //         label: "发送次数:",
          //         value: v.sendTimes
          //       },
          //       {
          //         label: "返回信息:",
          //         value: v.message
          //       }
          //     ];
          //     this.smsDetail.push(d);
          //   });
          // } else if (data.code == 500) {
          //   this.$message.error(data.msg);
          //   this.$router.push("/login");
          // } else {
          //   this.$message.error(data.msg);
          // }
        });
    }
  },
  mounted() {
    // this._httpSmsDetails(this.$route.params.id);
  }
};
</script>

<style lang="less" scoped>
</style>
<style>
#cycleShortDetail .weui-form-preview__hd {
  display: none;
}
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