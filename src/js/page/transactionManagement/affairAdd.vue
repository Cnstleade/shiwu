<template>
    <div >
      <!-- <view-box ref="viewBox"> -->
        <box  gap="10px 10px">
            <group label-width="180px"  title="办理描述">
                <x-textarea  name="描述" placeholder="请输入办理描述" v-model="detail"></x-textarea>
                <x-input title="所有资金" type="text" placeholder=""  v-model="money" :min="0"  ></x-input>                
                <datetime v-model="time" format="YYYY-MM-DD"   title="办理时间"></datetime>   
                <x-switch :title="img?'是否上传凭证/是':'是否上传凭证/否'"  v-model="img"></x-switch>                 
                <cell title="凭证" @click.native.stop="openFile" v-if="img">
                     <input type="file" @change="fileChange()"  ref="file" multiple="multiple">
                     <i class="fa fa-file"></i>
                </cell>                
                <flexbox  style="margin-top:20px">
                  <flexbox-item>
                    <x-button type="primary" @click.native="reset">重置</x-button>
                  </flexbox-item>
                  <flexbox-item>
                    <x-button type="warn"  @click.native="add">提交</x-button>
                  </flexbox-item>
                </flexbox>                
            </group>
        </box>
      <!-- </view-box> -->
    </div>
</template>
<script>
import { httpAffairLogging } from "../../../service/http";
import axios from "axios";
import {
  Group,
  XTextarea,
  Box,
  XSwitch,
  Cell,
  PopupRadio,
  XInput,
  Datetime,
  TransferDom,
  ViewBox,
  Flexbox,
  FlexboxItem,
  XButton
} from "vux";
export default {
  data() {
    return {
      detail: null,
      money: null,
      time: null,
      img: false
    };
  },
  components: {
    Group,
    XTextarea,
    Box,
    XSwitch,
    PopupRadio,
    Cell,
    XInput,
    Datetime,
    TransferDom,
    ViewBox,
    Flexbox,
    FlexboxItem,
    XButton
  },
  methods: {
    openFile() {
      //   this.$refs.file.click();
    },
    fileChange() {},
    reset() {},
    add() {
      if (this.detail && this.money && this.time) {
        if (isNaN(this.money)) {
          this.$message.error("请输入正确的金额");
        } else {
          if (this.img) {
            let file = this.$refs.file.files[0];
            let fd = new FormData();
            fd.append("file", file);
            fd.append("affairId", this.$route.params.id); //其他参数
            fd.append("description", this.detail); //其他参数
            fd.append("money", this.money); //其他参数
            fd.append("transatorTime", this.time); //其他参数
            var re = /\w+\.(txt|xlsx)/;
            const isJPG = re.test(file.name);
            const isLt2M = file.size / 1024 / 1024 < 4;

            if (!isLt2M) {
              return this.$message.error("上传头像图片大小不能超过 4MB!");
            }
            if (!file) {
              return this.$message.error("请上传文本");
            }

            axios.post("/affair/affairLogging", fd, {}).then(res => {
              let data = res.data;
              if (data.code == 200) {
                this.$message({
                  message: "新增成功",
                  type: "success"
                });
                this.$router.go(-1);
              } else {
                this.$message.error(data.msg);
              }
            });

            return isJPG && isLt2M;
          } else {
            httpAffairLogging(
              this.$route.params.id,
              this.detail,
              this.money,
              this.time,
              ''
            )
              .then(res => {
                let data = res.data;
                if (data.code == 200) {
                  this.$message({
                    message: "新增成功",
                    type: "success"
                  });
                  this.$router.go(-1);
                } else {
                  this.$message.error(data.msg);
                }
              })
              .catch(err => {
              });
          }
        }
      } else {
        this.$message.error("数据不全请补充");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../style/mixin";
</style>