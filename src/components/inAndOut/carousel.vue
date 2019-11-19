<template>
  <div class="carousel-wrapper">
    <div class="has-data" v-if="visitorInfo.status===1">
      <div class="left">
        <img class="carousel-qrcode"
             :src="visitorInfo.valid ? require('@/assets/icon/icon_guanwang.png') : require('@/assets/icon/icon_guanwang.png')">
        <button type="button" v-if="visitorInfo.valid" class="share-btn" @click="useShare">
          <img style="width: 3.2vw;height: 3.2vw"
               :src="require('@/assets/icon/icon-share-white.png')"> 分享二维码
        </button>
        <button type="button" v-else class="share-btn" @click="editProfile">重新激活二维码</button>
      </div>

      <div class="right">
        <p style="height: 8vw;width: 52vw;display: flex;flex-direction: row;align-items: center"
           @click="editProfile">
          <span class="name">{{visitorInfo.vistorName}}</span>
          <span style="margin-left: 0.33vw">
            <img style="width: 2.13vw;height: 3.2vw"
                 :src="visitorInfo.vistorSex==='男' ? require('@/assets/icon/icon-male.png') : require('@/assets/icon/icon-female.png')">
          </span>
          <span class="name" style="margin-left: 1.33vw;color: #333333">{{phoneNumber}}</span>
          <!--<img v-if="visitorInfo.vistorPicture!==''" style="border-radius: 1.33vw;width: 8vw;height: 8vw;margin-left: 1.33vw"-->
               <!--:src="visitorInfo.vistorPicture" >-->
          <!--暂时先不用头像-->
          <!--:data-echo="require('@/assets/inAndOut/head.png')"-->
            <!--:src="require('@/assets/inAndOut/head.png')">-->
        </p>

        <div class="second-line" @click="editProfile">
          <span>
            <img style="width: 3.2vw;height: 3.23vw" :src="require('@/assets/icon/icon_position.png')">
          </span>
          <div>
            <span style="margin-left: 1vw"> {{visitorInfo.plotName}} </span>
            <span style="margin-left: 1vw">同行</span>
            <span style="margin-left: 0;color: #3388FF">{{visitorInfo.vistorNumbers}}</span>
            <span style="margin-left: 0">人</span>
          </div>
        </div>
        <div class="come-out-wraper" @click="editProfile">
          <span>
            <img style="width: 3.2vw;height: 3.2vw" :src="require('@/assets/icon/icon_time.png')">
          </span>
          <div class="come-out-time" style="margin-top: 0.1vw">
            <p>{{visitorInfo.startTime}} 来访</p>
            <p>{{visitorInfo.endTime}} 离开</p>
          </div>
        </div>
        <p>
          <button type="button" class="delect-btn"
                  @click="deleteVisitor(visitorInfo.vistorID)"
                  @touchstart="touchStart"
                  @touchend="touchEnd"
                  :style="isTouch?'background-color: rgba(0,0,0,0.1)':''"
          >删除访客</button>
        </p>
      </div>
    </div>

    <div v-else class="agree">
      <h3>申请来访</h3>
      <div class="agree-container">
        <div class="line-wraper">
          <div class="base-vertical-layout-general">
            <div class="base-horizontal-layout-general">
              <p class="name">{{visitorInfo.vistorName}}</p>
              <span>
                <img style="width: 2.13vw;height: 3.2vw"
                     :src="visitorInfo.vistorSex==='男' ? require('@/assets/icon/icon-male.png') : require('@/assets/icon/icon-female.png')">
              </span>
            </div>
            <p class="name">{{phoneNumber}}</p>
          </div>
          <!--<img style="border-radius: 1.33vw;width: 8vw;height: 8vw;margin-left: 1.33vw"-->
               <!--:src="require('@/assets/inAndOut/icon_record@2x.png')">-->
        </div>
        <div style="width: 0.27vw;height: 10.67vw;background-color: #E3E4E6;margin: 0 0 0 2vw"></div>
        <div style="display: flex;flex-direction: column;margin: 0 1.67vw">
          <div style="display: flex;flex-direction: row;margin: 0 0 1.07vw 0">
            <!--<span>-->
              <img style="width: 3.2vw;height: 3.23vw" :src="require('@/assets/icon/icon_position.png')">
            <!--</span>-->
            <div>
              <span style="margin-left: 1vw"> {{visitorInfo.plotName}} </span>
              <span style="margin-left: 1vw">同行</span>
              <span style="margin-left: 0;color: #3388FF">{{visitorInfo.vistorNumbers}}</span>
              <span style="margin-left: 0">人</span>
            </div>
          </div>
          <div class="come-out-wraper">
            <!--<span>-->
              <img style="width: 3.2vw;height: 3.2vw" :src="require('@/assets/icon/icon_time.png')">
            <!--</span>-->
            <div class="come-out-time" style="margin-top: 0.1vw">
              <p>{{visitorInfo.startTime}} 来访</p>
              <p>{{visitorInfo.endTime}} 离开</p>
            </div>
          </div>
        </div>
      </div>
      <div class="agree-refuse">
        <button type="button" class="cancel-btn" @click="agreeVisitor(visitorInfo.vistorID,2)">拒绝申请</button>
        <button type="button" class="ok-btn" @click="agreeVisitor(visitorInfo.vistorID,1)">同意申请</button>
      </div>
    </div>
  </div>
