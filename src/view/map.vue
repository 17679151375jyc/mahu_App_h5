<template><!--lang=""-->
  <div style="height: 100vh">
    <amap :width="width"
          :height="height"
          :locationData="data">
    </amap>
  </div>
</template>

<script>
  import amap from "_c/myHome/map";

  export default {
    name: "exp",
    components: { amap },
    data() {
      return {
        width: "100%",
        height: "100%",
        data: {
          /**   staff: {
           *      staffIcon: './static/assets/icon/map-scu.png',   //图标，现在没用上
           *      staffLocation: [ [113.07454,22.5821],[113.07854, 22.5271],]  //安保人员的经纬坐标
           *      },
           *   WITHINNUMBER: 3000,   //给定的范围，单位m}
           **/
        }
      };
    },
    methods: {},
    created() {
      //模拟取得数据后的异步操作，当locationData为空时将不加载地图
      setTimeout(() => {
        this.data = {
          staff: {
            staffIcon: "static/assets/icon/map-scu.png", //图标，现在没用上
            staffLocation: [[113.07454, 22.5821], [113.07854, 22.5271]] //安保人员的经纬坐标
          },
          WITHINNUMBER: 3000 //给定的范围，单位m}
        };
      }, 2000);
    },
    beforeCreate() {
      //尝试移除旧的本地数据,即使不存在也不会报错
      localStorage.removeItem("locationData");
    }
  };
</script>
