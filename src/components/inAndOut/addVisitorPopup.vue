<template>
  <div class="addVisitor-wrapper">
    <cube-popup type="my-popup" ref="myPopup">
      <transition name="scale">
        <div class="container" v-show="popShow">
          <p style="text-align: center;font-size: 4.27vw;font-weight: bold;margin-top: 3vw">添加访客</p>
          <p style="margin: 6.4vw 0 3.2vw 0;font-size: 3.73vw;font-weight: bold;">添加访客</p>
          <!--<h3>添加访客</h3>-->
          <!--<h4>选择来访小区</h4>-->
          <choose-text :list="options" @itemOnClick="chooseAddVisitorItem"></choose-text>
          <div class="footer">
            <button type="button" class="dengji" @click="goToAddInfo">业主登记资料</button>
            <button type="button" class="write" @click="goToShareInfo"><span class="fa fa-share-alt"></span> 访客微信自填</button>
          </div>
        </div>
      </transition>
      <p class="popup-close" :style="closeIconStyle">
        <img :src="require('./icon_close.png')"
             class="popup-close-icon"
             @click="closePoppup('myPopup')"/>
      </p>
    </cube-popup>
  </div>
</template>

<script>
  import utils from '_libs/utils'
  import chooseText from '_c/list/choose-text';
  import { mapState } from 'vuex';

  export default {
    name: 'addVisitor',
    components: {chooseText},
    data() {
      return {
        popShow: false,
        addVisitor: 3,
        setting: {
          scrollbar: true,
        },
        options: [],
        myComnunities: {},
        closeIconStyle: {marginTop: '9.47vw'},

        listIndex: -1,
        listItem: undefined,
      }
    },
    created() {
      this.init();
    },
    computed: {
      hasData() {
        return this.options.length > 0
      },
      ...mapState({
        'mUserPlotList': state => state.user.userPlotList
      })
    },
    mounted() {
      this.showPopup('myPopup');
      this.popShow = true;
    },
    methods: {
      init() {
        let options = [...this.mUserPlotList];
        let indexLen = 0;

        options.forEach((item, index) => {
          if (index > 0) {
            indexLen = indexLen + item.domicile.length;
          }
          if(item.domicile && item.domicile.length > 0) {
            item.domicile.forEach((domItem, domIndex) => {
              if(index===0 && domIndex===0) {
                domItem.isSeleted = true;
              } else {
                domItem.isSeleted = false;
              }
              if(item.parkId) {
                domItem.parkId = item.parkId;
              }
              domItem.temporaryCount = item.temporaryCount;
              domItem.isIdentity = item.isIdentity ? item.isIdentity : 0;
              domItem.index = indexLen + domIndex;
              domItem.value = domItem.domicileName;
              this.options.push(domItem);
              this.myComnunities = Array.from(this.options)[0];
            });
          }
        });
      },
      showPopup(refId) {
        const component = this.$refs[refId]
        component.show()
      },
      closePoppup(refId) {
        this.$emit('addVisitorClose', {refId: refId});
      },
      goToAddInfo() {
        //跳转到添加访客信息页面，并且存入一个对象，刚选择完的小区信息
        utils.localStorage('comnunuties', this.myComnunities);
        this.$router.push('/ma-hu-index/visitor-index/addVisitorInfo');
        this.$emit('addVisitorTo');
      },
      goToShareInfo() {
        let self = this;
        self.$post("entry","/link",{
          domicileID: self.myComnunities.domicileID,
        }).then((res)=>{
          utils.shareUrl(res.data.link, "穿云箭智能小区来访登记", "穿云箭智能小区来访登记");
        });
      },
      chooseAddVisitorItem(e) {
        let self = this;
        self.listIndex = e.index;
        self.myComnunities = e.item;
      },
    }
  }
</script>


<style lang="stylus">
  .addVisitor-wrapper {

    .container {
      width: 78vw;
      height 90vw;
      padding: 4vw;
      /*margin-top: 5vw;*/
      background: rgba(255, 255, 255, 1);
      border-radius: 2.67vw;

      h3 {
        margin: 0 31vw;
        font-size: 4.27vw;
        font-weight: bold;
      }
      h4 {
        margin: 6.4vw 0 3.2vw 0;
        font-size: 3.73vw;
        font-weight: bold;
      }

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
          font-size: 3.47vw;
          font-weight: 500;
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

    .popup-close {
      width: 100%;
      margin-top: 43vw;
      color: rgba(255,255,255,1);
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
    .popup-close-icon {
      width: 16vw;
      height: 16vw;
    }
  }
</style>
