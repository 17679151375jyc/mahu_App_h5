<template>
  <div class="scroll-wrapper" style="z-index: 11">
    <base-popup v-if="isPopShow"
                :refId="refId"
                :popPosition="popPosition"
                :popupContainerStyle="popupContainerStyle"
                :isShowbtn="false">

      <div class="base-horizontal-layout-space-between-item-center">
        <p style="font-size: 4.27vw;color: #666666;text-align: center"></p>
        <img :src="require('./icon_close-gray.png')"
             @click="closePoppup"
             style="width: 10vw;height: 10vw;margin:7vw 2.67vw 0 0">
      </div>
      <div class="base-vertical-layout-space-between"
           style="height: calc(100vh - 24vw);box-sizing: border-box">
        <div class="base-vertical-layout-general">
          <div class="base-vertical-layout-center-item-center">
            <img :src="isHeadPortrait ? mUserHeadPortrait : require('@/view/mine/avatar2.png')"
                 style="box-sizing: border-box;
                        border-radius: 50%;border-style: solid;border-color: white;border-width: 2px 2px 2px 2px"
                 :style="isHeadPortrait ? 'width: 14.7888vw;height: 14.7888vw' : 'width: 22.7888vw;height: 22.7888vw;'"
                 @click="toUserManage">
            <div style="font-size: 4.27vw;color: #666"
                 :style="isHeadPortrait ? 'margin-top: 2.4vw' : ''"
                 @click="toUserManage">{{getNickName()}}</div>
            <div style="font-size: 3.2vw;color: #CCC;margin-top: 1.077777vw"
                 @click="toUserManage">{{mUserPhone}}</div>
          </div>
          <div class="base-vertical-layout-general" style="margin-top: 10vw">
            <div v-for="(item, index) in functionList" :key="index"
                 class="base-horizontal-layout-space-between-item-center"
                 style="margin: 0 5.333333vw;padding: 3.733333vw 0;border-bottom: 1px solid rgba(227,228,230,1)"
                 @click="clickItem(item.label)">
              <div class="base-horizontal-layout-center-item-center">
                <img :src="item.icon" style="width: 5.333333vw;height: 5.333333vw">
                <p class="base-text-details-large-black-666" style="margin-left: 3.2vw">{{item.label}}</p>
              </div>
              <div class="base-horizontal-layout-center-item-center">
                <p v-if="item.hasOwnProperty('sum')" class="base-text-details-large-gray-ccc" style="margin-right: 3.73vw">{{item.sum}}</p>
                <img :src="require('@/assets/icon/icon_arrow-right-2.png')" style="width: 2.666666vw;height: 4.666666vw">
              </div>
            </div>
          </div>
        </div>
        <div style="margin-bottom: 3vw">
          <cube-button :primary="true" class="mine-popup-btn" @click="logOut">退出登录</cube-button>
        </div>
      </div>
    </base-popup>
  </div>
</template>

<script>
  import utils from "_libs/utils";
  import basePopup from '_c/popup/base-popup';
  import { mapActions } from 'vuex';
  import { mapState } from 'vuex';

  export default {
    name: "mine-popup",
    props:
      {

      },
    components: {
      basePopup
    },
    data() {
      return {
        isPopShow: false,
        refId: 'minePopup',
        popPosition: 'left',
        popupContainerStyle: {width: '67vw',  height: '100%', padding: '0', borderRadius: '0'},
        // popupContainerStyle: {width: '67vw', height: '100vh', padding: '0',borderRadius: '0'},
        popListTitle: "",

        isHeadPortrait: false,
        functionList: [
          // {
          //   icon: require('./icon_mine-plot.png'),
          //   label: "账号所属社区",
          //   sum: 0
          // },
          {
            icon: require('./icon_mine-password.png'),
            label: "修改登录密码"
          },
          {
            icon: require('./icon_mine-phone.png'),
            label: "修改绑定手机"
          }
        ]
      }
    },
    computed: {
      ...mapState({
        'mUserHeadPortrait': state => state.user.userHeadPortrait,
        'mUserNickName': state => state.user.userNickName,
        'mUserPhone': state => state.user.userPhone,
        'mUserPlotList': state => state.user.userPlotList
      })
    },
    created() {
      this.getHeadPortrait();//获取头像
      this.functionList.forEach((item) => {
        if (item.label === "账号所属社区") {
          item.sum = this.mUserPlotList.length;
        }
      })
    },
    mounted() {
      let self = this;
      self.isPopShow = true;
    },
    watch: {
    },
    methods: {
      ...mapActions(['setIsShowMinePop','setUserID','setUserToken','setAreaTypesList']),
      closePoppup() {
        let self = this;
        self.isPopShow = false;
        self.$emit('mineClose', {isPopShow: this.isPopShow});
      },

      getNickName() {//获取昵称
        return this.mUserNickName === "" ? utils.hiddenPhoneNum(this.mUserPhone) : this.mUserNickName;
      },
      getHeadPortrait() {//获取头像
        if(this.mUserHeadPortrait === "") {
          this.isHeadPortrait = false;
        } else {
          this.isHeadPortrait = true;
        }
      },

      toUserManage() {
        let self = this;
        this.$router.push({
          path: "/mine/userManage"
        });
        self.isPopShow = false;
        self.$emit('mineClose', {isPopShow: self.isPopShow});
      },
      clickItem(label) {
        let self = this;
        switch (label) {
          case "账号所属社区":
            if (self.mUserPlotList.length>0){
              self.$router.push({
                path: "/mine/myPlot"
              });
              self.changeIsPopShowFalse();
            } else {
              const toast = this.$createToast({
                type: 'warn',
                txt: "请先加入社区"
              });
              toast.show();
            }
            break;
          case "修改登录密码":
            self.$router.push({
              path: "/mine/setting/account/changePwd"
            });
            self.changeIsPopShowFalse();
            break;
          case "修改绑定手机":
            self.$router.push({
              path: "/mine/setting/account/changePhone"
            });
            self.changeIsPopShowFalse();
            break;
          default:
            break;
        }
      },
      changeIsPopShowFalse() {
        let self = this;
        self.isPopShow = false;
        self.$emit('mineClose', {isPopShow: self.isPopShow});
      },

      logOut() {
        let self = this;
        self.setAreaTypesList([]);
        self.setIsShowMinePop(false);
        const toast = self.$createToast({
          type: 'correct',
          txt: "退出成功"
        });
        toast.show();
        if(window.CYJ.userID()) {
          setTimeout(() => {
            utils.logout().then((e)=>{
            })
          },200)
        } else {
          self.setUserID("");
          self.setUserToken("");
        }
      }
    }
  }
</script>

<style scoped>
  .pop-list-text {
    font-size: 4.27vw;
    color: #333333;
  }
  .pop-list-text-color {
    color: #3388FF;
  }
  .mine-popup-btn {
    width: 56.3333vw;
    height: 12.2667vw;
    margin: 0 auto;
    border-radius: 7.7333vw;
    color: #fff;
    font-size: 3.7333vw;
  }
</style>