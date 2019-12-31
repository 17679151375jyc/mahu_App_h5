<!--@Time  : 2019/12/07 16:21-->
<!--@Author: michael huang-->
<!--@File  : choose-city.vue-->

<template>
  <div class="wrapper-white">
    <return-head title="选择城市"></return-head>

    <div class="scroll-wrapper-addition-title">
      <!-- <cube-index-list
        :data="cityData"
        @select="selectItem">
      </cube-index-list> -->
       <cube-index-list :data="cityData">
        <cube-index-list-group
          v-for="(group, index) in cityData"
          :key="index"
          :group="group">
          <cube-index-list-item
            v-for="(item, index) in group.items"
            :key="index"
            :item="item"
            @select="selectItem">
            <div class="custom-item">{{item.name}}</div>
          </cube-index-list-item>
        </cube-index-list-group>
      </cube-index-list>
    </div>
  </div>
</template>

<script>
  import returnHead from '_c/head/return-head';

  export default {
    name: "choose-city",
    components: {returnHead},
    data() {
      return {
        cityData: []
      }
    },
    created() {
    },
    mounted() {
      let self = this;
      self.$post("community", "/newCity", {
        provinceCode: 440000
      }).then((res) => {
        self.cityData = [...res.data];
      });
    },
    methods: {
      selectItem(item) {
        console.log(">>>>>>>>>>>>>>>>>selectItem-name",item.name);
        console.log(">>>>>>>>>>>>>>>>>selectItem-code",item.value);
        let chooseCity = {
          cityName: item.name,
          cityCode: item.value,
        };
        window.localStorage.setItem("cityChoose",JSON.stringify(chooseCity));
        this.$router.goBack();
      }
    }
  }
</script>

<style lang="stylus" scoped>
  >>>.cube-index-list-item-def {
    font-size: 4.2666vw;
  }
  >>>.cube-index-list-nav-item {
    font-size: 4.2666vw;
  }
    >>>.custom-item {
    position: relative;
    height: 16vw;
    line-height: 16vw;
    padding: 0 5.3333vw;
    font-size: 4.2666vw;
  }
  >>>.cube-index-list-anchor {
    height: 8vw
    line-height: 8vw
    padding: 0 0 0 5.3333vw
    font-size: 4.2666vw;
  }
  >>>.cube-index-list-nav {
    border-radius: 0
    // background: rgba(0,0,0,.3)
    ul li {
        padding: 1vw
        ont-size: 4.2666vw
        // color: #909090
        &.active {
        //   color: #ffcd32;
        }
      }
  }
  >>>.cube-index-list-nav-item {
    font-size: 4.2666vw;
  }
</style>