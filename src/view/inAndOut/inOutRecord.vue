<template>
  <div class="record-wrapper">
    <return-head id="topBar" title="出入记录">
      <div slot="menu"
           class="base-horizontal-layout-center-item-center"
           style="height: 100%;padding-right: 5.33vw"
           @click="showDrawer">
        <p style="font-size: 4.27vw;color: #3388ff;font-weight: bold">{{year}}</p>
        <img :src="require('../icon_filter.png')" style="margin-left:1.33vw;width: 3.17vw;height: 3.73vw">
      </div>
    </return-head>

    <cube-scroll
      ref="inAndOutRecordScroll"
      :style="defaultStyle"
      :options="options"
      :fade="true"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp">
      <div>
        <v-touch @swipeleft="showDrawer">
          <dayRecord :showTitle="false" :inDaysOf="inDaysOf" :showDate="true" :isNotLoading="isNotLoading" :lastID="lastID"/>
        </v-touch>
      </div>
    </cube-scroll>

    <recordPopup v-if="showPopup"
                 class="scroll-wrapper-addition-title"
                 style="z-index: 11"
                 :queryAbleRole="queryAbleRole"
                 :aPeopleCount="aPeopleCount"
                 :aMonthIndexIndex="aMonthIndexIndex"
                 @popupClose="popupClose"
                 @popupCloseIndex="popupCloseIndex">
    </recordPopup>
  </div>
</template>

<script>
  import utils from "_libs/utils";
  import returnHead from "_c/head/return-head"
  import dayRecord from "_c/inAndOut/dayRecord";
  import recordPopup from "_c/inOutRecord/recordPopup";
  import { mapState } from 'vuex';

  export default {
    name: "inAndOutRecord",
    components: { returnHead, dayRecord, recordPopup },
    props: {},
    data() {
      return {
        show: false,
        defaultStyle: {
          height: "calc(100vh - 11.7333vw)",
          fontSize: "4vw",
          color: "rgba(51, 136, 255, 1)"
        },
        options: {
          observeDOM: true,
          click: true,
          probeType: 1,
          scrollbar: false,
          pullDownRefresh: {
            stopTime: 500,
            txt: `刷新成功`
          },
          pullUpLoad: {
            stopTime: 500,
            txt: `加载成功`
          },
        },
        showPopup: false,

        year: '',
        inDaysOf: [],
        queryAbleRole: [],
        aPeopleCount: 0,
        aMonthIndexIndex: 0,

        pageSize: 20,
        lastID: '0',
        mMonth: '0',
        mPeopleType: '0',

        isFirst: true,
        isNotLoading: false
      };
    },
    beforeCreate() {},
    mPushInfo() {// 收到推送，刷新页面
      let self = this;
      self.getRecordData("0","0",0);
    },
    created() {
      let now = new Date();
      this.year = now.getFullYear();
    },
    computed: {
      ...mapState({
        'mPushInfo': state => state.user.pushInfo
      })
    },
    mounted() {
      let self = this;
      //console.log(document.getElementById('topBar').style)
      utils.hideTab();

      self.getRecordData("0","0",0);
    },
    methods: {
      swipeleft() {
        console.log(3333);
      },
      showDrawer() {
        this.showPopup = !this.showPopup;
      },

      onPullingDown() {
        setTimeout(() => {
          this.lastID = "0";
          this.isNotLoading = false;
          this.getRecordData(this.mMonth, this.mPeopleType,0);
          this.$refs.inAndOutRecordScroll.forceUpdate(true);
          // if (Math.random() > 0.5) {
          //   // 如果有新数据
          //   console.log(1);
          //   this.$refs.inAndOutRecordScroll.forceUpdate();
          // } else {
          //   // 如果没有新数据
          //   this.$refs.inAndOutRecordScroll.forceUpdate();
          // }
        }, 1000);
      },
      onPullingUp() {
        setTimeout(() => {
          this.getRecordData(this.mMonth, this.mPeopleType,1);
          this.$refs.inAndOutRecordScroll.forceUpdate(true);
          // if (Math.random() > 0.5) {
          //   // 如果有新数据
          //   console.log(2);
          //   this.$refs.inAndOutRecordScroll.forceUpdate();
          // } else {
          //   // 如果没有新数据
          //   this.$refs.inAndOutRecordScroll.forceUpdate();
          // }
        }, 1000);
      },

      popupClose(e) {
        this.isNotLoading = false;
        let self = this;
        if (e.event == "cancel") {
          self.showPopup = false;
        } else if (e.event == "ok") {
          self.mMonth = e.aMonth;
          self.mPeopleType = e.aPeopleType;
          self.lastID = "0";
          self.getRecordData(this.mMonth, this.mPeopleType, 0);
          let arr=e.aMonth.split("-");
          if (arr[0]==="0") {
            let now = new Date();
            self.year = now.getFullYear();
          } else {
            self.year = arr[0];
          }
          self.showPopup = false;
        } else {
          self.showPopup = false;
        }
        self.showPopup = false;
      },
      popupCloseIndex(e) {
        this.isNotLoading = false;
        let self = this;
        self.aMonthIndexIndex = e.aMonthIndex;
        self.aPeopleCount = e.aPeopleStyleCount;
      },

      getRecordData(aMonth,aPeopleType,arrAdd) {//arrAdd===0为刷新数据，arrAdd===1为加载数据，
        let self = this;
        if (self.isNotLoading) {
          return;
        } else {
          self.isNotLoading = false;
          self.$post("entry","/record",{
            role: aPeopleType,
            filter: aMonth,
            lastID: self.lastID,
            pageSize: self.pageSize,
          }).then((res)=>{
            self.queryAbleRole = [...res.data.queryAbleRole];
            self.queryAbleRole.unshift({type: "0", typeDesc: "全部"});

            if (arrAdd===0) {
              self.inDaysOf = [...res.data.list];
            } else {

              if (res.data.list.length===0) {
                self.isNotLoading = true;
                const toast = this.$createToast({
                  type: 'correct',
                  txt: "没有更多东西了"
                });
                toast.show();
              }
              self.inDaysOf.push.apply(self.inDaysOf,res.data.list);
            }
            self.lastID = res.data.list[res.data.list.length-1].recordID;

            // self.$refs.inAndOutRecordScroll.scrollTo(//回到顶部
            //   0,
            //   0,
            //   300,
            //   "EasingFn"
            // );
          });
        }

      }
    }
  };
</script>

<style lang="scss">
  .record-wrapper {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
    background: rgba(245, 245, 245, 1);
    z-index: 11;
    .btn {
      border: none;
      outline: none;
      text-align: center;
      text-overflow: ellipsis;
      font-size: 4.27vw;
      color: #3388ff;
      font-weight: 600;
      width: 15%;
      /*img {*/
        /*width: 0.4rem;*/
        /*height: 0.4rem;*/
      /*}*/
    }
  }

  .slide-fade-enter-active {
    transition: all 0.3s ease;
  }

  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter, .slide-fade-leave-to
      /* .slide-fade-leave-active for below version 2.1.8 */
   {
    transform: translateX(10px);
    opacity: 0;
  }
</style>



