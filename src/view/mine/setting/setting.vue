<template>
  <div class="wrapper-white">
    <return-head title="通用设置"></return-head>

    <div class="items">
      <div
        class="item"
        v-for="(item, index) in items"
        :key="index"
        @click="clickItem(item)">
        <div class="base-horizontal-layout-center-item-center">
          <img :src="item.icon" style="width: 4.28vw;height: 4.28vw;margin-right: 1.0666vw">
          <span>{{item.label}}</span>
        </div>
        <img v-if="item.to" :src="require('@/assets/icon/icon_arrow-right-small.png')" style="width: 3.2vw;height: 3.2vw">
        <b v-if="item.text">{{item.text}}</b>
      </div>
    </div>

    <div class="base-button-fixed-bottom">
      <button-main text="退出登录" @btnOnclick="logOut"></button-main>
    </div>

    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import utils from "_libs/utils";
  import returnHead from '_c/head/return-head';
  import buttonMain from '_c/button/button-main';
  import { mapActions } from 'vuex';

  export default {
    name: "setting",
    components: { returnHead, buttonMain },
    data() {
      return {
        items: [],
        btnStyle: {},
      };
    },
    created() {
      utils.hideTab();

      let iosItems = [], otherItems = [];
      iosItems = [
        // {
        //   label: "消息通知",
        //   url: "/mine/setting/message"
        // },
        {
          label: "使用帮助",
          icon: require('./setting-help.png'),
          to: true
          // url: "/mine/setting/help"
        },
        // {
        //   label: "账号安全",
        //   url: "/mine/setting/account"
        // },
        // {
        //   label: "清除缓存",
        //   text: "23.17M"
        // },
        {
          label: "关于我们",
          icon: require('./setting-about.png'),
          to: true,
          url: "/mine/setting/about"
        }
      ];
      otherItems = [
        // {
        //   label: "消息通知",
        //   url: "/mine/setting/message"
        // },
        {
          label: "使用帮助",
          icon: require('./setting-help.png'),
          to: true
          // url: "/mine/setting/help"
        },
        // {
        //   label: "账号安全",
        //   url: "/mine/setting/account"
        // },
        {
          label: "清除缓存",
          icon: require('./setting-clear.png'),
          text: " "
        },
        {
          label: "关于我们",
          icon: require('./setting-about.png'),
          to: true,
          url: "/mine/setting/about"
        },
        {
          label: "检查更新",
          icon: require('./setting-update.png'),
          to: true
        }
      ];
      this.items = utils.isIos() ? [...iosItems] : [...otherItems];

      this.items.forEach((item,index) => {
        if (item.label === "清除缓存") {
          this.items[index].text = CYJ.getDataSizeStr();
        }
      });
    },
    methods: {
      ...mapActions(['setIsShowMinePop','setUserID','setUserToken','setAreaTypesList','setIndexPageTabIndex', 'setAreaTypesList']),
      clickItem(item) {
        let self = this;
        switch (item.label) {
          case "清除缓存":
            this.$createDialog({
              type: "confirm",
              icon: "",
              title: "清理缓存",
              content: "您确定要清理当前缓存吗？",
              confirmBtn: {
                text: "清理"
              },
              onConfirm: () => {
                utils.clearAppCache();
                const toast = self.$createToast({
                  type: 'correct',
                  txt: "清理成功！"
                });
                toast.show();
                // self.items[2].text = "";
                item.text = CYJ.getDataSizeStr();
              }
            }).show();
            break;
          case "使用帮助":
            utils.openUserHelperConfig();
            break;
          case "检查更新":
            utils.checkUpdate(true);
            break;
          default:
            break;
        }
        if (item.url) {
          this.$router.push({
            path: item.url
          });
        }
      },

      logOut() {
        this.$createDialog({
          type: "confirm",
          icon: "",
          title: "退出",
          content: "您确定要退出该账户吗？",
          confirmBtn: {
            text: "退出"
          },
          onConfirm: () => {
            this.$createToast({
              type: 'correct',
              txt: "退出成功",
              time: 1000,
              onTimeout: () => {
                // utils.logout().then((e)=>{
                // })
                utils.logout();
              }
            }).show();
          }
        }).show();


      /*  this.setAreaTypesList([]);
        setTimeout(()=>{
          utils.logout().then((e)=>{
          })
        },1000)*/



        /*
        if(window.CYJ.userID()) {
          setTimeout(() => {
            utils.logout().then((e)=>{
            })
          },200)
        } else {
          self.setUserID("");
          self.setUserToken("");
        }
         */
      }
    }
  };
</script>

<style lang="stylus" scoped>
  .items {
    margin: 2.6667vw 0 21.3333vw 0;
    background: #fff;

    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 8vw;
      height: 13.3333vw;

      span {
        color: #666;
        font-size: 4.267vw;
      }

      i {
        font-size: 4.8vw;
        color: #4d4d4d;
      }

      b {
        color: #CCC;
        font-size: 3.7333vw;
        margin-right 2.6666vw;
      }
    }
  }

  .btn {
    width: 89.3333vw;
    height: 12.2667vw;
    margin: 0 auto;
    border-radius: 7.7333vw;
    color: #fff;
    font-size: 3.7333vw;
  }
</style>

<style lang="stylus">
  .cube-dialog-content-def P{
    font-size: 4.2666vw;
  }
</style>
