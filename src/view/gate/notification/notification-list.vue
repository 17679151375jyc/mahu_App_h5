<!--@Time  : 2019/10/07 10:02-->
<!--@Author: michael huang-->
<!--@File  : notification-list.vue-->

<template>
  <div class="wrapper">
    <return-head title="通知管理" rightText="添加" @rightBtnOnClick="addNotification"></return-head>
    <transition name="slide-fade">
      <router-view :noticeNumber='noticeNumber' @Refresh='Refresh'></router-view>
    </transition>
    <div>
      <div class="title_top">
        <div>{{ formTitle.addressName }}</div>
        <div @click="plotClick">{{ formTitle.dtateTime }}
          <img :src="require('@/assets/notification/icon_bottom.png')">
        </div>
      </div>
    </div>
    <cube-scroll
      style="max-height: 88%;"
      ref="scroll"
      class='scroll-wrapper-text-style'
      :fade="true"
      :options="options"
      :scroll-events="['scroll']"
      :data='swipeData'
      @pulling-up='onPullingUp'
      @pulling-down="onPullingDown">
      <div v-if='!swipeData.length>0' style="width: 100%;height:20vw;line-height:20vw;text-align: center;font-size: 5vw;color: #ccc;">还没有任何通知哦</div>
    <div class="swipe-wrapper" style='margin-bottom: 5vw;'>
      <!-- <cube-scroll> -->
        <cube-swipe class="swipe">
          <transition-group name="swipe" tag="ul">
            <li class="swipe-item-wrapper" v-for="(data,index) in swipeDataList" :key="index">
              <cube-swipe-item
                  ref="swipeItem"
                  :index="index"
                  :btns="data.btns"
                  @btn-click="onBtnClick"
                  :autoShrink='true'
                  >
                <div @click="onItemClick(index)" class="item-inner">
                  <div class="div_img">
                    <img :src="data.item.iconUrl">
                  </div>
                  <div class="txtCon">
                    <h2>{{ data.item.titleUtf32 }}</h2>
                    <span class="p1">{{ data.item.postDate }}</span>
                    <span class="p2">{{ data.item.contentUtf32 | filterHTMLTag }}</span>
                  </div>
                </div>
              </cube-swipe-item>
            </li>
          </transition-group>
        </cube-swipe>

      <!-- </cube-scroll> -->
    </div>
    </cube-scroll>
  </div>
</template>

<script>
  import returnHead from '_c/head/return-head';
  export default {
    name: "notification-list",
    components: {returnHead},
    data() {
      return {
        noticeNumber: '',
        pageSize: 10,
        page: 1,
        // lastNoticeId: 0,
        swipeData: [],
        formTitle: {
          addressName: '',
          firstDate: 0,
          lastDate: 0,
          plotId: '',//小区ID
          noticeTypeId: '',//通知类型
          dtateTime: '选择时间',//时间
          noticeContent: '',//通知内容
          pictureLink: '',//图片列表
        },
         options: {
          observeDOM: false,
          click: true,
          probeType: 1,
          scrollbar: true,
          pullDownRefresh: {
            stopTime: 500,
            txt: '刷新成功',
          },
          pullUpLoad: true,
          // pullDownRefresh: false,
          // pullUpLoad: false,
        },
      }
    },
    watch: {},
    filters:{
      filterHTMLTag: (msg)=> {
        if(msg){
          var msg = msg.replace(/<img[^>]*>/gi, '[图片]');
          msg = msg.replace(/<\/?[^>]*>/g, ''); //去除HTML Tag
          msg = msg.replace(/[|]*\n/, '') //去除行尾空格
          msg = msg.replace(/&nbsp;/ig, ''); //去掉npsp
        }else{
          msg = '[图片]'
        }
        return msg;
      }
    },
    computed: {
      swipeDataList(){
        let dataList = [];
        for(let i=0; i<this.swipeData.length; i++){
          let {
            title,
            content,
            postDate,
            iconUrl,
            titleUtf32,
            contentUtf32
          } = this.swipeData[i]
          dataList.push({
            item: {
              title,
              content,
              postDate,
              iconUrl,
              titleUtf32,
              contentUtf32
            },
            btns: [
              {
                action: 'delete',
                text: '撤回'
              }
            ]
          })
        }
        return dataList
      }
    },
    mounted() {
      this.getPlot()
    },
    methods: {
      onPullingUp(){
        setTimeout(() => {
          this.page = this.page + 1;
          this.getList(this.page);
        }, 200);
      },
      onPullingDown() {
        setTimeout(() => {
          this.formTitle.dtateTime = '选择时间';
          this.swipeData = [];
          this.formTitle.firstDate = 0;
          this.formTitle.lastDate = 0,
          this.page = 1;
          this.getList(this.page);
        }, 200);
      },
      onItemClick(index) {
        this.noticeNumber = this.swipeData[index].noticeId
        console.log(this.noticeNumber);
        this.$router.push({ path: "/service-index/notification-list/notification-detail", query: {}});
      },
      Refresh() {
        this.getList(1)
      },
      // 获取小区
      getPlot() {
        let self = this;
        let date = new Date();
        self.$post('base',"/FamilyJava/client/getPlotServer").then((res)=>{
          this.formTitle.addressName = res.data.propertyPlotName;
          this.formTitle.plotId = res.data.propertyPlotRelation;
          this.getList(this.page);
        });
      },
      // 获取通知列表
      getList(val) {
        let self = this;
        this.$post('base',"/FamilyJava/server/community/notice/getNotice", {
          plotNumber: self.formTitle.plotId,
          pageSize: self.pageSize,
          page: val,
          firstDate: self.formTitle.firstDate,
          lastDate: self.formTitle.lastDate,
        }).then(({data, errorCode})=>{
          if(errorCode === 0) {
            if(data.list.length>0) {
              if(val === 1) {
                self.swipeData = [...data.list];
              }else {
                for(let i=0; i < data.list.length; i++){
                  self.swipeData.push(data.list[i])
                }
                self.$refs.scroll.forceUpdate(true);
              }
              console.log(data.list);
              self.swipeData.forEach((item)=>{
                if(item&&item.title){
                  item.titleUtf32 = unescape(item.title.replace(/\\u/g,"%u"));//todo 暂时这样直接转成utf32 之后要做子组件
                }
                if(item&&item.content){
                  item.contentUtf32 = unescape(item.content.replace(/\\u/g,"%u"));
                }
              });
            }else{
              if(this.page === 1){
                self.swipeData = []
              }else {
                self.$createToast({
                  type: 'txt',
                  txt: "这是最后一条啦"
                }).show();
                self.$refs.scroll.forceUpdate(true);
              }
            }
          }
        });
      },
      // 选择日期
      plotClick(){
          if (!this.datePicker) {
            this.datePicker = this.$createDatePicker({
              title: '日期',
              min: new Date(2019, 0),
              max: new Date(2030, 12),
              columnCount: 2,
              value: new Date(),
                onSelect: (selectedTime, selectedText, formatedTime) => {
                  this.swipeData = [];
                  this.formTitle.dtateTime = formatedTime[0] + '-' + (formatedTime[1] < 10 ? '0' + formatedTime[1] : formatedTime[1])
                  this.formTitle.firstDate = new Date(formatedTime[0],formatedTime[1]-1,1).getTime()/1000
                  this.formTitle.lastDate = new Date(formatedTime[0],formatedTime[1],1).getTime()/1000
                  this.page = 1;
                  this.getList(this.page)
                }
            })
          }
          this.datePicker.show()
      },
      addNotification() {
        this.$router.push({ path: "/service-index/notification-list/notification-add", query: {}});
      },
      // 撤回
      onBtnClick(btn, index) {
        this.page = 1;
        let self = this;
        if (btn.action === 'delete') {
          this.$createActionSheet({
            title: '确认要撤回吗',
            active: 0,
            data: [
              {content: '撤回'}
            ],
            onSelect: () => {
              let date = parseInt(new Date().getTime()/1000)
              self.$post('base', '/FamilyJava/server/community/notice/cancel', {
                plotId: this.formTitle.plotId,
                noticeId: this.swipeData[index].noticeId,
                nowTime: date,
              }).then(({data, errorCode})=>{
                if(errorCode === 0){
                  self.getList(this.page);
                  const toast = this.$createToast({
                    type: 'txt',
                    txt: "撤回成功"
                  });
                  toast.show();
                  self.getList(this.page)
                }
              })
            }
          }).show()
        } else {
          this.$refs.swipeItem[index].shrink()
        }
      }
    }
  }
