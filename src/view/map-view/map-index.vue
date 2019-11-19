<!--@Time  : 2019/10/01 17:49-->
<!--@Author: michael huang-->
<!--@File  : map-index.vue-->

<template>
  <div class="wrapper">
    <return-head title="我的附近"></return-head>
    <div style="height: calc(100vh - 11.73vw + 5vw)">
      <!--为了隐藏高德符号-->
      <a-map :width="mapWidth"
             :height="mapHeight"
             :locationData="mapData">
      </a-map>
    </div>
  </div>
</template>

<script>
  import utils from '_libs/utils';
  import returnHead from '_c/head/return-head';
  import aMap from "_c/myHome/map";

  export default {
    name: "map-index",
    components: {returnHead,aMap},
    data() {
      return {
        mapWidth: "100%",
        mapHeight: "100%",
        mapData: {
          staff: {
            // staffIcon: './static/assets/icon/map-scu.png',   //图标，现在没用上
            // staffLocation: [[113.07454,22.5821],[113.07854,22.5271]]  //安保人员的经纬坐标
            // staffLocation: []  //安保人员的经纬坐标
          },
          // WITHINNUMBER: 3000,   //给定的范围，单位m}
          WITHINNUMBER: 1,
        },
      }
    },
    created() {
      // console.log(utils.getLatitude());
      // console.log(utils.getLontitude());
      // this.mapData.staff.staffLocation.push();
    },
    mounted() {
      this.getNearbyInfo();
    },
    methods: {
      getNearbyInfo() {
        let self = this;
        AMap.plugin('AMap.Geolocation', function() {
          var geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000, //超过10秒后停止定位，默认：5s
          });
          geolocation.getCurrentPosition(function(status,result){
            if(status=='complete'){
              console.log("我的定位",result.position);
              self.$post("hCommon","/getNearby",{lng:result.position.lng, lat:result.position.lat}).then((res)=>{//todo
                let staffLocation = [];
                res.data.forEach((item) => {
                  staffLocation.push([item.longitude, item.latitude]);
                });
                if (staffLocation.length === res.data.length) {
                  //地图 模拟取得数据后的异步操作，当locationData为空时将不加载地图
                  setTimeout(() => {
                    self.mapData = {
                      staff: {
                        staffIcon: "static/assets/icon/map-scu.png", //图标，现在没用上
                        staffLocation: staffLocation //安保人员的经纬坐标
                      },
                      WITHINNUMBER: 3000 //给定的范围，单位m}
                    };
                  }, 200);
                }
              });
            } else {
              const toast = this.$createToast({
                type: "warn",
                txt: "定位失败"
              });
              toast.show();
              console.log(result)
            }
          });
        });
      },
    }
  }
</script>

<style scoped>

</style>