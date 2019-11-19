<template>
  <div class="index-head">
    <!--style="margin-top: 8vw"-->
    <div class="index-head-box">
      <p class="index-head-title">{{title}}</p>
      <img
        v-if="rightTextLeftIcon!==''"
        :src="rightTextLeftIcon"
        class="base-icon-large-style"
        @click="leftOnClick"
      />
    </div>
    <div class="right" @click="rightOnClick">
      <p v-if="rightText!==''" class="index-head-right-text">{{rightText}}</p>
      <img v-if="rightTextRightIcon!==''" :src="rightTextRightIcon" class="base-icon-large-style" />
    </div>
  </div>
</template>

<script>
export default {
  name: "index-head",
  props: {
    title: {
      type: String,
      default: ""
    },
    rightTextLeftIcon: {
      type: String,
      default: ""
    },
    rightText: {
      type: String,
      default: ""
    },
    rightTextRightIcon: {
      type: String,
      default: ""
    }
  },
  methods: {
    leftOnClick() {
      const self = this;
      self.$emit("leftOnClick", {});
    },
    rightOnClick() {
      const self = this;
      self.$emit("rightOnClick", {});
    }
  }
};
</script>

<style lang="stylus" scoped>
.index-head {
  width: 100vw;
  height: 11.7333vw;
  background-color: white;
  border-bottom: 1px solid rgba(221, 221, 221, 0.3);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .right {
    display: flex;
    align-items: center;
    height: 11.7333vw;
    padding: 0 5.333vw;

    &:hover {
      background: #f4f4f4;
    }
  }
}

.index-head-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 5.3333vw;
}

.index-head-title {
  font-size: 5.8666vw;
  font-weight: bold;
  color: #333;
}

.index-head-right-text {
  font-size: 3.73vw;
  font-weight: bold;
  color: #3388FF;
  line-height: 6.4vw;
}
</style>
