<template>
  <div class="choose-text-list-box">
    <cube-scroll ref="plotBoxList" :data="list">
      <div class="base-horizontal-layout-space-between-item-center choose-text-list-item-box"
           v-for="(item,index) in list" :key="index"
           @click="itemOnClick(index)">
        <p class="base-text-title-normal-black-light choose-text-list-item-text">{{item.value}}</p>
        <img v-if="item.isSeleted" :src="iconListChoose" style="margin-left: 1.2vw;width: 5.33vw;height: 5.33vw">
        <img v-else :src="iconListNoChoose" style="margin-left: 1.2vw;width: 5.33vw;height: 5.33vw">
      </div>
    </cube-scroll>
  </div>
</template>

<script>
  import DayRecord from "../inAndOut/dayRecord";
  export default {
    name: "choose-text",
    components: {DayRecord},
    props:
      {
        list: {
          type: Array,
          default: () => ([])
        },
      },
    data() {
      return {
        iconListChoose: require('_assets/icon/icon-list-selectd.png'),
        iconListNoChoose: require('_assets/icon/icon-list-unselect.png'),
      }
    },
    created() {
      let self = this;
      self.$emit('itemOnClick', {index: 0, item: this.list[0]});
    },
    watch: {
      list() {
        let self = this;
        self.$emit('itemOnClick', {index: 0, item: this.list[0]});
      }
    },
    methods: {
      itemOnClick(index) {
        let self = this;
        for (let count = 0; count < self.list.length; count++) {
          self.list[count].isSeleted = false;
        }
        self.list[index].isSeleted = true;
        self.$forceUpdate();
        self.$emit('itemOnClick', {index: index, item: this.list[index]});
      }
    }
  }
</script>

<style scoped>
  .choose-text-list-box {
    height: 53.3333vw;
    padding: 0.53vw;
    margin-top: 2.93vw;
    background-color: #F5F5F5;
    border-radius: 1.33vw;
    /*overflow: auto;*/
  }
  .choose-text-list-item-box {
    min-height: 13.3333vw;
    background-color: white;
    border-radius:1.33vw;
    padding: 1vw 4vw;
    margin-bottom: 0.53vw;
  }
  .choose-text-list-item {
    font-size: 3.73vw;
    color: #4D4D4D;
  }
  .choose-text-list-item-text {
    flex: 1;
   /* line-height: 13vw;*/
    overflow: hidden;
    /* 文本不会换行
    white-space: nowrap;*/
    /* 当文本溢出包含元素时，以省略号表示超出的文本
    text-overflow: ellipsis;*/
     line-height: 7vw;

  }
</style>