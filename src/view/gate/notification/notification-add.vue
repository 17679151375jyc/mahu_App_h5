<template>
  <div class="wrapper" style="background-color: #F4F4F4">
    <return-head title="发布消息"></return-head>
 
    <cube-scroll class="scroll-list-wrap">
      <div style="background-color: #fff;padding-bottom: 3.47vw;">
        <div>
          <div class="base-horizontal-layout-space-between-item-center title_top">
            <div @click="plotClick" class="base-horizontal-layout-end-item-center huodong">
              <div class="plot_css">{{ formTitle.noticeTitle }}</div>
              <img :src="require('@/assets/notification/icon_bottom.png')" />
            </div>
            <div class="plotName_css">
              <div class="plot_css">{{ formTitle.addressName }}</div>
            </div>
          </div>
        </div>
        
        <div class="div_p">
          <textarea
            class="div_p_divP"
            v-model="formTitle.noticeContent"
            placeholder="请简要描述您提交的内容，我们将尽快跟进处理。（请控制在600字以内）"
            ref="textRef"
          ></textarea>
        </div>
        <div class="div_Img">
          <div class="box_div_css" v-for="(item, index) in filePath" :key="index">
            <div class="div_click" @click="delImg(index)">
              <img :src="require('@/assets/notification/cha.png')" class="img_css"/>
            </div>
            <div class="img_one_css" @click.stop="bigImg(index)">
              <img  class="img_css_1" :src="item" />
            </div>
          </div>
            <!-- <div v-for="(item, index) in filePath" :key="index" class="box_div_css">
              <span @click="delImg(index)">X</span>
              <div @click="bigImg(index)">
                <img  style='z-index: 1000' :src="item" />
              </div>
 
            </div> -->
        </div>
        <div class="botttom_but">
          <div class="but_one">
            <input
              style="left:0;top:0;bottom:0;outline: none;opacity: 0;"
              type="file"
              @change="fileChange($event)"
              accept="image/*"
            />
            <img :src="require('@/assets/notification/icon_updata.png')" />
            插入图片&nbsp;
            <span>{{ filePath.length }}</span>
            <span>/9</span>
          </div>
          <div class="but_two" @click="subit">提交</div>
        </div>
      </div>
    </cube-scroll>
  </div>
