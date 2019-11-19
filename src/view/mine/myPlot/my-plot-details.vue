<!--@Time  : 2019/09/17 9:42-->
<!--@Author: michael huang-->
<!--@File  : myPlot-details.vue-->

<template>
  <div class="wrapper" style="background-color: white">
    <return-head title="所属社区"></return-head>
    <div class="base-horizontal-layout-general-item-center"
         style="height: 11.733333vw;margin-top: 2.666666vw;padding: 0 5.333333vw">
      <img :src="require('@/components/popup/icon_mine-plot.png')" class="my-plot-details-img">
      <div class="my-plot-details-title-box" :class="['base-horizontal-layout-space-between-item-center']">
        <p class="my-plot-details-title-text">{{plotInfo.plotName}}</p>
        <p style="font-size: 2.9333vw;color: #999">是否开启门铃消息接收开关？</p>
      </div>
    </div>
    <div v-for="(item,index) in plotInfo.domicile" :key="index"
         class="base-horizontal-layout-space-between-item-center"
         style="margin: 0 5.33vw 0 16.5333vw;height: 11.7333vw;border-bottom: 1px solid rgba(204,204,204,0.2)">
      <p class="base-text-details-large-gray">{{item.buildingName}}{{item.doorName}}</p>
      <m-switch :val="item.push" :parameterStr="item.domicileID" @onChange="setIsDoorbellMessage"></m-switch>
    </div>
  </div>
</template>

<script>
  import returnHead from '_c/head/return-head';
  import mSwitch from '_c/button/mSwitch';
  import { mapActions } from 'vuex';
  import { mapState } from 'vuex';

  export default {
    name: "my-plot-details",
    components: { returnHead, mSwitch },
    data() {
      return {
        plotInfo: {}
      }
    },
    computed: {
      ...mapState({
        'mUserPlotList': state => state.user.userPlotList
      })
    },
    created() {
      this.plotInfo = this.mUserPlotList[this.$route.query.index];
    },
    methods: {
      ...mapActions(
        ['setUserPlotList']
      ),

      setIsDoorbellMessage(e) {
        let self = this;
        self.$post("domicile","/deletePush",{
          domicileNumber: e.parameterStr,
          isPush: e.val
        }).then((res)=>{
            self.$post("common","/infos", {
            }).then((res)=> {
              self.setUserPlotList(res.data.plots);
              const toast = this.$createToast({
                type: 'correct',
                txt: '设置成功！'
              });
              toast.show();
            });
        });
      }
    }
  }
</script>

<style scoped>
  .my-plot-details-img {
    width: 8.53vw;
    height: 8.53vw;
    margin-bottom: 2vw;
  }
  .my-plot-details-title-box {
    flex: 1;
    height: 6.53vw;
    margin-left: 2.67vw;
    padding-bottom: 2vw;
    border-bottom: 1px solid rgba(204,204,204,0.2);
  }
  .my-plot-details-title-text {
    width: 32vw;
    height: 4vw;
    font-size: 3.73vw;
    line-height: 4vw;
    color: #666666;
    overflow: hidden;
    /* 文本不会换行 */
    white-space: nowrap;
    /* 当文本溢出包含元素时，以省略号表示超出的文本 */
    text-overflow: ellipsis;
  }
</style>