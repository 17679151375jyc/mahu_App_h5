<template>
  <div class="choose-text-list-box">
    <cube-scroll ref="plotBoxList">
      <div class="base-horizontal-layout-space-between-item-center"
           :class="{'choose-text-list-item-box':true}"
           v-for="(item,index) in list" :key="index"
           @click="itemOnClick(index)">
        <p class="choose-text-list-item">{{item.value}}</p>
        <img v-if="item.isSeleted" :src="iconListChoose" style="width: 5.33vw;height: 5.33vw">
        <img v-else :src="iconListNoChoose" style="width: 5.33vw;height: 5.33vw">
      </div>
    </cube-scroll>
  </div>
</template>

<script>
  export default {
    name: "choose-text",
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
    border-radius: 2.67vw;
  }
  .choose-text-list-item-box {
    height: 13.3333vw;
    background-color: white;
    border-radius:1.33vw;
    padding: 0 4vw;
    margin-bottom: 0.53vw;
  }
  .choose-text-list-item {
    font-size: 3.73vw;
    color: #4D4D4D;
  }
</style>