<template>
  <div class="wrapper">
    <topBar title="账号安全">
      <p slot="menu" class="btn"></p>
    </topBar>
    <div class="items">
        <div class="item border-bottom-1px" @click="toChangePwd">
          <span>修改登录密码</span>
          <i class="iconfont icon_right"></i>
        </div>
        <div class="item" @click="toChangePhone">
            <span style="flex: 1">更换手机号码</span>
            <div class="phone">{{phoneNumber}}</div>
             <i class="iconfont icon_right"></i>
        </div>
    </div>

    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import utils from "_libs/utils";
  import topBar from "_c/topBar";
  import cell from "_c/cell";

  export default {
    name: "settingAccount",
    components: { topBar, cell },
    data() {
      return {
        value: true,
        cellstyle: { "border-top": "0" },
        phoneNumber: ""
      };
    },
    created() {
      this.phoneNumber = utils.hiddenPhoneNum(JSON.parse(localStorage.getItem('userInfo')).infos.userPhone);
    },
    methods: {
      toChangePhone() {
        this.$router.push({
          path: "/mine/setting/account/changePhone"
        });
      },
      toChangePwd() {
        this.$router.push({
          path: "/mine/setting/account/changePwd"
        });
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
    margin-left: 5.3333vw;
    padding-right: 5.3333vw;
    justify-content: space-between;
    align-items: center;
    height: 13.3333vw;
    .phone{
        font-size: 3.4667vw;
        color: #ccc;
        margin-right:4vw;
    }
    span {
      color: #666;
      font-size: 3.4667vw;
    }

    i {
      font-size: 4.8vw;
      color: #4d4d4d;
    }

    b {
      color: #ccc;
      font-size: 3.4667vw;
    }
  }
}
</style>
