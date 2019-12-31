<template>
  <div class="wrapper-white">
    <return-head title="添加反馈"></return-head>
      <div class="base-vertical-layout-center-item-center box">
        <div class="base-horizontal-layout-general-item-center box_one_div">
          <div 
            class="base-horizontal-layout-general-item-center tyle_status" 
            v-for="(item, index) in statusList"
            :key="index"
             @click="radioClick(index)">
            <img :src="item.imgShow?chooseIcon:noChooseIcon" />
            <span>{{item.name}}</span>
          </div>
        </div>
        <div class="src_css">
          <textarea 
            class="text_css" 
            v-model="feedbackContent"
            placeholder="请简要描述您提交的内容，我们将尽快跟进处理。（请控制在600字以内）"></textarea>
          <div class="base-horizontal-layout-space-between-item-center but_css_box">
            <div class="address_css">
              <div @click="addressClick" v-if="mUserPlotList.length>1 || (mUserPlotList.length===1 && this.plotList[0].domicile && this.plotList[0].domicile.length>1)">
                <img v-if='plotInfo.domicileID' :src="require('./location.png')"/>
                <span>{{plotInfo.domicileName}}</span>
              </div>
              <div v-else>
                <img :src="require('./location.png')"/>
                <span>{{plotInfo.domicileName}}</span>
              </div>
            </div>
            <div v-if="feedbackPics.length == 0" class="img_css">
              <input type="file" accept="image/*" @change="fileChangeImg($event)"  class="img_click_input"/>
              添加图片</div>
          </div>
          <div class="imgList_box">
            <ul>
              <li v-for="(item, index) in feedbackPics" :key="index" @click="bigImg(index)">
                <div class="img_box_div_css">
                  <img class="img_css_list" :src="item">
                </div>
                <span class="box_span" @click.stop="delImg(index)">
                  <img :src="require('@/assets/notification/cha.png')"/>
                </span>
              </li>
              <li v-if="feedbackPics.length !== 0" style='overflow: hidden;'>
                <img class="jia_hao_css" :src="require('@/assets/notification/jia.png')">
                <input type="file" accept="image/*" @change="fileChangeImg($event)"  class="img_click_input"/>
              </li>
            </ul>
          </div>
        </div>
        <feedback-plot-popup
          v-if="isFeedbackPlotPopup"
          @sureFeedbackPlot="surePopup"
          @cancelFeedbackPlot="cancelPopup"
        />
        <base-popup
          v-if="isPopShow"
          refId="addFeedBackPopup"
          @leftBtnPoppup="leftBtnPoppup"
          @rightBtnPoppup="rightBtnPoppup"
        >
      <!--没有回车的纯文字-->
      <div class="base-vertical-layout-center-item-center">
        <p class="popup-text" style="width: 53.33vw">{{popPlainText}}</p>
      </div>
    </base-popup>
        <div class="base-button-fixed-bottom-bk-gray but_box_css">
          <button-main text="提交" @btnOnclick="summit"></button-main>
        </div>
      </div>
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import returnHead from "_c/head/return-head";
import buttonMain from "_c/button/button-main";
import basePopup from "_c/popup/base-popup";
import feedbackPlotPopup from "_c/service/feedback-plot-popup";
import { mapState } from "vuex";
import COS from "cos-js-sdk-v5";
import lrz from "lrz";
var cos;
export default {
  components: {
    returnHead,
    buttonMain,
    basePopup,
    feedbackPlotPopup
  },
  data(){
    return{
      dataValue: {},
      repeatStatus: true,
      isPopShow: false,
      isFeedbackPlotPopup: false,
      popPlainText: "确定要添加反馈吗？",
      plotInfo: {
        domicileID: "",
        domicileName: "选择社区"
      },
      feedbackType: 0,
      feedbackContent: "",
      chooseIcon: "",
      noChooseIcon: "",
      feedbackPics: [],
      statusList: {
        0:{
          value: 0,
          name: '投诉',
          imgShow: true,
        },
        1:{
          value: 1,
          name: '报障',
          imgShow: false,
        },
        2:{
          value: 2,
          name: '建议',
          imgShow: false,
        }
      },
      plotList:[]
    }
  },
  props: {
    value: {
      // 图片路径
      type: Array,
      default: null
    },
    pathDir: {
      // 文件存放的目录
      type: String,
      default: "/web/family/"
    },
    fileNamePrefix: {
      // 文件名前缀
      type: String,
      default: ""
    }
  },
  computed:{
    ...mapState({
      mUserPlotList: state => state.user.userPlotList
    })
  },
  methods:{ 
    leftBtnPoppup(){
        this.isPopShow = false;
    },
    rightBtnPoppup(){
      if(this.repeatStatus){
        this.repeatStatus = false
        this.onConfirmClick(this.dataValue)
      }else{
        this.toastBox("请勿重复点击")
      }
    },
    summit(){
      let that = this
      let popupText;
      let dataVal = {
        domicileId: that.plotInfo.domicileID,
        feedbackType: that.feedbackType,
        feedbackContent: that.feedbackContent,
        feedbackPics: that.feedbackPics
      }  
      if((dataVal.domicileId && dataVal.feedbackContent)){   
        this.isPopShow = true;
        this.dataValue = dataVal
        
      }else{
        if(dataVal.feedbackContent == ""){
          popupText = '请填写反馈内容'
        }else if(dataVal.domicileId == "" && dataVal.feedbackContent !== ""){
          popupText = '请选择社区'
        }
        that.toastBox(popupText)
      }
      
    },
    onConfirmClick(data){
      let that = this
      if(that.mUserPlotList.length>1 || (that.mUserPlotList.length===1 && that.plotList[0].domicile && that.plotList[0].domicile.length>1)){
        console.log(data)
      }else{
        data = {
          domicileId: that.plotInfo.domicileID,
          feedbackType: that.feedbackType,
          feedbackContent: that.feedbackContent,
          feedbackPics: that.feedbackPics
        }
      }
      setTimeout(()=>{
        that.repeatStatus = true
      }, 2000)
      that.$post("community", "/feedback/add", data)
        .then(({errorCode}) => {
          if(errorCode === 0){
              that.toastBox('添加成功')
              localStorage.setItem("feedbackChange", "add");
              that.$router.goBack();
              that.isPopShow = false;
              // that.repeatStatus = true
            }
          })
    },
    toastBox(popupText){
      this.$createToast({
        type: "txt",
        txt: `${popupText}`
      }).show();
    },
    surePopup(e) {//点击选择楼座
      let { domicileID, domicileName } = e.myChoosePlot;
      this.plotInfo = {
        domicileID,
        domicileName
      }
      this.cancelPopup()
    }, 
    addressClick(){//点击弹出楼座
      this.isFeedbackPlotPopup = true
    },
    cancelPopup() {//收起楼座弹框
      this.isFeedbackPlotPopup = false;
    },
    radioClick(indexVal){//单选框
      this.statusList[indexVal].imgShow = !this.statusList[indexVal].imgShow
      this.feedbackType = indexVal
      for(let index in this.statusList){
        if(index !== indexVal){
          this.statusList[index].imgShow = false
        }
      }
    },
    //查看图片
    bigImg(val) {
      this.$createImagePreview({
        imgs: this.feedbackPics,
        initialIndex: val
      }).show();
    },
    //删除
    delImg(val) {
      // utils.stopBubbling(event);
      this.feedbackPics.splice(val, 1);
    },
    //图片压缩
    fileChangeImg(e) {
      if (this.feedbackPics.length < 9) {
        let file = e.target.files[0];
        if (file.type.split("/")[0] !== "image") {
          this.$createToast({
            type: "txt",
            txt: "请选择正确的图片类型上传"
          }).show();
          return;
        }
        lrz(file)
          .then(results => {
            console.log("开始上传");
            let compressFile = results.file;
            this.updataFile({ file, compressFile });
          })
          .catch((err) => {
            this.updataFile({ file, file });
          })
      } else {
        this.$createToast({
          time: 1500,
          type: "txt",
          txt: "最多上传9张图片"
        }).show();
      }
    },
    //图片上传
    updataFile({ file, compressFile }) {
      const toast = this.$createToast({
        time: 0,
        txt: "请稍后..."
      });
      toast.show();
      cos.sliceUploadFile(
        {
          Bucket: "family-1257195390",
          Region: "ap-guangzhou",
          Key:
            this.fileNamePrefix +
            "-" +
            new Date().getTime() +
            "-" +
            Math.ceil(Math.random() * 100) +
            "." +
            file.type.split("/")[1],
          Body: compressFile
        },
        (err, data) => {
          if (err) {
            this.$createToast({
              type: "txt",
              txt: "上传失败！"
            }).show();
          } else {
            toast.hide();
            this.feedbackPics.push("https://" + data.Location);
          }
        }
      );
    },
  },
  created(){    
    this.chooseIcon = require("@/assets/notification/radio_ok.png");
    this.noChooseIcon = require("@/assets/icon/icon-list-unselect.png");
    this.plotList = [...this.mUserPlotList];
    if (this.plotList.length === 1) {
      if (this.plotList[0].domicile.length === 1) {
        this.plotInfo = this.plotList[0].domicile[0];
      }
    }
    cos = new COS({
      getAuthorization: (options, callback) => {
        this.$post("base", "/FamilyJava/client/coskey").then(
          ({ data, errorCode }) => {
            if (errorCode === 0) {
              let { expiredTime, sessionToken, tmpSecretId, tmpSecretKey } = data;
              callback({
                TmpSecretId: tmpSecretId,
                TmpSecretKey: tmpSecretKey,
                XCosSecurityToken: sessionToken,
                ExpiredTime: expiredTime
              });
            }
          }
        );
      }
    });
  }
}
</script>
<style lang="stylus" scoped>
.wrapper-white{
  background-color: #f5f5f5;
}
.box{
  width: 100%;
  margin-top: 3.2vw;
  background-color: #fff;
}
.src_css{
  width 84vw
  max-height 70vh
  overflow-y scroll  
  overflow-x hidden
}
.box_one_div{
  width 84vw;
  height 13.6vw;  
}
.tyle_status{
  margin-right 5.33vw;
}
.tyle_status img{
    width 5.6vw
    height 5.6vw
    margin-right 2.67vw
}
.tyle_status span{
  color #666;
  font-size 4.27vw
}
.text_css{
  width 75.73vw;
  height 39.20vw;
  padding 2.67vw 4vw 4vw 4.27vw;
  background-color #f5f5f5
  border-radius 1.6vw
  font-size 3.73vw
  line-height 4.27vw
  margin-top 1.33vw
  border 0
  resize:none
  outline 0;
  color: #666666;
}
textarea::-webkit-input-placeholder {
   color: #ccc;
   font-size 3.73vw
   line-height 4.27vw
}
.but_css_box{
    width 84vw
    height 5.6vw
    margin 3.47vw 0 4.27vw 0
}
.but_css_box .address_css{
  font-size 4.27vw
  color #38f
  text-decoration:underline;
  width 60vw
  line-height: 5.6vw;
}
.but_css_box .address_css img{
  width: 2.67vw
  height: 3.2vw
  margin-right: 1vw
}
.but_css_box .img_css{
  font-size 4.27vw
  color #38f
  text-decoration:underline;
  position:relative;
  width 20vw
  text-align right 
}
.img_click_input{
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
  right 0
  outline: none;
  opacity: 0;
  z-index: 10;
}
.imgList_box{
  width 84vw;
}
.imgList_box ul{
  width 100%
  margin 0
  padding 0
}
.imgList_box ul li{
  width 18.93vw
  height 18.93vw
  border-radius 1.33vw
  background-color #edeef0
  float left
  margin-right 2vw
  margin-bottom 2vw  
  position relative
}
.img_box_div_css{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #eee;
  box-sizing: border-box;
}
.imgList_box ul li .img_css_list{
  max-width: 100%;
  max-height: 100%;
}
.box_span{
  position absolute
  right -1vw;
  top -1vw;
  display block
  width 5vw
  height 5vw  
}
.box_span img{
  width 5vw
  height 5vw  
}
.jia_hao_css{
  width 12.62vw
  height 12.62vw
  margin 3.155vw
}
.but_box_css{
  background-color #fff
}
</style>