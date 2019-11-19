<template>
  <div class="wrapper">
    <return-head title="添加反馈" rightText="提交" @rightBtnOnClick="summit"></return-head>

    <div class="service-addfeed-box">
      <div class="base-horizontal-layout-space-between">
        <div class="base-horizontal-layout-center-item-center">
          <div class="base-horizontal-layout-center-item-center"
               style="margin-right: 5.333333vw"
               v-for="(item,index) in type" :key="index"
               @click="changeType(index)">
            <img :src="item.isChoose ? chooseIcon : noChooseIcon"
                 style="width: 5vw;height: 5vw">
            <p class="base-text-title-normal-black" style="color: #666666;margin-left: 2.677777vw">{{item.str}}</p>
          </div>
        </div>
      </div>

      <textarea id="serviceAddfeedTextarea"
                style="width: 84vw;height: 46vw;box-sizing: border-box;
                        margin-top: 5.33vw;padding: 2.67vw 4.27vw;background: #F5F5F5;
                               border:none;resize:none;outline:none;
                               font-size: 3.73vw;color: #666666;border-radius: 1.6vw"
                placeholder="请简要描述您提交的内容，我们将尽快跟进处理。（请控制在200字以内）"
                maxlength="200"
                v-model="content"/>

      <div v-if="mUserPlotList.length>1" class="base-horizontal-layout-general" style="margin-top: 3.4vw">
        <div v-if="plotInfo.value" class="base-horizontal-layout-center-item-center" @click="choosePlot">
          <img :src="require('./location.png')" style="width: 2.67vw;height: 3.2vw;margin-right: 1vw">
          <p class="base-text-title-normal-blue" style="font-size: 3.2vw;text-decoration: underline">{{plotInfo.value}}</p>
        </div>
        <p v-else class="base-text-title-normal-blue" style="text-decoration: underline" @click="choosePlot">选择住宅</p><!--社区-->
        <!--<p v-if="!isPic" class="base-text-title-normal-blue"-->
           <!--style="text-decoration: underline;margin-left: 8vw"-->
           <!--@click="addPic">添加图片</p>-->
      </div>
      <div v-else class="base-horizontal-layout-general" style="margin-top: 3.4vw">
        <div v-if="plotInfo.domicileName" class="base-horizontal-layout-center-item-center">
          <img :src="require('./location.png')" style="width: 2.67vw;height: 3.2vw;margin-right: 1vw">
          <p class="base-text-title-normal-blue" style="font-size: 3.2vw">{{plotInfo.domicileName}}</p>
        </div>
      </div>

      <div v-if="isPic" class="base-horizontal-layout-general" style="margin-top: 3.4vw" >
        <div v-if="uploadFile.length>0" class="base-horizontal-layout-general">
          <div v-for="(item,index) in uploadFile" :key="index" style="margin-right: 2.133333vw">
            <img :src="item" class="service-addfeed-choose-pic" @click="toPicDetails(item,index)"/>
            <!--<span class="cubeic-close"-->
                  <!--style="font-weight: bold;font-size: 0.5rem;"-->
                  <!--@click="uploadFile = null"></span>-->
          </div>
        </div>

        <div v-if="uploadFile.length<3">
          <img :src="require('./add-pic.png')" class="service-addfeed-choosePic-icon">
          <div style="position:relative;background: transparent;width: 0;height: 0;bottom: 18.93vw">
            <form enctype="multipart/form-data" action="" method="post">
              <input type="file"
                     name="file"
                     ref="file"
                     multiple="multiple"
                     @change="fileChange($event)"
                     accept="image/png, image/jpeg, image/gif, image/jpg"
                     style="opacity: 0;width: 18.93vw;height: 18.93vw"/>
            </form>
          </div>

          <!--多选-->
          <!--<label for="picture" class="label" v-show="addShow">-->
            <!--<span class="iconfont icontianjia add"></span>-->
            <!--<input type="file"-->
                   <!--name="picture"-->
                   <!--id="picture"-->
                   <!--multiple="multiple"-->
                   <!--@select="selectFile"-->
                   <!--v-if="fileShow"-->
                   <!--class="my-input"-->
                   <!--accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"-->
                   <!--@change="getFiles" />-->
          <!--</label>-->
        </div>
      </div>
    </div>

    <feedback-plot-popup v-if="isFeedbackPlotPopup"  @sureFeedbackPlot="surePopup" @cancelFeedbackPlot="cancelPopup"/>

    <base-popup v-if="isPopShow"
                :refId="refId"
                :popTitle="popTitle"
                @leftBtnPoppup="leftBtnPoppup"
                @rightBtnPoppup="rightBtnPoppup">
      <!--没有回车的纯文字-->
      <div class="base-vertical-layout-center-item-center">
        <p class="popup-text" style="width: 53.33vw">{{popPlainText}}</p>
      </div>
    </base-popup>

    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import utils from "_libs/utils";
