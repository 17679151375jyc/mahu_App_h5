<!--@Time  : 2019/10/18 16:35-->
<!--@Author: michael huang-->
<!--@File  : car-apply-list.vue-->

<template>
  <div class="wrapper-white">
    <return-head title="车辆审核"></return-head>

    <transition name="slide-fade">
      <router-view @Refresh="Refresh" :list="list[index]"></router-view>
    </transition>
    <cube-tab-bar
      @click="tabClick"
      :showSlider="false"
      v-model="selectedLabel"
      show-slider
      style="width: 100%;height: 13.33vw;background-color: #F5F5F5;">
      <cube-tab v-for="(item, index) in tabs" :label="item.label" :key="index" class="header"></cube-tab>
    </cube-tab-bar>
    <cube-scroll style="width: 100%;height: 88%;" ref='scroll'>
      <cube-tab-panels v-model="selectedLabel" style="width: 100%;height: 80%;">
        <cube-tab-panel
          v-for="(item, index) in tabs"
          :label="item.label"
          :key="index"
          style="width: 100%;height: 85%;">
          <ul class="ulClass ul_bjall">
            <li v-if="defauleShow" class="null_class">暂无车辆申请加入社区</li>
            <li
              @click="detail(index)"
              :class="{'ul_li bg_no':item.status == 0||item.status == 3||item.status==1, 'ul_li bg_pass':item.status == 2}"
              v-for="(item, index) in list"
              :key="index">
              <div style="height: 6.67vw;line-height: 6.67vw;left:5.33vw;margin-top:3.2vw;right: 5.33vw;">
                <span
                  style="font-size: 4.8vw;font-weight: bold;margin-right: 1.87vw;">{{ item.carNumber }}</span>
                <!--<img v-if='item.sex' style='width: 4.31vw;height: 4.41vw;margin-top:1.13vw;' :src="require('@/assets/community/man.png')">-->
                <!--<img v-else style='width: 4.31vw;height: 4.41vw;margin-top:1.13vw;' :src="require('@/assets/community/woman.png')">-->
                <span style="font-size: 3.73vw;margin-left: 4.26vw;">{{ item.phone}}</span>
                <span
                  style="display: block;float: right;font-size:4vw;font-weight:bold;"
                >{{ statusList[item.status].name }}</span>
              </div>
              <div style="height: 5.33vw;margin-top: 13.33vw;left:5.33vw;right: 5.33vw;line-height: 5.33vw;font-size: 3.73vw;">
                <span style="margin-right: 3.2vw; font-size: 4.267vw;">{{item.carownName}} {{item.carownPhone}}</span>
              </div>
              <div style="height: 5.33vw;margin-top: 18.33vw;left:5.33vw;right: 5.33vw;line-height: 5.33vw;font-size: 3.73vw;">
                <span style="margin-right: 3.2vw;font-size: 4.267vw;">{{item.plotName}}</span>
              </div>
              <div style="height: 5.33vw;margin-top: 21.33vw;left:5.33vw;right: 5.33vw;line-height: 5.33vw;">{{ null }}</div>
              <div
                style="height: 5.33vw;margin-top: 29.07vw;left:5.33vw;right: 5.33vw;line-height: 5.33vw;font-size: 3.73vw;"
              >{{ getDateTime(item.updateTime) }}</div>
              <div
                v-if="item.status == 2"
                @click="detail(index)"
                style="width: 26.13vw;height: 8.53vw;line-height: 8.53vw;text-align: center;right: 4vw;bottom: 3.74vw;background: linear-gradient(to top , #F9BC30, #FD484D);border-radius:1.07vw;font-size: 3.2vw;"
              >拒绝原因</div>
            </li>
          </ul>
        </cube-tab-panel>
      </cube-tab-panels>
    </cube-scroll>
  </div>
</template>

<script>
import utils from "_libs/utils";
import returnHead from "_c/head/return-head";
import { mapState } from "vuex";

