<template>
  <div class="property-wraper">
    <header>
      <div class="header" style="padding: 0 5.3333vw">
        <div class="base-horizontal-layout-center-item-center" style="padding: 3.56666vw 0 5.3333vw 0">
          <span class="property" style="font-size: 5.33vw">物业通知</span>
        </div>
        <div v-if="plotOptions.length>0" style="padding: 3.56666vw 0 5.3333vw 5.3333vw">
          <!--class="base_text_details_normal_line-clamp-1"-->
          <p v-if="plotOptions.length===1"
             style="font-size: 3.6vw;text-align: end;
                    width: 49.3333vw;height:6.9333vw;box-sizing: border-box;
                    color: #898989;padding: 1.67vw 0 1.07vw 1vw"
             >{{plotOptions[0].text}}</p>
          <cube-select v-else
                       class="base_text_details_normal_line-clamp-1"
                       style="font-size: 3.6vw; width: 49.3333vw;height:6.9333vw;background-color: #EDEEF0;
                         color: #898989;padding: 1.07vw 4vw 1.07vw 1vw;margin-left: 1vw"
                       title="请选择社区"
                       v-model="plotValue"
                       :options="plotOptions"
                       @change="plotChange"
                       @picker-show="plotChangeShow"
                       @picker-hide="plotChangeHide">
          </cube-select>
        </div>
        <!--<div v-if="notice.length!==0" class="base-horizontal-layout-center-item-center">-->
          <!--<p v-if="!expand">-->
            <!--<span @click="checkAll" style="margin-right: 4.27vw">全部已读</span>-->
            <!--<span @click="seletDelect">批量删除</span>-->
          <!--</p>-->
          <!--<p v-else>-->
            <!--<span @click="seletDelect('cancel')" style="margin-right: 4.27vw">取消</span>-->
            <!--<span @click="selectAll(n+=1)" style="margin-right: 4.27vw">全选</span>-->
            <!--<span @click="bothSelect">删除</span>-->
          <!--</p>-->
        <!--</div>-->
      </div>
      <!--<div class="header" style="padding: 3vw 5.3333vw 5.3333vw 5.3333vw">-->
        <!--<cube-select class="base_text_details_normal_line-clamp-1"-->
                     <!--style="font-size: 3.6vw; width: 49.3333vw;height:6.9333vw;background-color: #EDEEF0;-->
                         <!--color: #898989;padding: 1.07vw 4vw 1.07vw 1vw;margin-left: 1vw"-->
                     <!--title="请选择社区"-->
                     <!--v-model="plotValue"-->
                     <!--:options="plotOptions"-->
                     <!--@change="plotChange"-->
                     <!--@picker-show="plotChangeShow"-->
                     <!--@picker-hide="plotChangeHide">-->
        <!--</cube-select>-->
      <!--</div>-->

    </header>
    <article style="padding-bottom: 3.2vw">
      <!--这个是可以滑动的-->
      <!--<cube-swipe v-if="rebuildSwipe && !expand">-->
        <!--<li :class="[swipeList]" v-for="(item,index) in notice" :key="index">-->
          <!--<cube-swipe-item-->
            <!--ref="swipeItem"-->
            <!--:btns="item.showRedDot ? swipeBtn : swipeBtn2"-->
            <!--:index="index"-->
            <!--@active="shrinkEnable"-->
            <!--:autoShrink="true"-->
            <!--@btn-click="onBtnClick">-->
            <!--<div class="message" @click="toPropertyDetails(item.typeId)">-->
              <!--<div class="left-side">-->
                <!--<img :src="item.iconUrl" alt="图片">-->
              <!--</div>-->
              <!--<div class="right-side">-->
                <!--<p class="desc">-->
                  <!--<span class="base-horizontal-layout-center-item-center">-->
                    <!--<span class="title">{{item.typeName}}</span>-->
                    <!--<span v-show="item.showRedDot"-->
                          <!--style="width: 1.87vw;height: 1.87vw;background-color: #F94949;border-radius: 50%;margin-left: 1.6vw"></span>-->
                  <!--</span>-->
                  <!--<span class="time">{{item.lastUpdateDate}}</span>-->
                <!--</p>-->
                <!--<div class="content">{{item.synopsis}}</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</cube-swipe-item>-->
        <!--</li>-->
      <!--</cube-swipe>-->

      <div v-if="rebuildSwipe && !expand">
        <li :class="[swipeList]" v-for="(item,index) in notice" :key="index">
          <div
            ref="swipeItem"
            :btns="item.showRedDot ? swipeBtn : swipeBtn2"
            :index="index"
            @active="shrinkEnable"
            :autoShrink="true"
            @btn-click="onBtnClick">
            <div class="message" @click="toPropertyDetails(item.noticeId)">
              <div class="left-side">
                <!--<img :src="item.typeName==='社区活动'?require('./property1.png'):item.typeName==='缴费通知'?require('./property2.png'):-->
                <!--item.typeName==='社区新闻'?require('./property3.png'):item.typeName==='物管通知'?require('./property4.png'):-->
                <!--item.typeName==='节日祝贺'?require('./property5.png'):''" alt="图片">-->
                <img :src="item.iconUrl" alt="图片">
              </div>
              <div class="right-side">
                <p class="desc">
                  <span class="base-horizontal-layout-general-item-center" style="width: 46vw">
                    <span class="title" style="width: 44vw">{{item.titleUtf32}}</span>
                    <span v-show="item.showRedDot"
                          style="width: 1.87vw;height: 1.87vw;background-color: #F94949;border-radius: 50%;margin-left: 1.6vw"></span>
                  </span>
                  <span class="time">{{item.postDate}}</span>
                </p>
                <div class="content">{{item.contentUtf32}}</div>
              </div>
            </div>
          </div>
        </li>
      </div>
      <!--这个是展开后没有滑动但是有label的-->
      <!--<div v-else-if="expand"-->
           <!--:class="['message',swipeList]"-->
           <!--v-for="(item,index) in notice"-->
           <!--:key="index">-->
        <!--<div class="left-side">-->
          <!--<p class="popup" @click="checkBoxClick(index)" v-if="expand"></p>-->
          <!--<span-->
            <!--class="check-box"-->
            <!--name="leftSide"-->
            <!--@click="checkBoxClick(index,$event)"-->
            <!--ref="checkBox"-->
          <!--&gt;</span>-->
          <!--<img :src="item.iconUrl" alt="图片">-->
        <!--</div>-->
        <!--<div class="right-side">-->
          <!--<p class="desc">-->
                  <!--<span class="base-horizontal-layout-center-item-center">-->
                    <!--<span class="title">{{item.typeName}}</span>-->
                    <!--<span v-show="item.showRedDot"-->
                          <!--style="width: 1.87vw;height: 1.87vw;background-color: #F94949;border-radius: 50%;margin-left: 1.6vw"></span>-->
                  <!--</span>-->
            <!--<span class="time">{{item.lastUpdateDate}}</span>-->
          <!--</p>-->
          <!--<div class="content">{{item.synopsis}}</div>-->
        <!--</div>-->
      <!--</div>-->
      <div v-else-if="expand"
           :class="['message',swipeList]"
           v-for="(item,index) in notice"
           :key="index">
        <div class="left-side">
          <p class="popup" @click="checkBoxClick(index)" v-if="expand"></p>
          <!--<span-->
            <!--class="check-box"-->
            <!--name="leftSide"-->
            <!--@click="checkBoxClick(index,$event)"-->
            <!--ref="checkBox"-->
          <!--&gt;</span>-->
          <!--<img :src="item.typeName==='社区活动'?require('./property1.png'):item.typeName==='缴费通知'?require('./property2.png'):-->
                <!--item.typeName==='社区新闻'?require('./property3.png'):item.typeName==='物管通知'?require('./property4.png'):-->
                <!--item.typeName==='节日祝贺'?require('./property5.png'):''" alt="图片">-->
          <img :src="item.iconUrl" alt="图片">
        </div>
        <div class="right-side">
          <p class="desc">
                  <span class="base-horizontal-layout-general-item-center" style="width: 46vw">
                    <span class="title" style="width: 44vw">{{item.titleUtf32}}</span>
                    <span v-show="item.showRedDot"
                          style="width: 1.87vw;height: 1.87vw;background-color: #F94949;border-radius: 50%;margin-left: 1.6vw"></span>
                  </span>
            <span class="time">{{item.postDate}}</span>
          </p>
          <div class="content">{{item.contentUtf32}}</div>
        </div>
      </div>
      <!--这个是空白的-->
      <div v-if="notice.length===0" class="base-vertical-layout-center-item-center" style="margin: 3.2vw 0">
        <img :src="require('./blank.png')" style="width: 43.2vw;height: 43.47vw">
        <p class="base-text-title-normal-gray">暂无物管消息</p>
      </div>
    </article>
    <p v-if="isNotLoading" class="base-text-title-normal-gray"
       style="padding-top: 4vw;text-align: center;background: #F5F5F5">—————我是有底线的—————</p>

    <base-popup v-if="isPopShow"
                :refId="refId"
                :popTitle="popTitle"
                @leftBtnPoppup="leftBtnPoppup"
                @rightBtnPoppup="rightBtnPoppup">
      <!--没有回车的纯文字-->
      <div class="base-vertical-layout-center-item-center">
        <p class="popup-text" style="width: 53.33vw" v-html="popPlainText"></p>
      </div>
    </base-popup>
  </div>
