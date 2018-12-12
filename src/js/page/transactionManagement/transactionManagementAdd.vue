<template>
    <div >
      <!-- <view-box ref="viewBox"> -->
        <box  gap="10px 10px">
            <group label-width="180px"  title="新增事务">
                <x-textarea  name="待办事项" placeholder="请输入待办事项"></x-textarea>
                <x-switch :title="type?'活动性质/周期':'活动性质/非周期'"  v-model="type"></x-switch>
                <popup-radio title="代办人" :options="options1" v-model="option1" placeholder="请选择活动区域"></popup-radio>   
                <x-input title="手机号码" mask="999 9999 9999" v-model="mobile" :max="13" is-type="china-mobile"></x-input> 
                <datetime v-model="showDateTime1" format="HH:mm"   title="提醒时间"></datetime>  
                <x-switch :title="type1?'提醒类型/仅提醒':'提醒类型/提醒并办理'"  v-model="type1"></x-switch>    
                <popup-radio title="事务类型" :options="options2" v-model="option2" placeholder="请选择事务类型"></popup-radio> 
                <popup-radio title="签名" :options="options3" v-model="option3" placeholder="请选择签名"></popup-radio> 
                <template v-if="!type">
                  <datetime v-model="showDateTime2" format="YYYY-MM-DD"   title="待办时间"></datetime>                    
                </template>
                <template v-if="type">
                  <x-switch :title="type2?'周期类型/周':'周期类型/月'"  v-model="type2"></x-switch>    
                  <template v-if="type2">
                      <popup-radio title="周" :options="options4" v-model="option4" placeholder="请选择周几"></popup-radio>                     
                  </template>
                  <template v-if="!type2">
                      <popup-radio title="月" :options="options5" v-model="option5" placeholder="请选择几号"></popup-radio>                     
                  </template>                  
                </template>  
                <datetime title="开始时间" v-model="startDate" :end-date="endDate"  format="YYYY-MM-DD"  ></datetime>                                                                         
                <datetime title="结束时间" v-model="endDate" :start-date="startDate"  format="YYYY-MM-DD"  ></datetime>   
                <x-input title="预提醒天数" type="number" v-model="number"></x-input>     
                <x-textarea  name="备注" placeholder="请输入备注"></x-textarea>                
            </group>
        </box>
      <!-- </view-box> -->
    </div>
</template>
<script>
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
  ViewBox
} from "vux";
export default {
  data() {
    return {
      type: false,
      type1: false,
      type2: false,
      option1: null,
      showDateTime1: "",
      showDateTime2: "",
      mobile: "",
      startDate: "",
      endDate: "",
      number: null,
      options1: [
        {
          key: "A",
          value: "label A"
        },
        {
          key: "B",
          value: "label B"
        }
      ],
      option2: null,
      options2: [
        {
          key: "A",
          value: "label A"
        },
        {
          key: "B",
          value: "label B"
        }
      ],
      option3: null,
      options3: [
        {
          key: "A",
          value: "label A"
        },
        {
          key: "B",
          value: "label B"
        }
      ],
      option4: null,
      options4: [
        {
          key: "周一",
          value: "周一"
        },
        {
          key: "周二",
          value: "周二"
        },
        {
          key: "周三",
          value: "周三"
        },
        {
          key: "周四",
          value: "周四"
        },
        {
          key: "周五",
          value: "周五"
        },
        {
          key: "周六",
          value: "周六"
        },
        {
          key: "周日",
          value: "周日"
        }
      ],
      option5: null,
      options5: [
        {
          key: "1",
          value: "1"
        },
        {
          key: "2",
          value: "2"
        },
        {
          key: "3",
          value: "3"
        },
        {
          key: "4",
          value: "4"
        },
        {
          key: "5",
          value: "5"
        },
        {
          key: "6",
          value: "6"
        },
        {
          key: "7",
          value: "7"
        },
        {
          key: "8",
          value: "8"
        },
        {
          key: "9",
          value: "9"
        },
        {
          key: "10",
          value: "10"
        },
        {
          key: "11",
          value: "11"
        },
        {
          key: "12",
          value: "12"
        },
        {
          key: "13",
          value: "13"
        },
        {
          key: "14",
          value: "14"
        },
        {
          key: "15",
          value: "15"
        },
        {
          key: "16",
          value: "16"
        },
        {
          key: "17",
          value: "17"
        },
        {
          key: "18",
          value: "18"
        },
        {
          key: "19",
          value: "19"
        },
        {
          key: "20",
          value: "20"
        },
        {
          key: "21",
          value: "21"
        },
        {
          key: "22",
          value: "22"
        },
        {
          key: "23",
          value: "23"
        },
        {
          key: "24",
          value: "24"
        },
        {
          key: "25",
          value: "25"
        },
        {
          key: "26",
          value: "26"
        },
        {
          key: "27",
          value: "27"
        },
        {
          key: "28",
          value: "28"
        },
        {
          key: "29",
          value: "29"
        },
        {
          key: "30",
          value: "30"
        },
        {
          key: "31",
          value: "31"
        }
      ]
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
    ViewBox
  }
};
</script>
<style lang="scss" scoped>
@import "../../style/mixin";
</style>