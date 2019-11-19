<template>
  <div class="wrapper">
    <return-head title="更换手机"></return-head>

    <div class="info">
      <div class="main">
        您已绑定手机号码：
        <span>{{phoneNumber}}</span>
      </div>
      <div class="intro">手机号码用于登录账号，更换号码不会对个人信息与已有内容造成影响。</div>
    </div>
    <div class="items">
      <div class="item border-bottom-1px">
        <cube-input type="number" placeholder="请输入新的手机号码" v-model="changePhoneNumber"></cube-input>
      </div>
      <div class="item border-bottom-1px">
        <div class="input">
          <cube-input placeholder="请输入短信验证码" v-model="verificationCode"></cube-input>
        </div>
        <verification-button :phoneNumber="changePhoneNumber" :smsType="4"></verification-button>
      </div>
    </div>
    <cube-button :primary="true" class="btn" :disabled="btnDisabled" @click="sure">确认修改</cube-button>
  </div>
</template>

<script>
  import utils from "_libs/utils";
  import returnHead from '_c/head/return-head';
  import verificationButton from "_c/button/verification-button";

  export default {
    components: { returnHead, verificationButton },
    data() {
      return {
        type: 'password',
        eye: {
          open: true,
          reverse: false
        },
        phoneNumber: '',
        btnDisabled: true,

        verificationCode: '',
        changePhoneNumber: ' ',
      };
    },
    created() {
      this.phoneNumber = utils.hiddenPhoneNum(JSON.parse(localStorage.getItem('userInfo')).infos.userPhone);
    },
    watch: {
      verificationCode() {
        this.btnDisabledChange();
      },
      changePhoneNumber() {
        this.btnDisabledChange();
      },
    },
    methods: {
      back(e) {
        setTimeout(() => {
          this.$router.goBack();
        }, 50);
      },
      btnDisabledChange() {
        if(this.verificationCode !== '' && this.changePhoneNumber !== '') {
          this.btnDisabled = false;
        } else {
          this.btnDisabled = true;
        }
      },
      sure() {
        if (utils.numberVerification("telephone",this.changePhoneNumber)) {
          let self = this;
          self.$post("change","/phone",{
            newPhone: self.changePhoneNumber,
            newPhoneCode: self.verificationCode
          }).then((res)=>{
            const toast = this.$createToast({
              type: "correct",
              txt: "修改成功"
            });
            toast.show();
            setTimeout(() => {
              utils.logout();
            }, 500);
          });
        } else {
          const toast = this.$createToast({
            type: 'warn',
            txt: "请输入正确的手机号码"
          });
          toast.show();
        }
      }
    }
  };
</script>

<style lang="stylus" scoped>
.info {
  width: 100%;
  height: 25.6vw;
  background: #fff;
  display: flex;
  flex-direction: column;
  margin-top: 2.6667vw;
  text-align: center;

  .main {
    font-size: 4.2667vw;
    color: #666;
    font-weight: bold;
    padding: 3.7333vw 0;

    span {
      color: #3388FF;
    }
  }

  .intro {
    width: 75.7333vw;
    color: #ccc;
    font-size: 3.4667vw;
    margin: 0 auto;
    line-height: 4.2667vw;
  }
}

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

    span {
      color: #666;
      font-size: 4.2667vw;
    }

    b {
      color: #666;
      font-size: 3.4667vw;
    }

    // .send{
    // flex: 0 0 22.9333vw;
    // height: 10.1333vw;
    // background: #3388FF;
    // display: flex;
    // justify-content center;
    // align-items center;
    // color: #fff;
    // border-radius: 1.3333vw;
    // padding: 0;
    // font-size: 3.7333vw;
    // }
    .send {
      flex: 0 0 22.9333vw;
      height: 9.6vw;
      border-radius: 1.3333vw;
      overflow: hidden;

      button {
        display: block;
        height: 9.6vw;
        font-size: 3.4667vw;
        padding: 0;
      }
    }

    >>>.cube-input {
      flex: 1;
      font-size: 3.4667vw;

      &:after {
        content: none;
      }

      input {
        padding: 2.66667vw 0;
      }
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

  &:after {
    content: none;
  }
}
</style>
