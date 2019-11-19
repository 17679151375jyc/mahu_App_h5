<template>
  <div class="container">
    <div
      :class="['item', curStep > index ? 'active' : '']"
      v-for="(item, index) in steps"
      :key="index"
    >
      <div class="icon">
        <i :class="['iconfont', item.icon]"></i>
      </div>
      <span>{{item.desc}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "progressBar",
  props: {
    steps: {
      // 传入对应的步骤数据
      type: Array,
      default: [
        {
          icon: "iconcardid",
          desc: "步骤一"
        },
        {
          icon: "iconzu13",
          desc: "步骤二"
        },
        {
          icon: "iconzu9",
          desc: "步骤三"
        },
        {
          icon: "iconzu10",
          desc: "步骤四"
        }
      ]
    },
    curStep: {
      // 当前步骤是第几步，1开始
      type: Number,
      default: 1
    }
  }
};
</script>
<style lang="stylus" scoped>
.container {
  height: 21.0667vw;
  background: #fff;
  display: flex;
  align-items: center;

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #ccc;
    flex: 1;

    .icon {
      width: 8vw;
      height: 8vw;
      overflow: hidden;
      display: flex;
      justify-content center;
      align-items center;
      i {
        font-size: 8vw;
        background: #fff;
        z-index: 1;
        }
    }
    span {
      margin-top: 1.6vw;
      font-size: 3.2vw;
    }

    &:nth-last-child(1):after {
      display: none !important;
    }

    &.active {
      color: #33F265;
      position: relative;

      &:after {
        content: '';
        display: block;
        position: absolute;
        width: 100%;
        height: 1px;
        background: #33f265;
        top: 3.7333vw;
        left: 50%;
      }

      span {
        color: #666;
      }
    }
  }
}
</style>


