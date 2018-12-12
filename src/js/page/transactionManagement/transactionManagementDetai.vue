<template>
    <div>
        <box gap="10px 10px">
            <form-preview :header-label="'短信详情'"  :body-items="list"  :name="this.$route.params.id"></form-preview>            
            <template v-for="(temp,index) in smsDetail" >
             <form-preview :key="index"   :body-items="temp" id="cycleShortDetail"></form-preview>            
            </template>
            <!-- <divider>事务办理详情</divider>  
                <template v-for="(data,index) in  smsDetails1">
      	                <card :header="{title: data.discription}" :key="index">
                     <div slot="content" class="card-demo-flex card-demo-content01">
                       <div>
                         <span>{{data.id}}</span>
                         <br/>
                         序号
                        </div>                         
                       <div class="vux-1px-r">
                         <span>{{data.transatorName}}</span>
                         <br/>
                         办理人
                       </div>
                       <div class="vux-1px-r">
                         <span> {{data.TransatorTime}}</span>
                         <br/>
                         办理时间
                       </div>
                       <div class="vux-1px-r">
                         <span>{{data.money}}</span>
                         <br/>
                        所花金额
                       </div>
                      </div>
                    </card>                      
                </template> -->
            <divider>发送记录详情</divider>    
                <template v-for="(data,index) in  smsDetails2">
      	                <card :header="{title: data.discription}" :key="index">
                     <div slot="content" class="card-demo-flex card-demo-content01">
                       <div>
                           待办时间
                              <br/>
                         <span>{{data.commissionDate|dateServer}}
                        </span>
                        </div>                         
                       <div class="vux-1px-r">
                             计划发送时间
                                <br/>
                           <span>{{data.transatorName}}
                           </span>
                       </div>
                       <div class="vux-1px-r">
                            实际发送时间
                               <br/>
                           <span>{{data.TransatorTime}}
                           </span>
                       </div>
                       <div class="vux-1px-r">
                           办理描述
      <flexbox>
        <flexbox-item>
         <x-button mini type="primary" action-type="reset" @click.native="addDetail(data.id)" style="padding:0 5px">添加</x-button>
        </flexbox-item>
        <flexbox-item>
       <x-button mini type="primary" action-type="reset" @click.native="showDetail(data.id)" style="padding:0 5px">查看</x-button>
        </flexbox-item>
      </flexbox>                              
                       </div>
                      </div>
                    </card>                      
                </template>                    
        </box>
    </div>
</template>

<script>
import {
  Box,
  FormPreview,
  Card,
  Divider,
  XButton,
  Flexbox,
  FlexboxItem
} from "vux";
import { httpSmsDetails, httpAffairDetails } from "../../../service/http";
import { timeFormat, sFormat } from "../../../config/time";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    Box,
    Card,
    FormPreview,
    Divider,
    XButton,
    Flexbox,
    FlexboxItem
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
      smsDetail: [],
      smsDetails1: [],
      smsDetails2: []
    };
  },
  computed: {
    ...mapState(["msgDetail"]),
    list() {
      this.datas = null;
      return [
        {
          label: "创建人:",
          value: this.msgDetail.createUser
        },
        {
          label: "待办人:",
          value: this.msgDetail.commissionUser
        },
        {
          label: "电话:",
          value: this.msgDetail.mobile
        },
        {
          label: "创建日期",
          value: this.msgDetail.createTime
        },
        {
          label: "事务类型:",
          value: this.msgDetail.periodicTypeStr
        },
        {
          label: "待办日期:",
          value: isNaN(this.msgDetail.commissionDate)
            ? this.msgDetail.commissionDate.length > 10
              ? this.msgDetail.commissionDate
              : "每" + this.msgDetail.commissionDate
            : "每月" + this.msgDetail.commissionDate + "日"
        },
        {
          label: "短信签名:",
          value: this.msgDetail.signature
        },
        {
          label: "事务内容:",
          value: this.msgDetail.content
        },
        {
          label: "备注:",
          value: this.msgDetail.remark
        }
      ];
    }
  },
  methods: {
    addDetail(id) {
      this.$router.push(`/affairD/${id}`);
    },
    _httpAffairDetails(id, periodicType) {
      httpAffairDetails(id, periodicType).then(res => {
        let data = res.data;
        if (data.code == 200) {
          this.smsDetails1 = [];
          this.smsDetails2 = [];
          this.smsDetails1 = data.data.affairLoggingEntities;
          this.smsDetails2 = data.data.affairDetailVOS;
        } else {
          this.$message.error(data.msg);
        }
      });
    },
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
    },
    showDetail(id) {
      this.$router.push("/affairDes/" + id);
    }
  },
  mounted() {
    this._httpAffairDetails(this.msgDetail.id, this.msgDetail.periodicType);
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
.position-vertical-demo {
  background-color: #ffe26d;
  color: red;
  text-align: center;
  padding: 15px;
}
</style>