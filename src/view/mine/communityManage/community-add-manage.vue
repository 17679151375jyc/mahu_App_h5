<!--@Time  : 2019/09/24 12:19-->
<!--@Author: michael huang-->
<!--@File  : community-add-manage.vue-->

<template>
  <div class="wrapper-white">
    <return-head title="社区加入记录"></return-head>

    <div class="scroll-wrapper-addition-title">
      <cube-scroll style="margin: 0 2.6666vw" :data="applyCommunityList">
        <community-add-manage-item
          v-for="(item,index) in applyCommunityList" :key="index"
          style="margin-top: 2.9vw"
          :applyCommunityInfo="item"
          @applyCommunityOnClick="changeApplyCommunity">
        </community-add-manage-item>
        <!--<button-add style="margin-top: 2.9vw" text="添加申请" @btnOnClick="addApplyCommunity"></button-add>-->
        <div style="height: 20.7333vw"></div>
      </cube-scroll>
    </div>

    <div class="base-button-fixed-bottom-bk-white">
      <button-main text="加入社区" @btnOnclick="addApplyCommunity"></button-main>
    </div>

    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import returnHead from '_c/head/return-head';
  import communityAddManageItem from '_c/mine/community/community-add-manage-item';
  import buttonAdd from '_c/button/button-add';
  import buttonMain from '_c/button/button-main';

  export default {
    name: "community-add-manage",
    components: {
      returnHead,
      communityAddManageItem,
      buttonAdd,
      buttonMain
    },
    data() {
      return {
        applyCommunityList: []
      }
    },
    watch: {
      // 监听路由变化
      $route(to, from) {
        if(to.path=='/mine/myPlot/community-add-manage'){
          this.getApplyCommunityList();
        }
       /* if(localStorage.getItem("communityChange")) {
          this.getApplyCommunityList();
          localStorage.removeItem("communityChange");
        }
        if(localStorage.getItem("communityChangeAdd")) {
          this.getApplyCommunityList();
        }*/
      }
    },
    created() {
    },
    mounted() {
      this.getApplyCommunityList();
    },
    methods: {
      getApplyCommunityList() {
        let self = this;
        self.$post("community","/myNewApply",{}).then((res)=>{
          self.applyCommunityList = [...res.data.list];
        });
      },

      addApplyCommunity() {
        this.$router.push({path: "/mine/myPlot/community-add-manage/community-add",
          query: {
            chooseCityPath: '/mine/myPlot/community-add-manage/community-add/choose-city',
            choosePlotPath: '/mine/myPlot/community-add-manage/community-add/choose-plot'}});
      },
      changeApplyCommunity(e) {
        this.$router.push({path: "/mine/myPlot/community-add-manage/community-add",
          query: {applyID: e.applyID,
            chooseCityPath: '/mine/myPlot/community-add-manage/community-add/choose-city',
            choosePlotPath: '/mine/myPlot/community-add-manage/community-add/choose-plot'}});
      }
    }
  }
</script>

<style scoped>

</style>