import returnHead from '_c/head/return-head';
import Textarea from "cube-ui/src/components/textarea/textarea";
import feedbackPlotPopup from "_c/service/feedback-plot-popup";
import basePopup from '_c/popup/base-popup';
import { mapState } from 'vuex';

export default {
  name: "serviceAddfeed",
  components: {Textarea, returnHead, feedbackPlotPopup, basePopup },
  data() {
    return {
      userInfo: {},
      plotList: [],

      chooseIcon: '',
      noChooseIcon: '',
      // type: [{isChoose: true, str:"投诉与建议"}, {isChoose: false, str:"报障"}],
      type: [{isChoose: true, str:"投诉"}, {isChoose: false, str:"报障与维修"}, {isChoose: false, str:"建议"}],
      isFeedbackPlotPopup: false,
      plotInfo: {},
      content: '',
      isPic: false,
      uploadFile: [],

      myComnunities: {},
      comcity: "选择社区",
      // uploadFile: "",
      imgs: [],

      isSummit: false,

      isPopShow: false,
      refId: 'addFeedBackPopup',
      popTitle: '',
      popPlainText: '',
      feedbackType: 0,
    };
  },
  computed: {
    ...mapState({
      'mUserPlotList': state => state.user.userPlotList
    })
  },
  created() {
    this.chooseIcon = require('@/assets/icon/icon-list-selectd.png');
    this.noChooseIcon = require('@/assets/icon/icon-list-unselect.png');

    this.plotList = [...this.mUserPlotList];
    if(this.plotList.length===1) {//todo 后期需要修改
      console.log(this.plotList[0].domicile);
      if(this.plotList[0].domicile.length===1) {
        console.log(this.plotList[0].domicile[0].domicileName);
        this.plotInfo = this.plotList[0].domicile[0];
        this.isFeedbackPlotPopup = false;
      }
    }
  },
  methods: {
    back(e) {
      setTimeout(() => {
        this.$router.goBack();
      }, 50);
    },

    changeType(index) {//选择类型
      this.type.forEach((item) => {
        item.isChoose = false;
      });
      this.type[index].isChoose = true;
    },
    choosePlot() {//选择社区
      this.isFeedbackPlotPopup = true;
    },
    surePopup(e) {
      this.plotInfo = e.myChoosePlot;
      this.isFeedbackPlotPopup = false;
    },
    cancelPopup() {
      this.isFeedbackPlotPopup = false;
    },

    summit() {//提交
      let self = this;
      if(self.isSummit) {
        return;
      } else {

        this.type.forEach((item,index) => {
          if(item.isChoose) {
           self.feedbackType = index;
          }
        });
        if (self.plotInfo.domicileID) {
          if (self.content === "") {
            const toast = self.$createToast({
              type: 'warn',
              txt: "请填写反馈内容！"
            });
            toast.show();
          } else {
            self.isPopShow = true;
            self.popTitle = '提示';
            self.popPlainText = '是否确定提交？';
          }
        } else {
          const toast = self.$createToast({
            type: 'warn',
            txt: "请选择住宅！"
          });
          toast.show();
        }
      }
    },
    leftBtnPoppup() {
      this.clearPoppup();
    },
    rightBtnPoppup() {
      // this.getInfo(1);
      let self = this;
      self.isSummit = true;
      self.$post("community","/feedback/add",{
        domicileId: self.plotInfo.domicileID,
        feedbackType: self.feedbackType,
        feedbackContent: self.content,
        feedbackPics: [],
      }).then((res)=>{
        self.clearPoppup();
        localStorage.setItem("feedbackChange","add");
        const toast = self.$createToast({
          type: 'correct',
          txt: "提交成功！"
        });
        toast.show();
        setTimeout(() => {
          self.$router.goBack();
          self.isSummit = false;
        }, 700);
      });
    },
    clearPoppup() {
      this.isPopShow = false;
      this.popTitle = "";
      this.popPlainText = "";
      this.feedbackType = 0;
    },

    addPic() {
      this.isPic = true;
    },
    fileChange(e) {
      let self = this;
      let file = document.getElementsByName('file')[0].files[0];
      // let mFile = e.target.files[0];
      // let mFileArray = [];
      utils.toFileBase64(file).then((base64) => {
        self.uploadFile.push(base64);
        // self.mFile = e.target.files;
      });
    },
    // getFiles(e) {//todo 多选
    //   const file = Array.from(e.target.files);
    //   let arr = new Array();
    //   arr = file.concat();
    //   if (arr.length > 3) {
    //     arr = arr.splice(0, 3);
    //   // this.$fixBox.show({
    //   // title: '',
    //   // content: '当前只支持同时发布至多三张照片,多余的照片将不会被上传',
    //   // show: true
    //   // })
    //   }
    //   const {
    //     length
    //   } = arr;
    //   if (length + this.picList.length > 3) {
    //     for (let i = 0; i < length + this.picList.length - 3; i++) {
    //       arr.pop();
    //     }
    //   }
    //   arr.map((target, index) => {
    //     if (target.type.split("/")[0] !== "image") {
    //       // console.log(12355);
    //       arr.splice(index, 1);
    //     }
    //     this.lrzImg(target, index, length);
    //     // console.log(target)
    //   })
    // },
    toPicDetails(url,index) {
      let self = this;
      self.$router.push({ path: "/service/feedback/addFeedback/picture-dispose-larger",
        query: {url: url, index: index+1, sum: self.uploadFile.length}});
    },





    filesAdded(files) {
      let hasIgnore = false;
      const maxSize = 10 * 1024 * 1024; // 10M
      for (let k in files) {
        const file = files[k];
        if (file.size > maxSize) {
          file.ignore = true;
          hasIgnore = true;
        }
      }
      hasIgnore &&
        this.$createToast({
          type: "warn",
          time: 1000,
          txt: "You selected >1M files"
        }).show();
    },
    selectValue(value) {
      for (let i = 0; i < Array.from(this.options).length; i++) {
        Array.from(this.options)[i].className.pop();
        Array.from(this.options)[i].labelClass.pop();
      }
      Array.from(this.options)[value].className.push("active");
      Array.from(this.options)[value].labelClass.push("label-active");
      this.myComnunities = Array.from(this.options)[value];
    }
  }
};
</script>

