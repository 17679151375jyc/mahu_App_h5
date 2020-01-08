<template>
  <div class="login-wrapper">
     <div class="title">登录</div>
    <cube-input v-model="account" placeholder="账号">
    </cube-input>
    <cube-input v-model="password" placeholder="密码"></cube-input>
    <div class="btn">
      <cube-button @click="login"  :primary="true">登录</cube-button>
    </div>

    <!-- <div style="padding-top: 30vw">
      <input
        type="text"
        :autofocus="false"
        placeholder="账号2"
        v-model="account">
      </input>
      <input
        type="password"
        :autofocus="false"
        placeholder="，密码"
        v-model="password">
      </input>

      <div style="width: 100%;height: 12.277777vw;background-color: #3388FF" @click="login">登录</div>
    </div>-->
  </div>
</template>

<script>
import store from "@/store";

export default {
  name: "login",
  components: {},
  data() {
    return {
      account: "",
      password: ""
    };
  },
  methods: {
    login() {
      let self = this;
      let loginInfo = {};
      self.$post("login", "", {
          phone: self.account,
          password: self.password
        })
        .then(res => {
          loginInfo = res.data.loginInfo;
          self.$store.dispatch("setUserID", loginInfo.userid);
          self.$store.dispatch("setUserToken", loginInfo.token);
           self.$router.replace('/ma-hu-index');
          // window.location.href = window.location.origin+window.location.pathname+"#/ma-hu-index";
          window.location.reload();
        });
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.login-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 4vw 2.667vw 0 2.667vw;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  background: #e4e4e4;
  .title{
      line-height:50px;
      font-size: 5.333vw;
      text-align: center;
  }
  .cube-input{
      margin-bottom:1vw;
  }
  .btn{
      margin-top:2vw;
  }
}
</style>