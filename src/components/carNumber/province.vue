<template>
  <div class="province-popup" v-show="visible">
    <div class="cube-popup-mask" v-show="visible" @click="visible=false"></div>
    <!-- <div :class="['car-number-popup', visible ? 'cube-popup_mask' : '']" v-show="visible">
      <div class="cube-popup-mask" @click="visible=false"></div>
      
    </div>-->
    <div class="car-number-content" v-show="visible">
      <div class="items">
        <div
          :class="['item', item == province ? 'active' : '', ]"
          v-for="(item, index) in provinceList"
          :key="index"
          @click="chooseProvince(item)"
        >{{item == 'other' ? "其它" : item}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "province",
  props: {
      province: {
          type: String,
          default: '粤'
      }
  },
  data() {
    return {
      visible: false,
      provinceList: [
        "京",
        "津",
        "晋",
        "冀",
        "蒙",
        "辽",
        "吉",
        "黑",
        "沪",
        "苏",
        "浙",
        "皖",
        "闽",
        "赣",
        "鲁",
        "豫",
        "鄂",
        "湘",
        "粤",
        "桂",
        "琼",
        "渝",
        "川",
        "贵",
        "云",
        "藏",
        "陕",
        "甘",
        "青",
        "宁",
        "新",
        "other"
      ]
    };
  },
  created() {
    //   this.province = this.curProvince
  },
  methods: {
    show() {
        this.visible = true
    },
    remove () {
        this.visible = false
    },
    chooseProvince(item) {
        this.visible = false
        this.$emit('chooseProvince', item)
    }
  }
};
</script>
<style lang="stylus" scoped>
.province-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  .cube-popup-mask{
      display: block !important;
  }
  .car-number-content {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 72.8vw;
    background: #fff;
    display: flex;
    flex-flow: column;
    z-index: 201;

    .handler {
      flex: 0 0 60px;
      height: 120px;
      display: flex;
      justify-content: space-between;

      div {
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .items {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      align-items: center;
      background: #cfd4da;
      padding: 2vw;

      .item {
        flex: 0 0 10vw;
        height: 10vw;
        background: #fff;
        margin: 0 0.5vw;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0.8vw;
        color: #333;
        font-size: 4.8vw;

        &:active, &.active {
          color: #fff;
          background: linear-gradient(135deg, rgba(48, 201, 255, 1) 0%, rgba(51, 136, 255, 1) 100%);
        }
      }

      .item-none {
        flex: 0 0 10vw;
        height: 0;
        margin: 0 1vw;
      }
    }
  }
}
</style>