</template>

<script>
  import utils from '_libs/utils';
  import basePopup from '_c/popup/base-popup';
  import { mapState } from 'vuex';

  export default {
    name: "property",
    components: {
      basePopup
    },
    props:
      {
        isPropertyRefresh: {
          type: Boolean,
          default: false
        },
        isPropertyLoading: {
          type: Boolean,
          default: false
        },
      },
    data() {
      return {
        userInfo: {},
        plotId: '',

        pageSize: 20,
        lastID: '0',

        rebuildSwipe: true,
        swipeList: ["swipe-wraper"],
        expand: false,//是否多选模式
        isSeleted: [],
        n: 0,
        swipeItemIndex: 0,

        plotOptions: [],
        plotValue: '',
        notice: [],
        typeId: '',

        isSelectAll: false,
        isNotLoading: false,

        swipeBtn: [
          {
            action: "clear",
            text: "标记已读",
            color: "#c8c7cd"
          },
          {
            action: "delete",
            text: "删除",
            color: "#ff3a32"
          }
        ],
        swipeBtn2: [
          {
            action: "delete",
            text: "删除",
            color: "#ff3a32"
          }
        ],

        // swipeData: [
        //   {
        //     item: {
        //       title: "物管缴费通知",
        //       desc: "来来来，喝完一杯还有一杯;再喝完这杯还有三杯--两个二百五",
        //       imgurl: require("./mail.png"),
        //       time: "2019-03-08 12:00",
        //       hasRead: false
        //     },
        //     btns: [
        //       {
        //         action: "clear",
        //         text: "标记已读",
        //         color: "#c8c7cd"
        //       },
        //       {
        //         action: "delete",
        //         text: "删除",
        //         color: "#ff3a32"
        //       }
        //     ]
        //   },
        //   {
        //     item: {
        //       title: "物管缴费通知",
        //       desc: "来来来，喝完一杯还有一杯;再喝完这杯还有三杯--两个二百五",
        //       imgurl: require("./gou.png"),
        //       time: "2019-03-08 12:00",
        //       hasRead: true
        //     },
        //     btns: [
        //       {
        //         action: "clear",
        //         text: "标记已读",
        //         color: "#c8c7cd"
        //       },
        //       {
        //         action: "delete",
        //         text: "删除",
        //         color: "#ff3a32"
        //       }
        //     ]
        //   },
        //   {
        //     item: {
        //       title: "物管缴费通知",
        //       desc: "来来来，喝完一杯还有一杯;再喝完这杯还有三杯--两个二百五",
        //       imgurl: require("./card.png"),
        //       time: "2019-03-08 12:00",
        //       hasRead: true
        //     },
        //     btns: [
        //       {
        //         action: "clear",
        //         text: "标记已读",
        //         color: "#c8c7cd"
        //       },
        //       {
        //         action: "delete",
        //         text: "删除",
        //         color: "#ff3a32"
        //       }
        //     ]
        //   }
        // ],

        isPopShow: false,
        refId: 'propertyPopup',
        popTitle: '',
        popPlainText: '',
        propertyIndex: 0,
      };
    },
    computed: {
      ...mapState({
        'mUserPlotList': state => state.user.userPlotList
      })
    },
    watch: {
      isPropertyRefresh() {
        if(this.isPropertyRefresh) {
          // this.$refs.swipeItem[this.swipeItemIndex].shrink();
          this.toRebuild();
          this.plotId = localStorage.getItem("plotId");
          this.lastID = '0';
          this.init();
          this.isPropertyRefresh = false;
          this.$emit("isPropertyRefresh", {isPropertyRefresh: this.isPropertyRefresh});
        }
      },
      isPropertyLoading() {
        if(this.isPropertyLoading) {
          // this.$refs.swipeItem[this.swipeItemIndex].shrink();
          this.toRebuild();
          this.plotId = localStorage.getItem("plotId");
          this.initLoading();
          this.isPropertyLoading = false;
          this.$emit("isPropertyLoading", {isPropertyLoading: this.isPropertyLoading});
        }
      },
      isNotLoading() {
        this.$emit("isNotLoading", {isNotLoading: this.isNotLoading});
      }
    },
    created() {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    },
    mounted() {
      let self = this;
      this.isPropertyRefresh = false;
      //获取社区选择数组
      for (let count = 0; count < self.mUserPlotList.length; count++) {
        self.plotOptions.push({
            value: self.mUserPlotList[count].plotID,text: self.mUserPlotList[count].plotName,plotId: self.mUserPlotList[count].plotID
          })
      }

      self.plotValue = self.plotOptions[0].value;
      self.plotId = self.plotOptions[0].plotId;
      self.$emit("plotIdChange", {plotId: self.plotId});

      self.init();
    },
    methods: {
      init() {
        let self = this;
        self.isNotLoading = false;
        // self.$post("community","/notice/types",{plotId: this.plotId}).then((res)=>{
        //   self.notice = [...res.data.list];
        // });

        // self.$post("community","/notice/all",{
        //   plotId: self.plotId,
        //   pageSize: self.pageSize,
        //   lastNoticeId: self.lastID,
        // }).then((res)=>{
        //   self.notice = [...res.data.list];
        //   self.lastID = res.data.list[res.data.list.length-1].noticeId;
        //   self.notice.forEach((item) => {
        //     item.titleUtf32 = unescape(item.title.replace(/\\u/g,"%u"));//todo 暂时这样直接转成utf32 之后要做子组件
        //     item.contentUtf32 = unescape(item.content.replace(/\\u/g,"%u"));
        //   })
        // });

        self.$post("community","/notice/getNotice",{
          plotId: self.plotId,
          nowTime: 0
        }).then((res)=>{
          self.notice = [...res.data.list];
          self.lastID = res.data.list[res.data.list.length-1].noticeId;
          self.notice.forEach((item) => {
            item.titleUtf32 = unescape(item.title.replace(/\\u/g,"%u"));//todo 暂时这样直接转成utf32 之后要做子组件
            item.contentUtf32 = unescape(item.content.replace(/\\u/g,"%u"));
          })
        });
      },
      initLoading() {
        let self = this;
        // self.$post("community","/notice/types",{plotId: this.plotId}).then((res)=>{
        //   self.notice = [...res.data.list];
        // });

        // self.$post("community","/notice/all",{
        //   plotId: self.plotId,
        //   pageSize: self.pageSize,
        //   lastNoticeId: self.lastID,
        // }).then((res)=>{
        //   if (res.data.list.length===0) {
        //     self.isNotLoading = true;
        //   } else {
        //     res.data.list.forEach((item) => {
        //       self.notice.push(item);
        //     });
        //     self.lastID = res.data.list[res.data.list.length-1].noticeId;
        //   }
        // });

        self.$post("community","/notice/getNotice",{
          plotId: self.plotId,
          nowTime: 0 //todo 这个要改成最新一条时间戳
        }).then((res)=>{
          self.notice = [...res.data.list];
          self.lastID = res.data.list[res.data.list.length-1].noticeId;
          self.notice.forEach((item) => {
            item.titleUtf32 = unescape(item.title.replace(/\\u/g,"%u"));//todo 暂时这样直接转成utf32 之后要做子组件
            item.contentUtf32 = unescape(item.content.replace(/\\u/g,"%u"));
          })
        });
      },

      toRebuild() {//重新加载swipe
        this.rebuildSwipe = false;
        this.$nextTick(() => {
          this.rebuildSwipe = true;
        });
      },

      plotChange(value, index, text) {//选择社区
        let self =this;
        self.plotId = value;
        self.lastID = "0";
        self.$emit("plotIdChange", {plotId: this.plotId});
        self.init();
      },
      plotChangeShow() {//显示选择社区弹窗
        utils.hideTab().then((e)=>{
        });
      },
      plotChangeHide() {//隐藏选择社区弹窗
        // utils.showTab().then((e)=>{
        // });
      },

      swipe(e) {
        console.log(e);
      },
      onItemClick(item) {
        console.log("click item:", item);
      },
      //滑动方法
      shrinkEnable(index) {
        this.swipeItemIndex = index;
        if (this.expand) {
          this.$refs.swipeItem.forEach((item, index) => {
            item.shrink();
          });
        }
      },
      //滑动点击方法
      onBtnClick(btn, index) {
        if (btn.action === "delete") {
          this.$refs.swipeItem[index].shrink();
          this.isPopShow = true;
          this.popTitle = "删除消息";
          this.popPlainText = "您确定要批量删除该类消息吗？";
          this.propertyIndex = index;
        } else if (btn.action === "clear") {
          this.$refs.swipeItem[index].shrink();
          this.toRebuild();
          setTimeout(() => {
            let self = this;
            self.$post("community","/mark/read",{plotId: self.plotId, noticeTypeId: self.notice[index].typeId}).then((res)=>{
              self.notice[index].showRedDot = false;
            });
          }, 300);
        }
      },
      leftBtnPoppup() {
        this.isPopShow = false;
      },
      rightBtnPoppup() {
        let self = this;
        self.$post("community","/mark/delete",{plotId: self.plotId, noticeTypeId: self.notice[this.swipeItemIndex].typeId}).then((res)=>{
          self.notice.splice(self.propertyIndex,1);
          self.isPopShow = false;
        });
      },
      //点击批量删除之后展开选项卡，点击取消
      seletDelect(arg) {
        if (arg === "cancel") {
          this.expand = false;
          this.swipeList.pop();
        } else {
          this.expand = true;
          this.swipeList.push("animate");
          this.notice.map((item, index) => {
            this.$refs.swipeItem[index].shrink();
          });
        }
      },
      //点击选项框的时候
      checkBoxClick(n, e) {
        let domClass = this.$refs.checkBox[n].classList;
        //  domClass.length>1? domClass.remove('is-select'):domClass.add('is-select');
        if (domClass.length > 1) {
          domClass.remove("is-select");
          this.isSeleted.map((item, index, arr) => {
            arr.splice(index, 1);
          });
        } else {
          this.isSeleted.push(n);
          domClass.add("is-select");
        }
      },
      //全选
      selectAll(e) {
        let domList = this.$refs.checkBox;
        domList.map((item, index) => {
          if (item.classList.length < 2) {
            item.classList.add("is-select");
          }
        });

        // if (e % 2 != 0) {
        //   domList.map((item, index) => {
        //     if (item.classList.length < 2) {
        //       item.classList.add("is-select");
        //     }
        //   });
        // } else {
        //   domList.map((item, index) => {
        //     if (item.classList.length > 1) {
        //       item.classList.remove("is-select");
        //     }
        //   });
        // }
        // if (e > 99) {
        //   this.n = 0;
        // }
      },
      //多选删除
      bothSelect(...arg) {
        // this.isSeleted.forEach((item,index,arr)=>{
        //      if(item != null){
        //         this.notice.splice(item,1);
        //         this.isSeleted[index] = null;
        //         this.$refs.checkBox[item].classList.remove('is-select');

        //      }
        // })
        // console.log(this.isSeleted)
        // if(this.notice.length<2 && this.isSeleted[this.isSeleted.length-1]== null){
        //     this.notice.splice(0,1);
        // }
        this.expand = false;
        this.swipeList.pop();

        let self = this;
        let classList = this.$refs.checkBox;
        let n = classList.length;
        classList.map((item, index) => {
          if (item.classList.length > 1) {
            item.classList.remove("is-select");
            // delete this.notice[index];
            self.$post("community","/mark/delete",{plotId: self.plotId, noticeTypeId: self.notice[index].typeId}).then((res)=>{
              // self.notice.splice(index, 1);
              self.init();//todo 还未做完
            });
          }
        });

        // let len = this.notice.length;
        // while (len--) {
        //   if (this.notice[len] !== undefined) {
        //     let self = this;
        //     self.$post("community","/mark/delete",{plotId: self.plotId, noticeTypeId: self.notice[len].typeId}).then((res)=>{
        //       self.notice.splice(len, 1);
        //     });
        //   }
        // }
      },
      //全部已读
      checkAll() {
        this.notice.map((item, index) => {
          let self = this;
          self.$post("community","/mark/read",{plotId: self.plotId, noticeTypeId: self.notice[index].typeId}).then((res)=>{
            item.showRedDot = false;
            // console.log(this.notice);
          });
        });
      },

      //跳转通知详情
      // toPropertyDetails(noticeTypeId) {
      //   let self = this;
      //   utils.localStorage('property',{plotId: this.plotId,noticeTypeId: noticeTypeId});
      //   self.$router.push({ path: "/service/propertyDetails", query: {}});
      // }
      toPropertyDetails(noticeId) {
        let self = this;
        utils.localStorage('property',{plotId: this.plotId,noticeId: noticeId});
        self.$router.push({ path: "/service/propertyDetails", query: {}});
      }
    }
  };
