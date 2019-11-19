<template>
  <div class="wrapper">
    <return-head title="修改密码"></return-head>

    <div class="items">
      <div class="item border-bottom-1px">
        <span>用户手机号</span>
        <p>{{phoneNumber}}</p>
      </div>
      <div class="item border-bottom-1px">
        <div class="input">
          <cube-input placeholder="请输入短信验证码" v-model="verificationCode"></cube-input>
        </div>
        <verification-button :smsType="3"></verification-button>
      </div>
      <div class="item border-bottom-1px">
        <cube-input :type="type" :maxlength="12" :eye="eye" placeholder="请输入新的密码(长度6-12位，数字、字母混合)" v-model="passwordFirst"></cube-input>
      </div>
      <div class="item">
        <cube-input :type="type" :maxlength="12" :eye="eye" placeholder="重复输入新的密码" v-model="passwordSecond"></cube-input>
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
          open: false,
          reverse: false
        },
        phoneNumber: '',
        btnDisabled: true,
        verificationCode: '',
        passwordFirst: '',
        passwordSecond: '',
      };
    },
    created() {
      this.phoneNumber = utils.hiddenPhoneNum(JSON.parse(localStorage.getItem('userInfo')).infos.userPhone);
    },
    watch: {
      verificationCode() {
        this.btnDisabledChange();
      },
      passwordFirst() {
        this.btnDisabledChange();
      },
      passwordSecond() {
        this.btnDisabledChange();
      }
    },
    methods: {
      btnDisabledChange() {
        if(this.verificationCode!=='' && this.passwordFirst!=='' && this.passwordSecond!==''
          && this.passwordFirst.length>5 && this.passwordSecond.length>5) {
          this.btnDisabled = false;
        } else {
          this.btnDisabled = true;
        }
      },
      sure() {
        if (utils.numberVerification("password",this.passwordFirst))
        {
          if (this.passwordFirst !== this.passwordSecond) {
            const toast = this.$createToast({
              type: 'warn',
              txt: "两次输入的密码不一样"
            });
            toast.show();
          } else {
            let self = this;
            self.$post("forget","",{
              phone: JSON.parse(localStorage.getItem('userInfo')).infos.userPhone,
              code: self.verificationCode,
              password: self.passwordSecond
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
          }
        } else {
          const toast = this.$createToast({
            type: 'warn',
            txt: "输入的新密码格式不对(长度6-12位，数字、字母混合)"
          });
          toast.show();
        }
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

    span {
      color: #666;
      font-size: 4.2667vw;
    }

    p {
      color: #666;
      font-size: 3.4667vw;
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
  &:after{
      content: none;
  }
}
</style>
