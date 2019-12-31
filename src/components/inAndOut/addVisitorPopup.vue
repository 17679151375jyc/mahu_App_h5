<template>
  <div class="addVisitor-wrapper" >
    <cube-popup type="my-popup" ref="myPopup" :visible="popShow">
      <transition name="scale">
        <div class="container" >
          <p style="text-align: center;font-size: 4.8vw;font-weight: bold;margin-top: 3vw">添加访客</p>
          <p
            class="base-text-title-normal-black-light"
            style="margin: 6.4vw 0 3.2vw 0;font-weight: bold"
          >选择来访小区</p>
          <!--<h3>添加访客</h3>-->
          <!--<h4>选择来访小区</h4>-->
          <slot>
          </slot>
          <choose-text :list="options" v-if="popShow" @itemOnClick="chooseAddVisitorItem"></choose-text>
          <div class="footer">
            <button type="button" class="dengji" @click="goToAddInfo">业主登记资料</button>
            <button type="button" class="write" @click="goToShareInfo">
              <span class="fa fa-share-alt"></span> 访客微信自填
            </button>
          </div>
        </div>
      </transition>
      <p class="popup-close" :style="closeIconStyle"  @click="closePoppup('myPopup')">
        <img
          :src="require('./icon_close.png')"
          class="popup-close-icon"

        />
      </p>
    </cube-popup>
  </div>
</template>

<script>
import utils from "_libs/utils";
import chooseText from "_c/list/choose-text";
import { mapState } from "vuex";

export default {
  name: "addVisitorPopup",
  components: { chooseText },
  data() {
    return {
      popShow: false,
      // addVisitor: 3,
      // setting: {
      //   scrollbar: true
      // },
      options: [],
      myComnunities: {},
      closeIconStyle: { marginTop: "9.47vw" },

      listIndex: -1,
      // listItem: undefined
    };
  },
  created() {
    this.init();
  },
  computed: {
    hasData() {
      return this.options.length > 0;
    },
    ...mapState({
      'mUserPlotList': state => state.user.userPlotList
    })
  },
  mounted() {
    this.showPopup("myPopup");
    this.popShow = true;
  },
  methods: {
    show() {
      this.popShow = true;
    },
    remove() {
      this.popShow = false;
    },
    init() {
      let options = [...this.mUserPlotList];
      let indexLen = 0;
      options.forEach((item, index) => {
       /* if (index > 0) {
          indexLen = indexLen + (item.domicile ? item.domicile.length : 0);
        }*/
        if (item.domicile && item.domicile.length > 0) {
          item.domicile.forEach((domItem, domIndex) => {
            if (indexLen === 0 && domIndex === 0) {
              domItem.isSeleted = true;
            } else {
              domItem.isSeleted = false;
            }
            if (item.parkId) {
              domItem.parkId = item.parkId;
            }
            domItem.temporaryCount = item.temporaryCount;
            domItem.idcardStatus = item.idcardStatus;
            domItem.phoneStatus = item.phoneStatus;
            domItem.realNameStatus = item.realNameStatus;
           // domItem.index = indexLen + domIndex;
            domItem.index = indexLen;
            indexLen++;
            domItem.value = domItem.domicileName;
            this.options.push(domItem);
            this.myComnunities = Array.from(this.options)[0];
          });
        }
      });
    },
    showPopup(refId) {
      const component = this.$refs[refId];
      component.show();
    },
    closePoppup(refId) {
      this.$emit("addVisitorClose", { refId: refId });
      this.remove();
    },
    goToAddInfo() {
      //跳转到添加访客信息页面，并且存入一个对象，刚选择完的小区信息
      utils.localStorage("comnunuties", this.myComnunities);
      this.$router.push("/ma-hu-index/visitor-index/addVisitorInfo");
      this.$emit("addVisitorTo");
      this.remove();
    },
    goToShareInfo() {
      let self = this;
      this.closePoppup('myPopup');
      self
        .$post("entry", "/link", {
          domicileID: self.myComnunities.domicileID
        })
        .then(res => {
          utils.shareUrl(
            res.data.link,
            "穿云箭智能小区来访登记",
            "穿云箭智能小区来访登记"
          );
        });
    },
    chooseAddVisitorItem(e) {
      let self = this;
      self.listIndex = e.index;
      self.myComnunities = e.item;
    }
  }
};
</script>

<style lang="stylus" scoped>
.addVisitor-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 11;

  >>>.cube-popup {
    position: absolute !important;
  }

  .container {
    width: 78vw;
    height: 90vw;
    padding: 4vw;
    /* margin-top: 5vw; */
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
        font-size: 4.2666vw;
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
    color: rgba(255, 255, 255, 1);
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
