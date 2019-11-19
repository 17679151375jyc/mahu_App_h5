<template>
  <div class="property-details-item-box">
    <div class="base-horizontal-layout-space-between-item-center">
      <p class="base-text-title-normal-black" style="font-weight: bold">{{titleUtf32}}</p>
      <!--<img :src="require('@/assets/icon/icon_delete.png')"-->
           <!--style="width: 4.15vw;height: 4.15vw" @click="deletePropertyItem">-->
    </div>
    <p class="base-text-details-large-gray"
       :class="{'property-details-item-text':true}" v-html="contentUtf32"></p>
    <div class="base-horizontal-layout-general-item-center">
      <img v-for="(picItem,index) in item.pictures" :key="index" :src="picItem"
           class="property-details-item-img" @click="handleImgsClick(index)">
    </div>
    <p class="base-text-details-large-black" style="text-align: right;margin-top: 4vw">{{item.postDate}} {{item.plotName}}</p>
  </div>
</template>

<script>
  export default {
    name: "property-details-item",
    props:
      {
        index: {
          type: Number,
          default: 0
        },
        item: {
          type: Object,
          default: () => {}
        },
      },
    data() {
      return {
        initialIndex: 0,
        titleUtf32: '',
        contentUtf32: ''
      }
    },
    created() {
      this.titleUtf32 = unescape(this.item.title.replace(/\\u/g,"%u"));
      this.contentUtf32 = unescape(this.item.content.replace(/\\u/g,"%u"));
    },
    methods: {
      deletePropertyItem() {
        let self = this;
        this.$emit('deleteItem', {index: self.index, propertyItemId: self.item.noticeId});
      },
      handleImgsClick(index) {
        let imgs = [...this.item.pictures];
        this.initialIndex = index;
        const params = {
          $props: {
            imgs: imgs,
            initialIndex: 'initialIndex', //响应式数据的key名
            loop: false
          },
          $events: {
            change: (i) => {
              // 必须更新 initialIndex
              this.initialIndex = i
            }
          }
        }
        this.$createImagePreview({ ...params }).show()
      }
    }
  }
</script>

<style scoped>
  .property-details-item-box {
    margin: 3.2vw 2.666667vw 0 2.666667vw;
    padding: 5.3333vw 3.7333vw;
    background-color: white;
    border: 0.27vw solid rgba(237,238,240,1);
    box-shadow: 0 0.8vw 1.6vw rgba(0,0,0,0.1);
    border-radius: 2.67vw;
  }
  .property-details-item-text {
    line-height: 6.4vw;
    margin-top: 4vw;
    word-break: break-all;
    overflow: auto;
  }
  .property-details-item-img {
    width: 12.8vw;
    height: 12.8vw;
    border-radius: 1.33vw;
    margin: 2vw 3.2vw 0 0;
  }
</style>