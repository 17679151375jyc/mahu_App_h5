<template>
  <div class="wrapper">
    <topBar title="消息通知" @goBack="back"></topBar>
    <div class="items">
      <div class="item border-bottom-1px">
        <span>接收通知提醒</span>
        <div class="switch-wrapper">
          <div class="text">{{valueStr}}</div>
          <cube-switch v-model="value"></cube-switch>
        </div>
      </div>
      <div class="item">
        <span>免打扰模式</span>
      </div>
    </div>
    <div class="info">提示：免打扰开启后，收到新信息不会有声音或振动提示</div>
  </div>
</template>

<script>
  import topBar from "_c/topBar";

  export default {
    name: "settingMessage",
    components: { topBar },
    data() {
      return {
        value: true,
        valueStr: "已开启"
      };
    },
    watch: {
      value() {
        this.valueStr = this.value ? "已开启" : "未开启";
      }
    },
    methods: {
      back(e) {
        setTimeout(() => {
          this.$router.goBack();
        }, 50);
      }
    }
  };
</script>

<style lang="stylus" scoped>
.items {
  margin: 2.6667vw 0 2.6667vw 0;
  background: #fff;

  .item {
    display: flex;
    margin-left: 5.3333vw;
    padding-right: 5.3333vw;
    justify-content: space-between;
    align-items: center;
    height: 13.3333vw;

    .switch-wrapper {
      display: flex;
      align-items: center;
      .text{
          font-size: 3.2vw;
          color: #ccc;
          margin-right: 2.9333vw;
      }
    }

    span {
      color: #666;
      font-size: 3.4667vw;
    }

    i {
      font-size: 4.8vw;
      color: #4d4d4d;
    }

    b {
      color: #ccc;
      font-size: 3.4667vw;
    }
  }
}

.info {
  font-size: 3.2vw;
  color: #ccc;
  text-align: center;
}
</style>
