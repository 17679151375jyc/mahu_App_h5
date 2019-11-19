<template>
  <div class="wrapper">
    <return-head title="地址管理"></return-head>

    <div class="scroll-wrapper" style="top: 16.7333vw">
      <cube-scroll
        ref="scroll"
        :options="scrollOptions"
        :fade="true"
        @pulling-down="onPullingDown"
        @pulling-up="onPullingUp">
        <div v-for="(item,index) in addressManagementInfoList" :key="index">
          <left-slide-delete :index="index" @deleteItem="deleteItem(item,index)">
            <address-management-item :index="index" :addressManagementInfo="item"></address-management-item>
          </left-slide-delete>
        </div>
        <div style="height: calc(12.27vw + 5.33vw + 4vw)"></div>
      </cube-scroll>
    </div>

    <float-button text="添加地址"
                  :icon="require('@/assets/icon/icon_add-white.png')"
                  @buttonOnClick="addAddress">
    </float-button>

    <transition name="slide-fade">
      <router-view ></router-view>
    </transition>
  </div>
</template>

<script>
  import returnHead from '_c/head/return-head';
  import addressManagementItem from '_c/myHome/address-management-item';
  import leftSlideDelete from '_c/leftSlideDelete/left-slide-delete';
  import floatButton from '_c/button/float-button';

  export default {
    name: "my-home-address-management",
    components: {
      returnHead,
      addressManagementItem,
      leftSlideDelete,
      floatButton
    },
    data() {
      return {
        scrollOptions: {
          observeDOM: true,
          click: true,
          probeType: 1,
          scrollbar: false,
          pullDownRefresh: {
            stopTime: 500,
            txt: `刷新成功`
          },
          pullUpLoad: false
        },

        addressManagementInfoList: [
          {
            name: "叶先生",
            phone: "188****9089",
            area: "广东省 江门市 蓬江区 城区",
            address: "环市二路10号安邦安防营业厅",
          },
          {
            name: "蕉先生",
            phone: "188****0000",
            area: "广东省 江门市 蓬江区 城区",
            address: "环市二路10号安邦安防营业厅",
          },
          {
            name: "焦警",
            phone: "188****1111",
            area: "江苏省 盐城市 亭湖区 城区",
            address: "建军东路159号",
          },
          {
            name: "叶先生",
            phone: "188****9089",
            area: "广东省 江门市 蓬江区 城区",
            address: "环市二路10号安邦安防营业厅",
          },
          {
            name: "蕉先生",
            phone: "188****0000",
            area: "广东省 江门市 蓬江区 城区",
            address: "环市二路10号安邦安防营业厅",
          },
          {
            name: "焦警",
            phone: "188****1111",
            area: "江苏省 盐城市 亭湖区 城区",
            address: "建军东路159号",
          },
        ]
      }
    },
    watch: {

    },
    methods: {
      deleteItem(item,index) {
        this.addressManagementInfoList.splice(index,1);
      },
      addAddress() {
        this.$router.push({path: "/my-home/installation/address-management/address-management-change", query: {title: "添加地址"}});
      },

      // 刷新
      onPullingDown() {
        this.$refs.scroll.forceUpdate();
      },
      onPullingUp() {
        this.$refs.scroll.forceUpdate();
      },
    }
  };
</script>

<style scoped>

</style>
