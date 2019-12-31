<template>
  <div class="feedback-plot-wrapper">
    <cube-popup type="feedback-plot-popup" ref="mFeedbackPlotPopup">
      <transition name="scale">
        <div class="container" v-show="popShow">
          <p class="feedback-plot-popup-title" style="margin-top: 3vw">请选择提交的住宅</p>
          <plot-choose-text :list="plotList" @itemOnClick="choosePlot"></plot-choose-text>
          <div class="footer">
            <button type="button" @click="cancle">取消</button><!--class="dengji"-->
            <button type="button" @click="sure">确定</button><!--class="write"-->
          </div>
        </div>
      </transition>
    </cube-popup>
  </div>
</template>

<script>
  import utils from '_libs/utils'
  import plotChooseText from '_c/list/plot-choose-text';
  import { mapState } from 'vuex';

  export default {
    name: 'feedback-plot-popup',
    components: {plotChooseText},
    data() {
      return {
        popShow: false,
        addVisitor: 3,
        setting: {
          scrollbar: true,
        },
        plotList: [],//社区列表

        closeIconStyle: {marginTop: '9.47vw'},

        listIndex: -1,
        myChoosePlot: {},
      }
    },
    computed: {
      ...mapState({
        'mUserPlotList': state => state.user.userPlotList
      })
    },
    created() {
      this.init();
    },
    mounted() {
      this.showPopup('mFeedbackPlotPopup');
      this.popShow = true;
    },
    methods: {
      init() {
        let plotList = [...this.mUserPlotList];
        let indexLen = 0;
        plotList.forEach((item, index) => {
          if (index > 0) {
            indexLen = indexLen + item.domicile.length;
          }
          item.domicile.forEach((domItem, domIndex) => {
            domItem.value = domItem.plotName + " " + domItem.buildingName + " " + domItem.doorName;
            domItem.index = indexLen + domIndex;
            if(index===0 && domIndex===0) {
              domItem.isSeleted = true;
            } else {
              domItem.isSeleted = false;
            }
            this.plotList.push(domItem);
          });
        });
        console.log("dfsdfsdf",this.plotList)
      },

      showPopup(refId) {
        const component = this.$refs[refId]
        component.show()
      },
      cancle() {
        let self = this;
        self.$emit('cancelFeedbackPlot');
      },
      sure() {
        let self = this;
        self.$emit('sureFeedbackPlot', {myChoosePlot: self.myChoosePlot});
      },

      choosePlot(e) {
        let self = this;
        self.listIndex = e.index;
        self.myChoosePlot = e.item;
      },
    }
  }
</script>


<style lang="stylus">
  .feedback-plot-popup-title {
    text-align: center;
    font-size: 4.8vw;
    color: #333333;
    margin-bottom: 4vw;
  }


  .feedback-plot-wrapper {
    .container {
      width: 84vw;
      height 90vw;
      box-sizing: border-box;
      padding: 4vw;
      /*margin-top: 5vw;*/
      background: rgba(255, 255, 255, 1);
      border-radius: 2.67vw;

      /*h3 {
        margin: 0 31vw;
        font-size: 4.27vw;
        font-weight: bold;
      }
      h4 {
        margin: 6.4vw 0 3.2vw 0;
        font-size: 3.73vw;
        font-weight: bold;
      }*/

      .content {
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 1.33vw;
        padding: 1px;
        background: rgba(245, 245, 245, 1);
        height: 35vh;
        p {
          align-items: center;
          font-size: 3.73vw;
          margin: 0.5rem 0;
        }
      }
      .footer {
        margin-top: 5.33vw;
        display: flex;
        flex-direction: row;
        justify-content: center;
        button {
          width: 50%;
          border: 0;
          padding: 2.265vw 0;
          outline: none;
          text-align: center;
          background: rgba(255, 255, 255, 1);
          font-size: 4.2666vw;
          &:first-child {
            color: rgba(77, 98, 128, 1);
            border-right: 1px solid #E9EEF5;
          }
          &:last-child {
            color: #3388FF;

          }
        }

      }
    }
  }
</style>