</script>

<style lang="stylus" scoped>
  .property-wraper {
    .header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      /*padding: 5.3333vw;*/
      align-items: center;

      .property {
        font-size: 4.8vw;
        color: rgba(51, 51, 51, 1);
        font-weight: bold;
      }

      /**p {
        font-size: 4vw;
        line-height: 0.45rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        text-decoration: underline;
        color: rgba(51, 136, 255, 1);
      }**/
    }

    .message {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 3.2vw 0 0 5.33vw;

      .left-side {
        display: flex;
        flex-direction: row;
      }

      img {
        width: 7.4666vw;
        height: 7.4666vw;
        border-radius: 1.33vw;
        display: block;
      }

      .right-side {
        display: flex;
        flex-direction: column;
        flex: 1;
        width: 0;
        margin-left: 2.67vw;
        align-items: flex-start;
        padding: 0 5.33vw 3.2vw 0;
        border-bottom: 1px solid rgba(238, 238, 238, 1);

        .desc {
          /*font-size: 0.2rem;*/
          color: rgba(102, 102, 102, 1);
          font-weight: normal;
          display: flex;
          flex-direction: row;
          width: 100%;
          justify-content: space-between;
          align-items: center;

          &:first-child {
            /*font-size: 0.41rem;*/
            font-weight: 700;
            color: rgba(102, 102, 102, 1);
          }

          .title {
            overflow: hidden;
            white-space: nowrap;
            /* 当文本溢出包含元素时，以省略号表示超出的文本 */
            text-overflow: ellipsis;
            font-size: 4.2667vw;
            height: 5.6vw;
            line-height: 5.6vw;
            color: #666;
            font-weight: bold;
          }

          .time {
            font-size: 3.7333vw;
            color: #999;
          }

          i {
            color: red;
            font-size: 0.25rem;
            margin-left: -0.48rem;
            margin-top: -0.8vh;
          }
        }

        .content {
          width: 100%;
          color: #ccc;
          font-size: 3.2vw;
          margin: 1.6vw 0 0 0;
          height: 4.2667vw;
          line-height: 4.2667vw;
          overflow: hidden;
          /* 文本不会换行 */
          white-space: nowrap;
          /* 当文本溢出包含元素时，以省略号表示超出的文本 */
          text-overflow: ellipsis;
        }
      }
    }

    .swipe-wraper {
      position: relative;

      .check-box {
        position: absolute;
        left: -5.3333vw;
        width: 6.1333vw;
        height: 6.1333vw;
        border-radius: 50%;
        border: 1px solid #b3b3b3;
      }

      .is-select {
        background: url('./gou.png');
        background-size: 100%;
        background-repeat: no-reapeat;
        border: none;
      }

      .popup {
        height: 100%;
        left: 0;
        right: 0;
        // background: red;
        position: absolute;
        z-index: 1020;
      }
    }

    .animate {
      animation: moveRight 300ms ease-out 1 forwards;
    }

    .animate2 {
      animation: moveLeft 300ms ease-out 1 forwards;
    }
  }

  @keyframes moveRight {
    from {
      left: 0;
    }

    to {
      left: 10vw;
    }
  }

  @keyframes moveLeft {
    from {
      left: 10vw;
    }

    to {
      left: 0;
    }
  }
</style>
