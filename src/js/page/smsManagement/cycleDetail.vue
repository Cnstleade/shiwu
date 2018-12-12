<template>
    <div>
        <box gap="10px 10px">
            <form-preview :header-label="'短信详情'"  :body-items="list" :footer-buttons="buttons" :name="this.$route.params.id"></form-preview>            
            <template v-for="(temp,index) in smsDetail" >
             <form-preview :key="index"   :body-items="temp" id="cycleShortDetail"></form-preview>            
            </template>
            <template v-for="(data,index) in datas" v-if="datas">
	                  <card :header="{title: data.message}" :key="index">
                     <div slot="content" class="card-demo-flex card-demo-content01">
                       <div class="vux-1px-r">
                         发送时间
                         <br/>
                         <span>{{data.planSendTime|dateServer}}</span>
                       </div>
                       <div class="vux-1px-r">
                           实际时间
                             <br/>
                         <span><template v-if="data.actualSendTime">{{data.actualSendTime|dateServer}}</template><template else-if>&nbsp;<br></template></span> 
                       </div>
                       <div class="vux-1px-r">
                             状态
                             <br/>
                         <span>{{data.sendStatusStr}}</span>
                       </div>
                       <div>
                           次数
                           <br/>
                         <span>{{data.sendTimes}}</span>
                        </div>
                      </div>
                    </card>                  
            </template>
        </box>
    </div>
</template>

<script>
import { Box, FormPreview, Card } from "vux";
import { httpSmsDetails } from "../../../service/http";
import { timeFormat, sFormat } from "../../../config/time";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    Box,
    Card,
    FormPreview
  },
  data() {
    return {
      data: null,
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
          label: "创建时间:",
          value: this.msgDetail.createTimeStr
        },
        {
          label: "发送时间:",
          value: this.msgDetail.sendTimeStr
        },
        {
          label: "发送日期:",
          value: isNaN(this.msgDetail.sendDate)
            ? "每" + this.msgDetail.sendDate
            : "每月" + this.msgDetail.sendDate + "日"
        },
        {
          label: "开始日期:",
          value: this.msgDetail.beginDateStr
        },
        {
          label: "结束日期:",
          value: this.msgDetail.endDateStr
        },
        {
          label: "手机:",
          value: this.msgDetail.mobilePhone
        },
        {
          label: "周期:",
          value: this.msgDetail.cycleTypeStr
        },
        {
          label: "状态:",
          value: this.msgDetail.sendStatusStr
        },
        {
          label: "接收人姓名:",
          value: this.msgDetail.receiverName
        },
        {
          label: "消息内容:",
          value: this.msgDetail.messageContent
        },
        {
          label: "短信类型:",
          value: this.msgDetail.messageTypeStr
        },
        {
          label: "签名:",
          value: this.msgDetail.signatureTypeStr
        }
      ];
    }
  },
  methods: {
    _httpSmsDetails(id) {
      httpSmsDetails(id)
        .then(res => {
          let data = res.data;
          if (data.code == 200) {
            this.datas = data.data;
            // this.dialogVisible2 = true;
          } else if (data.code == 500) {
            this.$message.error(data.msg);
            this.$router.push("/login");
          } else {
            this.$message.error(data.msg);
          }
        })
        .catch(err => {
          let data = {
            msg: "操作成功",
            code: 200,
            data: [
              {
                number: 1,
                messageId: null,
                planSendTime: 1534820400000,
                actualSendTime: 1534820502000,
                message: "操作成功",
                sendTimes: 1,
                sendStatusStr: "发送成功"
              },
              {
                number: 2,
                messageId: null,
                planSendTime: 1537498800000,
                actualSendTime: null,
                message: null,
                sendTimes: null,
                sendStatusStr: "待发送"
              },
              {
                number: 3,
                messageId: null,
                planSendTime: 1540090800000,
                actualSendTime: null,
                message: null,
                sendTimes: null,
                sendStatusStr: "待发送"
              },
              {
                number: 4,
                messageId: null,
                planSendTime: 1542769200000,
                actualSendTime: null,
                message: null,
                sendTimes: null,
                sendStatusStr: "待发送"
              },
              {
                number: 5,
                messageId: null,
                planSendTime: 1545361200000,
                actualSendTime: null,
                message: null,
                sendTimes: null,
                sendStatusStr: "待发送"
              }
            ]
          };
          this.smsDetail.length = 0;
          if (data.code == 200) {
            data.data.forEach(v => {
              let d = [
                {
                  label: "发送状态:",
                  value: v.sendStatusStr
                },
                {
                  label: "计划发送时间:",
                  value: timeFormat(v.planSendTime)
                },
                {
                  label: "实际发送时间:",
                  value: v.actualSendTime ? timeFormat(v.actualSendTime) : ""
                },
                {
                  label: "发送次数:",
                  value: v.sendTimes
                },
                {
                  label: "返回信息:",
                  value: v.message
                }
              ];
              this.smsDetail.push(d);
            });
          } else if (data.code == 500) {
            this.$message.error(data.msg);
            this.$router.push("/login");
          } else {
            this.$message.error(data.msg);
          }
        });
    }
  },
  mounted() {}
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