<style lang="stylus" scoped>
  .service-addfeed-box {
    width: 100%;
    box-sizing: border-box;
    background-color: white;
    padding: 4vw 8vw;
    margin-top: 3.2vw;
  }
  .service-addfeed-choose-pic {
    width: 18.93vw;
    height: 18.93vw;
    border-radius: 1.33vw;
  }
  .service-addfeed-choosePic-icon {
    width: 18.93vw;
    height: 18.93vw;
    background-color: rgba(237, 238, 240, 1);
    border-radius: 1.33vw;
    padding: 3.47vw;
    box-sizing: border-box;
  }

  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    color: #CCCCCC;
    font-size: 3.73vw;
  }
  input:-moz-placeholder, textarea:-moz-placeholder {
    color: #CCCCCC;
    font-size: 3.73vw;
  }
  input::-moz-placeholder, textarea::-moz-placeholder {
    color: #CCCCCC;
    font-size: 3.73vw;
  }
  input:-ms-input-placeholder, textarea:-ms-input-placeholder {
    color: #CCCCCC;
    font-size: 3.73vw;
  }


.record-wrapper {
  .handler {
    width: 23.4667vw;
    height: 11.7333vw;

    .item {
      width: 13.3333vw;
      height: 11.7333vw;
      margin-left: 10.1333vw;
      color: #B3B3B3;
      font-size: 4.2667vw;
    }
  }

  .container {
    margin-top: 3.2vw;
    background: #fff;
    padding: 4.2667vw 8vw;
    box-sizing: border-box;

    >>>.textarea {
      width: 100%;
      height: 45.8667vw;
      margin: 5.3333vw 0;

      .cube-textarea {
        background: #CCCCCC;
        font-size: 3.7333vw;
        color: #666;
        border-radius: 1.6vw;
      }
    }

    .img-items {
      display: flex;

      .item, .icon {
        width: 18.9333vw;
        height: 18.9333vw;
        border-radius: 1.3333vw;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .item {
        margin-right: 2.1333vw;
        position: relative;
        background #fff
        border: 0.1333vw solid #e5e5e5
        box-sizing border-box
        i {
          position: absolute;
          width: 5.3333vw
          height 5.3333vw
          background #FF3333
          display: flex
          justify-content center
          align-items center
          color: #fff
          border-radius 50%
          top: -1.3333vw
          right: -1.3333vw
        }

        img {
          max-width: 100%;
          max-height: 100%;
        }
      }

      .icon {
        background: #EDEEF0;
        color: #fff;

        i {
          font-size: 9.3333vw;
        }
      }
    }
  }

  .type {
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;

    .items {
      flex: 1;
      display: flex;

      .item {
        display: flex;
        align-items: center;
        color: #666;
        font-size: 4.2667vw;

        &:nth-child(1) {
          margin-right: 5.3333vw;
        }

        i {
          margin-right: 1.3333vw;
          color: #CCCCCC;
          font-size: 5.3333vw;

          &.iconxuanzhong1 {
            color: #3388FF !important;
          }
        }
      }
    }

    .address {
      flex: 1;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;

      .location {
        display: flex;
        align-items: center;
        justify-content: flex-end;

        img {
          flex: 0 0 3.2vw;
          height: 4.2667vw;
          margin-right: 1.6vw;
        }

        div {
          flex: 1;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }
}
</style>