</template>

<script>
  import utils from "_libs/utils";
  import { mapActions } from 'vuex';

  export default {
    name: "carousel",
    components: {},
    props:
      {
        index: {
          type: Number,
          default: 0
        },
        visitorInfo: {}
      },
    data() {
      return {
        isTouch: false,

        defaultUrl: "./",
        effectiveQrcode: false,
        phoneNumber: '',
      };
    },
    computed: {},
    created() {
      this.phoneNumber = utils.hiddenPhoneNum(this.visitorInfo.vistorPhone);
    },
    methods: {
      ...mapActions(
        ['setIsShowOtherPop']
      ),

      touchStart() {
        this.isTouch = true;
      },
      touchEnd() {
        this.isTouch = false;
      },

      editProfile(e) {
        if (window.localStorage) {
          window.localStorage.setItem("hideValue", "false");
          utils.localStorage('visitorInfo', this.visitorInfo);
          this.$router.push("/inAndOut/addVisitorInfo");
        } else {
          this.$router.push("/inAndOut/addVisitorInfo", { hideValue: true });
        }
      },
      useShare(e) {
        let self = this;
        self.$post("entry","/sharedlink",{visitorID: self.visitorInfo.vistorID}).then((res)=>{
          utils.shareUrl(res.data.link, "来访二维码", "使用你的来访二维码进行来访确认");
        });
      },
      useAgain(e) {
        //todo 二维码过期了，调用激活二维码的接口
        // if (window.localStorage) {
        //   window.localStorage.setItem("hideValue", "false");
        //   this.$router.push("/inAndOut/addVisitorInfo");
        // } else {
        //   this.$router.push("/inAndOut/addVisitorInfo", { hideValue: true });
        // }
      },

      deleteVisitor(vistorID) {
        let self = this;
        self.$emit("deleteVisitor", {type: "deleteVisitor", index: self.index, vistorID: vistorID});
      },
      agreeVisitor(vistorID,isAgree) {
        let self = this;
        self.$emit("agreeVisitor", {type: "agreeVisitor", index: self.index, vistorID: vistorID, isAgree: isAgree});
      }
    }
  };
</script>