export default {
  name: "car-apply-list",
  components: { returnHead },
  watch: {
    //监听路由变化
    $route(to, from) {

    },
    mPushInfo() {
      let self = this;
      self.getPlotName();
    }
  },
  computed: {
    ...mapState({
      mPushInfo: state => state.user.pushInfo
    })
  },
  data() {
    return {
      defauleShow: false,
      statusList: {
        0: {
          name: "未审核",
          value: 0
        },
        1: {
          name: "已审核",
          value: 1
        },
        2: {
          name: "审核不通过",
          value: 2
        },
        3: {
          name: "审核中",
          value: 3
        }
      },
      list: [],
      index: 0,
      formTitle: {
        addressName: "",
        plotId: ""
      },
      selectedLabel: "全部",
      tabs: [
        {
          label: "全部"
        },
        {
          label: "未完成"
        },
        {
          label: "已完成"
        }
      ],

      statusListStr: ""
    };
  },
  mounted() {
    this.getPlotName();
  },
  methods: {
    Refresh() {
      this.getList(this.statusListStr);
    },
    detail(val) {
      this.index = val;
      // if(this.list[val].status == 0){
      this.$router.push({
        path: "/service-index/car-apply-list/car-apply-audit",
        query: {}
      });
      // }
    },
    tabClick(val) {
      this.$refs.scroll.scrollTo(0, 0, 0, 0)
      if (val === "全部") {
        this.statusListStr = "0,1,2";
      } else {
        if (val === "未完成") {
          this.statusListStr = "0";
        } else if (val === "已完成") {
          this.statusListStr = "1,2";
        }
      }
      this.getList(this.statusListStr);
    },
    getPlotName() {
      let self = this;
      self.$post("base", "/FamilyJava/client/getPlotServer").then(res => {
        this.formTitle.addressName = res.data.propertyPlotName;
        this.formTitle.plotId = res.data.propertyPlotRelation;
        this.statusListStr = "0,1,2";
        this.getList(this.statusListStr);
      });
    },
    getList(val) {
      let self = this;
      let valList = val.split(",");
      // self.$post('base', "/FamilyJava/client/community/allapply", {
      self.$post("base", "/family/server/userCar/getPageInfo", {
        plotNumber: this.formTitle.plotId,
        statusList: valList
      }).then(({ data, errorCode }) => {
        if (errorCode === 0) {
          if (data.list && data.list.length>0) {
            this.list = data.list;
            this.defauleShow = false
          } else {
            this.list = [];
            this.defauleShow = true
          }
        }
      });
    },
    getDateTime(time) {
      return utils.timetrans(time, "yymmddhhmm");
    }
  }
};
</script>

<style scoped>
.cube-tab-bar {
  display: block;
  padding-left: 4vw;
}
.header {
  width: 21.33vw !important;
  height: 10vw;
  line-height: 10vw;
  float: left;
  font-size: 4vw;
  color: #979899;
}
.cube-tab_active {
  color: #38f;
  width: calc(21.33vw - 2px) !important;
  height: 4vw;
  line-height: 4vw;
  border-radius: 5.33vw;
  border: 1px solid #38f;
  font-size: 4vw;
  background: #fff;
  margin-top: 2.66vw;
}
.ulClass {
  margin-bottom: 7vw;
}
.ul_li {
  width: 92vw;
  margin: 0 auto;
  height: 37.33vw;
  margin-top: 2.13vw;
  background-size: cover !important;
  color: #fff;
  position: relative;
  background-color: #ccc;
}
.ul_li div,
img {
  position: absolute;
}
.ul_bjno .ul_li {
  background: url("~@/assets/community/bgcol_no.png") 100%;
}
.ul_bjok .ul_li {
  background: url("~@/assets/community/bgcol_ok.png");
}
.null_class {
  width: 92vw;
  margin: 0 auto;
  height: 37.33vw;
  text-align: center;
  color: #ffffff;
  font-size: 3.73vw;
  line-height: 37.33vw;
  margin-top: 2.13vw;
  background-size: cover !important;
  background: url("~@/assets/community/bgcol_null.png");
}
.bg_no {
  background: url("~@/assets/community/bgcol_no.png") 100%;
}
.bg_ok {
  background: url("~@/assets/community/bgcol_ok.png") 100%;
}
.bg_pass {
  background: url("~@/assets/community/bgcol_nopass.png") 100%;
}
</style>