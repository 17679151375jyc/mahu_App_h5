<template>
  <div class="wrapper">
    <return-head title="我要报装"
                 rightText="地址管理"
                 @rightBtnOnClick="toAddressManagement">
    </return-head>

    <div class="installation-title-box">套餐选择</div>
    <div class="installation-details-box">
      <div class="installation-details-content-box">
        <p class="installation-details-content-box-text">家无忧套餐</p>
        <div class="base-horizontal-layout-general" style="position: relative">
          <div class="base-vertical-layout-general-item-center"
               v-bind:class="{'installation-details-content-box-item-box':true}"
               style="border-right: 0.27vw solid rgba(227,228,230,1)">
            <p class="installation-details-content-box-item-box-title">专享服务</p>
            <div v-for="(item,index) in installationList[0].main.content1" :key="index">
              <p v-bind:class="{'installation-details-content-box-item-box-text0' : index===0,
                  'installation-details-content-box-item-box-text' : index!==0}">{{item}}</p>
            </div>
            <p style="font-size: 2.67vw;color: #C7C8C9;text-decoration: line-through;margin-top: 2.67vw;line-height: 6.4vw">原价:¥380.00/月</p>
            <p style="font-size: 4vw;color: red">¥268.00/月</p>
          </div>
          <div class="base-vertical-layout-general-item-center" v-bind:class="{'installation-details-content-box-item-box':true}">
            <p class="installation-details-content-box-item-box-title">硬件配套</p>
            <div v-for="(item,index) in installationList[0].mating.content2" :key="index"
                 class="base-horizontal-layout-space-between-item-center" style="width: 100%">
              <p v-bind:class="{'installation-details-content-box-item-box-text0' : index===0,
                  'installation-details-content-box-item-box-text' : index!==0}">{{item.content}}</p>
              <p v-bind:class="{'installation-details-content-box-item-box-text0' : index===0,
                  'installation-details-content-box-item-box-text' : index!==0}">x{{item.sum}}</p>
            </div>
            <p style="font-size: 2.67vw;color: #C7C8C9;text-decoration: line-through;margin-top: 2.67vw;line-height: 6.4vw">原价:¥7800.00/月</p>
            <p style="font-size: 4vw;color: red">¥6668.00</p>
          </div>
        </div>
      </div>
      <!--<button-background-bottom text="确认报装"-->
                                <!--:icon="require('@/assets/icon/icon_add-white.png')"-->
                                <!--@buttonOnClick="packaging">-->
      <!--</button-background-bottom>-->

      <float-button text="确认报装"
                    :icon="require('@/assets/icon/icon_add-white.png')"
                    @buttonOnClick="packaging">
      </float-button>
    </div>

    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import utils from "_libs/utils";
  import returnHead from '_c/head/return-head';
  import floatButton from '_c/button/float-button';

  export default {
    name: "installation",
    components: {
      returnHead,
      floatButton
    },
    data() {
      return {
        installationList: [
          {
            main: {
              content1: ['自动出警','消息通报'],
            },
            mating: {
              content2: [
                {
                  content: 'XXX只能防盗主机',
                  sum: 1
                },
                {
                  content: 'xx智能门锁',
                  sum: 1
                },
              ]
            }
          }
        ]
      }
    },
    mounted() {
      utils.hideTab();
    },
    methods: {
      toAddressManagement() {
        this.$router.push({ path: "/my-home/installation/address-management", query: {}});
      },
      packaging() {

      }
    }
  };
</script>

<style scoped>
  .installation-title-box {
    margin-top: 5vw;
    background-color: white;
    height: 12vw;
    font-size: 3.73vw;
    font-weight: bold;
    color: #45484D;
    line-height: 12vw;
    padding: 0 5vw;
    border-bottom: 0.27vw solid rgba(227,228,230,1);
  }
  .installation-details-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    height: calc(100vh - 16.7333vw - 5vw - 12vw);
  }
  .installation-details-content-box {
    width: 89.33vw;
    margin-top: 5.33vw;
    border: 0.27vw solid rgba(227,228,230,1);
    border-radius: 1.33vw;
  }
  .installation-details-content-box-text {
    font-size: 3.73vw;
    font-weight: bold;
    color: #45484D;
    text-align: center;
    line-height: 12vw;
    border-bottom: 0.27vw solid rgba(227,228,230,1);
  }
  .installation-details-content-box-item-box {
    width: 44.53vw;
    padding: 2.67vw 4vw;
    box-sizing: border-box;
  }
  .installation-details-content-box-item-box-title {
    font-size: 3.2vw;
    font-weight: bold;
    color: #737780;
    line-height: 6.4vw;
  }
  .installation-details-content-box-item-box-text0 {
    font-size: 2.67vw;
    font-weight: 400;
    color: #737780;
    margin-top: 2.67vw;
  }
  .installation-details-content-box-item-box-text {
    font-size: 2.67vw;
    font-weight: 400;
    color: #737780;
    margin-top: 1.33vw;
  }
  .installation-details-btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 73.33vw;
    height: 12.27vw;
    margin-bottom: 5.33vw;
    background-color: #3388FF;
    border-radius: 61.3vw;
  }
  .installation-details-btn-text {
    font-size: 3.73vw;
    font-weight: bold;
    color: white;
    line-height: 12.27vw;
  }
</style>
