<template>
    <div>
        <box gap="10px 10px">
            <form-preview :header-label="'短信详情'"  :body-items="list" :footer-buttons="buttons" :name="this.$route.params.id"></form-preview>            
            <template v-for="(temp,index) in smsDetail" >
             <form-preview :key="index"   :body-items="temp" id="cycleShortDetail"></form-preview>            
            </template>
        </box>
    </div>
</template>

<script>
import bus from "../../../config/bus";
import { Box, FormPreview } from "vux";
import { httpSmsDetails } from "../../../service/http";
import { timeFormat, sFormat } from "../../../config/time";
export default {
  components: {
    Box,
    FormPreview
  },
  data() {
    return {
      datas: null,
      list: {},
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
  methods: {
    _httpSmsDetails(id) {
      httpSmsDetails(id)
        .then(res => {
          let data = res.data;
          if (data.code == 200) {
            this.ruleForm = data.data;
            this.dialogVisible2 = true;
          } else if (data.code == 500) {
            this.$message.error(data.msg);
            this.$router.push("/login");
          } else if(data.code == 1000){
            this.$message.error(data.msg);
            this.$router.push("/login");
          }else {
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
  mounted() {
    let self = this;
    bus.$on("detail", msg => {
      self.datas = msg;
      self.list = [
        {
          label: "序号:",
          value: msg.id
        },
        {
          label: "创建时间:",
          value: msg.createTimeStr
        },
        {
          label: "发送时间:",
          value: msg.sendTimeStr
        },
        {
          label: "发送日期:",
          value: isNaN(msg.sendDate)
            ? "每" + msg.sendDate
            : "每月" + msg.sendDate + "日"
        },
        {
          label: "开始日期:",
          value: msg.beginDateStr
        },
        {
          label: "结束日期:",
          value: msg.endDateStr
        },
        {
          label: "手机:",
          value: msg.mobilePhone
        },
        {
          label: "周期:",
          value: msg.cycleTypeStr
        },
        {
          label: "状态:",
          value: msg.sendStatusStr
        },
        {
          label: "接收人姓名:",
          value: msg.receiverName
        },
        {
          label: "消息内容:",
          value: msg.messageContent
        },
        {
          label: "短信类型:",
          value: msg.messageTypeStr
        },
        {
          label: "签名:",
          value: msg.signatureTypeStr
        }
      ];
    });
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