<style lang="stylus">
  .carousel-wrapper {
    width: 88%;
    margin: 2.67vw 2%;
    /*margin: 2.67vw 8vw;*/
    background: #fff;
    border-radius: 2.67vw;
    padding: 4vw;
    /**box-shadow: 0.15rem 0.6rem 0.4rem rgba(242, 242, 242, 1) inset;**/
    .has-data {
      display: flex;
      flex-direction: row;
      /*align-items: center;*/
    }
    span {
      color: rgba(128, 128, 128, 1);
      font-size: 3.2vw;
      margin-left: 3.2vw;
    }
    .name {
      color: rgba(77, 77, 77, 1);
      /*font-weight: 600;*/
      font-size: 3.47vw;
    }
    .left {
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: hidden;

      /*.invalidQrcode {
        position: relative;
        transform: rotate(-45deg);
        background: rgba(51, 136, 255, 1);
        width: 1.5rem;
        height: 0.6rem;
        color: #fff;
        left: -0.3rem;
        top: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }*/
      .carousel-qrcode {
        width: 26vw;
        height: 26vw;
      }
      .share-btn {
        width: 28.888888vw;
        padding: 1.388888vw 1.788888vw;
        border-radius: 4.53vw;
        font-size: 2.67vw;
        border: none;
        outline: none;
        margin-top: 4vw;
        background: linear-gradient(
          to bottom,
          rgba(102, 166, 255, 1),
          rgba(51, 136, 255, 1)
        );
        color: #fff;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
    .right {
      width: 46vw;
      display: flex;
      flex-direction: column;
      /*justify-content: flex-start;*/
      /*padding: 0 0.1rem;*/
      /*overflow: inherit;*/
      /*text-overflow: ellipsis;*/
      /*align-items: flex-start;*/
      .second-line {
        display: flex;
        flex-direction: row;
        margin: 2.3vw 0 1.07vw 0;
        /*font-size: 0.36rem;*/
      }
      .delect-btn {
        width: 20.67vw;
        height: 6.93vw;
        margin: 6vw 0 0 0;
        border-radius: 1.33vw;
        border: none;
        outline: none;
        font-size: 3.2vw;
        text-align: center;
        background: rgba(242, 242, 242, 1);
        color: rgba(128, 128, 128, 1);
        font-weight: 700;
      }
      p:last-child {
        float: right;
        margin-top: 0.2rem;
        align-self: flex-end;
      }
    }
    /*.no-data {
      padding: 1.9rem 0;
      background: url("/src/assets/inAndOut/no-data.png") no-repeat;
      background-position: center;
    }*/
    .agree {
      display: flex;
      flex-direction: column;
      align-items: center;

      h3 {
        color: black;
        font-weight: bold;
        font-size: 4vw;
        margin: 0 0 2.67vw 0;
        background: rgba(255, 255, 255, 1);
      }

      .agree-container {
        width: 82vw;
        height: 19.33vw;
        background: rgba(247, 248, 250, 1);
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border-radius: 1.33vw;
        .line-wraper {
          display: flex;
          flex-direction: row;
          align-items: center;
          .name {
            color: rgba(77, 77, 77, 1);
            font-size: 3.47vw;
          }
        }
      }
      .agree-refuse {
        display: flex;
        flex-direction: row;
        /*width: 65%;*/
        align-self: flex-end;
        justify-content: space-between;
        margin-top: 2.4vw;

        .cancel-btn {
          width: 20.67vw;
          height: 6.93vw;
          text-align: center;
          background: rgba(242, 242, 242, 1);
          border: 0;
          outline: none;
          border-radius: 0.28rem;
          color: rgba(128, 128, 128, 1);
          font-size: 3.2vw;
        }
        .ok-btn {
          width: 24vw;
          height: 6.93vw;
          margin-left: 5.33vw;
          text-align: center;
          color: rgba(255, 255, 255, 1);
          background: rgba(51, 136, 255, 1);
          border: 0;
          outline: none;
          border-radius: 0.62rem;
          font-size: 3.2vw;
        }
      }
    }
    .last-line {
      display: flex;
      flex-direction: column;
    }
    .come-out-wraper {
      display: flex;
      flex-direction: row;
      // justify-content: space-between;
      // width: 100%;
      .come-out-time {
        display: flex;
        flex-direction: column;
        margin-left: 1.33vw;
        p {
          text-align: left;
          color: #808080;
          font-size: 3.2vw;
          font-weight: 300;
        }
      }
    }
  }
</style>