</script>

<style scoped>
*{
  font-family: '微软';
}
.title_top{
    height: 13.07vw;
    width: 100%;
    background-color: #fff;
  }
  .title_top div{
    height: 7.47vw;
    line-height: 7.47vw;
    color: #666;
    font-size: 3.73vw;
    background-color: #F4F4F4;
    border-radius: 1.07vw;
    margin-top: 2.93vw;
    margin-bottom: 2.67vw;
    padding:0 2.13vw;
    overflow: hidden;
    /* 文本不会换行 */
    white-space: nowrap;
    /* 当文本溢出包含元素时，以省略号表示超出的文本 */
    text-overflow: ellipsis;
  }
  .title_top div img{
    float: right;
    width: 2vw;
    height: 1.2vw;
    margin: 3.2vw 0 3.2vw 1vw;
  }
  .title_top div:nth-child(1){
    float: left;
    width: 56.6vw;
    margin-left: 5.33vw;
    background-color: #fff;
    font-weight: bold;
    font-size: 4vw;
  }
  .title_top div:nth-child(2){
    float: right;
    width: 17.93vw;
    margin-right: 2.67vw;
  }
  .swipe{
    height: 100%;
    width: 100%;
    margin-top: 2.67vw;
  }
  .swipe-item-wrapper{
    width: 96vw;
    margin-left: 1.33vw;
    margin-right: 1.33vw;
  }
  .item-inner{
    background-color: #fff;
    /* border-radius: 1.07vw; */
    width: 97.33vw;
    height: 17.07vw;
    margin-bottom: 1.07vw;
    margin-top: 1.07vw;
  }
  .item-inner .div_img{
    width: 10.67vw;
    height: 10.67vw;
    float: left;
    margin-left: 4vw;
    margin-top: 3.2vw;
    margin-right: 2.13vw;
  }
  .item-inner .div_img img{
    width: 10.67vw;
    height: 10.67vw;
  }
  .item-inner .txtCon{
    background-color: #fff;
    height: 17.07vw;
    border-radius: 1.07vw;

  }
  .item-inner .txtCon h2{
    font-size: 3.74vw;
    font-weight: bold;
    width: 40vw;
    color: #666;
    float: left;
    height: 3.73vw;
    line-height: 3.73vw;
    padding-top: 0.5vw;
    margin-top: 3.5vw;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .item-inner .txtCon .p1{
    display: block;
    font-size: 3.2vw;
    color: #999;
    line-height: 3.73vw;
    margin-top: 3.5vw;
    float: right;
    margin-right: 2.67vw;
  }
  .item-inner .txtCon .p2{
    display: block;
    font-size: 3.2vw;
    height: 3.73vw;
    color: #999;
    line-height: 3.73vw;
    margin-top: 3vw;
    float: left;
    margin-left: 0vw;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 70vw;
  }
</style>