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
      </cube-scroll>
      <div style="height: 2.9vw"></div>
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

  export default {
    name: "community-add-manage",
    components: {
      returnHead,
      communityAddManageItem,
      buttonAdd
    },
    data() {
      return {
        applyCommunityList: []
      }
    },
    watch: {
      // 监听路由变化
      $route(to, from) {
        if(localStorage.getItem("communityChange")) {
          this.getApplyCommunityList();
          localStorage.removeItem("communityChange");
        }
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
        self.$post("community","/myapply",{}).then((res)=>{
          self.applyCommunityList = [...res.data.list];
        });
      },

      addApplyCommunity() {
        this.$router.push({path: "/mine/myPlot/community-add-manage/community-add"});
      },
      changeApplyCommunity(e) {
        this.$router.push({path: "/mine/myPlot/community-add-manage/community-add", query: {applyID: e.applyID}});
      }
    }
  }
</script>

<style scoped>

</style>