</template>
<script>
import returnHead from "_c/head/return-head";
import { quillEditor } from "vue-quill-editor";
import utils from "_libs/utils";
import COS from "cos-js-sdk-v5";
import lrz from 'lrz';
var cos;
export default {
  name: "notification-add",
  components: { returnHead },
  data() {
    return {
      butShow: true,
      filePath: [],
      classList: [], //通知分类
      formTitle: {
        addressName: null,
        plotId: null, //小区ID
        noticeTypeId: null, //通知类型
        noticeTitle: null, //通知标题
        noticeContent: null, //通知内容
        pictureLink: null //图片列表
      }
    };
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
  computed: {
  },
  methods: {
    //查看图片
    bigImg(val){
      this.$createImagePreview({
        imgs: this.filePath,
        initialIndex: val
      }).show()
    },
    //删除
    delImg(val) {
      this.filePath.splice(val, 1);
    },
    //提交
    subit() {
      if(this.butShow){
        this.butShow = false
        this.formTitle.pictureLink = null;
        let text = this.filePath.join(",");
        this.formTitle.pictureLink = text;
        if (this.formTitle.noticeContent) {
          setTimeout(() => {
            this.butShow = true
          }, 2000);
          this.$post(
            "base",
            "/FamilyJava/server/community/notice/post",
            this.formTitle
          ).then(res => {
            const toast = this.$createToast({
              type: "txt",
              txt: "发布成功"
            });
            toast.show();
            this.$router.goBack(-1);
            this.$emit("Refresh");
          });
          setTimeout(()=>{            
            this.butShow = true
          }, 2000)
        } else {
          this.$createToast({
            type: "txt",
            txt: "请输入消息内容"
          }).show();
          self.isSummit = true;
        }
      }else{
        this.$createToast({
          type: 'warn',
          txt: "请勿重复点击"
        }).show();
      }
    },
    // 通知类型下拉框
    plotClick() {
      if (!this.mutiPicker) {
        this.mutiPicker = this.$createPicker({
          title: "通知类型",
          data: [this.classList],
          onSelect: this.plotConfirm
        });
      }
      this.mutiPicker.show();
    },
    plotConfirm(selectedVal, selectedIndex, selectedText) {
      this.formTitle.noticeTitle = selectedText[0];
      this.formTitle.noticeTypeId = this.classList[selectedIndex].noticeTypeId;
    },
    //获取小区
    getPlotName() {
      let self = this;
      self.$post("base", "/FamilyJava/client/getPlotServer").then(res => {
        console.log(res);
        this.formTitle.addressName = res.data.propertyPlotName;
        this.formTitle.plotId = res.data.propertyPlotRelation;
        this.getClassification(res.data.propertyPlotRelation);
      });
    },
    getClassification(val) {
      this.$post("base", "/FamilyJava/server/community/notice/types", {
        plotId: val
      }).then(res => {
        this.formTitle.noticeTitle = res.data.list[0].typeName;
        this.formTitle.noticeTypeId = res.data.list[0].typeId;
        let list = res.data.list;
        for (let i = 0; i < list.length; i++) {
          this.classList.push({
            text: list[i].typeName,
            value: i + 1,
            noticeTypeId: list[i].typeId
          });
        }
      });
    },
    //图片上传
    updataFile({file, compressFile}){
      const toast = this.$createToast({
        time: 0,
        txt: '请稍后...'
      });
      toast.show();
      cos.sliceUploadFile({
        Bucket: "family-1257195390",
        Region: "ap-guangzhou",
        Key: this.fileNamePrefix + "-" + new Date().getTime() + "-" + Math.ceil(Math.random() * 100) +
                "." + file.type.split("/")[1],
          Body: compressFile
        },(err, data) => {
          if (err) {
            this.$createToast({
              type: "txt",
              txt: "上传失败！"
            }).show();
        }else{
          console.log("上传完成", err, data);
          toast.hide()
          this.filePath.push("https://" + data.Location);
        }
      });
    },
    //图片压缩
    fileChange(e) {
      if (this.filePath.length < 9) {
        let file = e.target.files[0];        
        if (file.type.split("/")[0] !== "image") {
          this.$createToast({
            type: "txt",
            txt: "请选择正确的图片类型上传"
          }).show();
          return;
        }
        lrz(file).then(results=>{
          console.log("开始上传");
          let compressFile = results.file
          this.updataFile({file, compressFile})
        }).catch( (err)=> {
          this.updataFile({file, file})
        })            
      } else {
        this.$createToast({
          time: 1500,
          type: "txt",
          txt: "最多上传9张图片"
        }).show();
      }
    }
  },
  mounted() {
    this.getPlotName();
    cos = new COS({
      getAuthorization: (options, callback) => {
        this.$post("base", "/FamilyJava/client/coskey").then(
          ({ data, errorCode }) => {
            if (errorCode === 0) {
              let {
                expiredTime,
                sessionToken,
                tmpSecretId,
                tmpSecretKey
              } = data;
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
};
</script>
<style scoped>
.title_top {
  height: 13.07vw;
  line-height: 13.07vw;
  width: 89.37vw;
  background-color: #fff;
  padding: 0 5.33vw;
}
.huodong{
  height: 7.47vw;
  background-color: #f5f5f5;
  border-radius: 1.07vw;
  padding: 0 1.07vw
}
.plotName_css{
  height: 7.47vw;
  border-radius: 1.07vw;
  padding: 0 1.07vw;
}
.plot_css{
  height: 5.33vw;
  line-height: 5.33vw;
  margin-top: 1.07vw;
  color: #666;
  font-weight: bold;
  font-size: 3.73vw ;
}
.title_top div img {
  width: 1.6vw;
  height: 1.07vw;
  margin-left: 2.67vw
}
.div_p {
  width: 95%;
  padding: 2.67vw 0;
  background-color: #f4f4f4;
  margin: 0 auto;
  border-radius: 1.6vw;
  margin-top: 2.67vw;
}
.div_p .div_p_divP {
  display: block;
  height: 45.87vw;
  line-height: 5.33vw;
  width: 90%;
  margin: 0 auto;
  outline: none;
  resize: none;
  text-align: left;
  font-size: 3.73vw;
  color: #000;
  border: 0;
  background-color: transparent;
}
textarea::-webkit-input-placeholder {
   color: #ccc;
   font-size: 3.73vw;
  line-height: 5.33vw;
}
.div_Img {
  width: 95%;
  margin: 0 auto;
  overflow: hidden;
  margin-top: 2.5vw;
}
.img_one_css{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #eee;
  box-sizing: border-box;
}
.img_css_1{
  max-width: 100%;
  max-height: 100%;
}
.box_div_css{
  width: 30vw;
  height: 30vw;
  position: relative;
  float: left;
  margin-right: 1.5vw;
  position: relative;
  margin-top: 1vw;
}
.box_div_css .div_click{
  position: absolute;
  width: 5vw;
  height: 5vw;
  top: -1vw;
  right: -1vw;
  border-radius: 50%;
  background-color: #ccc;
}
.img_css{
  width: 100%;
  height: 100%;
}
.box_div_css:last-child{
  margin-right: 0;
}
.botttom_but {
  height: 12.8vw;
  margin: 0 5.53vw;
  width: calc(100% - 11.06vw);
  margin-top: 6.67vw;
  margin-bottom: 15vw;
}
.but_one {
  width: 50vw;
  float: left;
  height: 12.8vw;
  line-height: 12.8vw;
  color: #38f;
  font-size: 3.2vw;
  position: relative;
}
.but_one input {
  position: absolute;
  width: 30vw;
}
.but_one img {
  margin-top: 4.27vw;
  float: left;
  margin-right: 1.6vw;
}
.but_two {
  width: 36.53vw;
  float: right;
  height: 12.8vw;
  line-height: 12.8vw;
  background: url("~@/assets/notification/backg_color.png");
  background-size: cover;
  color: #fff;
  font-size: 3.73vw;
  text-align: center;
}
.scroll-list-wrap {
  max-height: 92%;
}
.editor {
  max-height: 100vw;
  overflow-y: auto;
  /* background-color: red; */
  /* width: 100%; */
}
</style>