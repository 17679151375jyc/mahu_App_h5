<!--顶部固定菜单，接收自定义标题，右边的按钮，可以通过监听rightButtonClick来得到按钮点击事件-->
<template>
  <div class="topBar-wrapper" :style="styleName">
    <span class="left-title">我的访客</span>
  </div>
</template>

<script>
  export default {
    name: "tobBar",
    props: {
      styleName: {}
    },
    data() {
      return {};
    },
    methods: {
      rightButtonClick(e) {
        this.$emit("rightButtonClick", e);
      }
    },
    created() {},
    mounted() {
      setTimeout(() => {
        // console.log(this.$refs.haha.style.length)
      }, 1000);
    }
  };
</script>

<style lang="stylus" >
  $themeColor = rgba(51, 136, 255, 1);
  $textColor = #fff;
  $fontSize = 5.33vw;

  $textOverflow = ellipsis;

  .topBar-wrapper {
    background: $themeColor;
    padding: 7vw 5.33vw 0 5.33vw;

    height: 11.7333vw;
    display: flex;
    align-items: center;
    .left-title {
      color: $textColor;
      font-size: $fontSize;
      font-weight: bold;
    }
  }
</style>