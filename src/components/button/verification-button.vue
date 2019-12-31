<template>
  <div class="verification-button-box">
    <cube-button
      class="verification-button-text"
      :primary="true"
      :disabled="mCodeBtnDisabled"
      @click="sendVerification"
    >
      <div>
          <span>{{mCodeBtnDisabled ? countDown + '秒后重发' : codeBtnText}}</span>
        <!-- <p :style="codeBtnStyle">{{codeBtnText}}</p>
        <p v-if="mCodeBtnDisabled" :style="codeBtnStyle">({{countDown}}s)</p> -->
      </div>
    </cube-button>
  </div>
</template>

<script>
export default {
  name: "verification-button",
  props: {
    phoneNumber: {
      type: String,
      default: ""
    },
    smsType: {
      type: Number,
      default: 0
    },
    codeBtnDisabled: {
      //todo 按钮两种情况的不可点击，后续再优化
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      codeBtnText: "发送验证码",
      countDown: 60,

      mPhoneNumber: "",
      mCodeBtnDisabled: false
    };
  },
  created() {
    this.mPhoneNumber = this.phoneNumber;
    if (!this.phoneNumber) {
      this.mPhoneNumber = JSON.parse(
        localStorage.getItem("userInfo")
      ).infos.userPhone;
    }

    this.mCodeBtnDisabled = this.codeBtnDisabled;
  },
  mounted() {},
  watch: {
    countDown() {
      if (this.countDown === 0) {
        this.mCodeBtnDisabled = false;
        this.codeBtnText = "发送验证码";
        this.countDown = 60;
      }
    },

    phoneNumber() {
      this.mPhoneNumber = this.phoneNumber;
    }
  },
  methods: {
    sendVerification() {
      let self = this;
      if (self.mPhoneNumber.length === 11) {
        self
          .$post("getCode", "", {
            smsType: self.smsType,
            phone: self.mPhoneNumber
          })
          .then(res => {
            console.log("getCode", res);
            self.mCodeBtnDisabled = true;
            self.codeBtnText = "重新获取验证码";
            if (self.countDown > 0) {
              let interval = setInterval(function() {
                self.countDown--;
                if (self.countDown === 0) {
                  clearInterval(interval);
                }
              }, 1000);
            }
          });
      } else {
        const toast = this.$createToast({
          type: "warn",
          txt: "请输入正确的手机号码"
        });
        toast.show();
      }
    }
  }
};
</script>

<style scoped>
.verification-button-box {
  flex: 0 0 26.9333vw;
  height: 9.6vw;
  border-radius: 1.3333vw;
  overflow: hidden;
}
.verification-button-text {
  display: block;
  height: 9.6vw;
  font-size: 3.4667vw;
  padding: 0;
}
</style>