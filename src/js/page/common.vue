<template>
    <div id="common">
        <swiper loop auto :list="demo06_list" ></swiper>   
	  <card :header="{title: '你好'+userInfo.username}">
        <div slot="content" class="card-demo-flex card-demo-content01">
          <div class="vux-1px-r">
            <span>{{userInfo.loginTimes}}</span>
            <br/>
            登录次数
          </div>
          <div class="vux-1px-r">
            <span v-if="userInfo.lastLoginTime">{{userInfo.lastLoginTime|dateServer}}</span>
            <br/>
            上传登录时间
          </div>
          <div class="vux-1px-r">
            <span>{{userInfo.staffName}}</span>
            <br/>
            角色
          </div>
        </div>
      </card>                 
    </div>
</template>
<script>
import { Box, Swiper, Card } from "vux";
import { httpUserDetail } from "../../service/http";
const baseList = [
  {
    url: "javascript:",
    img: "https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg",
    title: "送你一朵花"
  },
  {
    url: "javascript:",
    img: "https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg",
    title: "送你一辆车"
  },
  {
    url: "javascript:",
    img: "https://static.vux.li/demo/5.jpg", // 404
    title: "送你一次旅行",
    fallbackImg:
      "https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg"
  }
];
const urlList = baseList.map((item, index) => ({
  // url: "http://m.baidu.com",
  img: item.img,
  fallbackImg: item.fallbackImg,
  title: `${item.title}`
}));
export default {
  components: {
    Box,
    Swiper,
    Card
  },
  data() {
    return {
      demo06_list: urlList,
      userInfo: {}
    };
  },
  methods: {
    _httpUserDetail() {
      httpUserDetail().then(res => {
        let data = res.data;
        if (data.code == 200) {
          this.userInfo = data.data;
        }
      });
    }
  },
  mounted() {
    this._httpUserDetail();
  }
};
</script>

<style lang="scss" scoped>
#common {
  margin-top: 10px;
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
#common .vux-swiper-desc {
  padding: 0;
}
</style>
