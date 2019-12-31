<template>
  <div class="wrapper-white">
    <return-head title="设备列表"></return-head>
    <div class="box"></div>
    <div class="speCss">
      <div v-if='defenShow'>
        <div class="base-vertical-layout-general-item-center div_box" 
          v-for="(item,index) in defenceInfo.list" 
          :key='index'
          @click="pathClick(0, index)">
          <img class="jiaobiao" 
              :src="item.onLine?
              require('@/assets/notification/zaixian.png'):
              require('@/assets/notification/lixian.png')">
          <div class="div_box_top">
            <div class="base-horizontal-layout-general-item-center icon_img">
              <img :src="require('@/assets/notification/fdhost.png')" class="host_img">
              <span>防盗主机</span>
            </div>
          </div>
          <div class="div_box_hr"></div>
          <div class="base-vertical-layout-center-item-center div_shebei">
            <div class="base-horizontal-layout-general-item-center div_dox_name">
              <span class="span_lable">设备名称：</span>
              <span class="span_arrdess">{{item.name}}</span>
            </div>
            <div class="base-horizontal-layout-general-item-center div_dox_name">
              <span class="span_lable">主机编号：</span>
              <span class="span_arrdess">{{item.account}}</span>
            </div>
            <div class="base-horizontal-layout-general-item-center div_dox_name">
              <span class="span_lable">防区数量：</span>
              <span class="span_arrdess">{{item.count}}</span>
            </div>
          </div>
        </div>

      </div>

      <div v-if="cameraShow">
        <div class="base-vertical-layout-general-item-center div_box" 
        
          v-for="(item,index) in cameraInfo.list" 
          :key='index'
          @click="pathClick(1, index)">
          <!-- <img class="jiaobiao" :src="require('@/assets/notification/zaixian.png')"> -->
          <div class="div_box_top">
            <div class="base-horizontal-layout-general-item-center icon_img">
              <img :src="require('@/assets/notification/vedio.png')">
              <span>视频主机</span>
            </div>
          </div>
          <div class="div_box_hr"></div>
          <div class="base-vertical-layout-center-item-center div_shebei">
            <div class="base-horizontal-layout-general-item-center div_dox_name">
              <span class="span_lable">设备名称：</span>
              <span class="span_arrdess">{{item.areaName}}</span>
            </div>
            <div class="base-horizontal-layout-general-item-center div_dox_name">
              <span class="span_lable">主机编号：</span>
              <span class="span_arrdess">{{item.account}}</span>
            </div>
            <div class="base-horizontal-layout-general-item-center div_dox_name">
              <span class="span_lable">设备位置：</span>
              <span class="span_arrdess">{{item.position}}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="doorShow">
        <div class="base-vertical-layout-general-item-center div_box" 
          v-for="(item,index) in doorInfo.list" 
          :key='index'
          @click="pathClick(2, index)">
          <img  class="jiaobiao" 
                :src="item.onLine?
                require('@/assets/notification/zaixian.png'):
                require('@/assets/notification/lixian.png')">
          <div class="div_box_top">
            <div class="base-horizontal-layout-general-item-center icon_img">
              <img :src="require('@/assets/notification/door.png')" class="door_img">
              <span>门禁机</span>
            </div>
          </div>
          <div class="div_box_hr"></div>
          <div class="base-vertical-layout-center-item-center div_shebei">
            <div class="base-horizontal-layout-general-item-center div_dox_name">
              <span class="span_lable">设备名称：</span>
              <span class="span_arrdess">{{item.deviceName}}</span>
            </div>
            <div class="base-horizontal-layout-general-item-center div_dox_name">
              <span class="span_lable">主机编号：</span>
              <span class="span_arrdess">{{item.deviceAccount}}</span>
            </div>
            <div class="base-horizontal-layout-general-item-center div_dox_name">
              <span class="span_lable">设备位置：</span>
              <span class="span_arrdess">{{item.positionDesc}}</span>
            </div>
          </div>
        </div>
      </div>     

    </div>

    <transition name="slide-fade">
      <router-view @Refresh="Refresh"></router-view>
    </transition>
  </div>
</template>

<script>
  import returnHead from "_c/head/return-head";
  import { mapState } from 'vuex';

  export default {
    name: "device-index",
    components: { returnHead },
    data() {
      return {
        defenShow: false,
        cameraShow: false,
        doorShow: false,
        areaName: '',
        areaNumber: '',
        defenceInfo: {
          count: 0,
          list: [
            {
              count: 0,
              name: '',
              position: '',
              status: '',
              defenceAreaList: []
            }
          ]
        },
        cameraInfo: {
          count: 0,
          list: [
            {
              count: 0,
              name: '',
              position: '',
              status: '',
              defenceAreaList: []
            }
          ]
        },
        doorInfo: {
          count: 0,
          list: [
            {
              count: 0,
              name: '',
              position: '',
              status: '',
              defenceAreaList: []
            }
          ]
        },
      }
    },
    watch: {},
    computed: {
      ...mapState({
        'mUserPhone': state => state.user.userPhone
      })
    },
    created() {
      this.areaName = this.$route.query.areaName;
      this.areaNumber = this.$route.query.areaNumber;
      this.getList();
    },
    methods: {
      Refresh(){//子页面更改之后刷新数据
        this.getList();
      },
      getList() {
        let self = this;
        this.$post("base", "/family/server/area/getPlotAreaDeviceList", {
          areaNumber: self.areaNumber
        }).then(({ data, errorCode }) => {
          if (errorCode === 0) {
            if (data) {
              self.defenceInfo = data.defenceMachine;
              self.defenShow = data.defenceMachine.list.length>0?true:false;
              self.cameraInfo = data.cameraMachine;
              self.cameraShow = data.cameraMachine.list.length>0?true:false;
              self.doorInfo = data.doorDevice;
              self.doorShow = data.doorDevice.list.length>0?true:false;
            }
          }
        });
      },
      pathClick(e, index){   //跳转
        let that = this;
        let listData;
        if(e === 0){
          listData = that.defenceInfo.list[index]
        }else if(e === 1){
          listData = that.cameraInfo.list[index]
        }else if(e === 2){
          listData = that.doorInfo.list[index]
        }
        that.$router.push({
          path: "/ma-hu-index/device-index/device-audit",
          query: {
            indexNum: e,
            data: listData
          }
        })
      }
    }
  };
</script>
<style scoped>
.wrapper-white{
  display: flex;
  flex-flow: column;
}
.box{
    width: 100%;
    position: absolute;
    top: 11.7333vw;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f5f5f5;
}
.speCss{
  width: 100%;
  overflow-y: auto;
  flex: 1;
  padding-bottom: 5vw;
  z-index: 1;
}
.div_box{
  width: 91.74vw;
  padding-left: 2.93vw;
  min-height: 32vw;
  background-color: #fff;
  margin: 0 auto;
  margin-top: 2.67vw;
  border-radius: 1.07vw;
  position: relative;
}
.jiaobiao{
  width: 16.27vw;
  height: 16.27vw;
  position: absolute;
  top: 0;
  right: 0;
}
.icon_img{
  width: 50vw;
  height: 100%;
  margin-left: 2.4vw;
}
.icon_img img{
  width: 5.33vw;
  height: 5.33vw;
  margin-right: 1.6vw;
}
.host_img{
  height: 4vw!important;
}
.door_img{
  width: 4vw!important;
  margin: 0 2vw 0 0.93vw!important;
}
.icon_img  span{
  font-weight: bold;
  color: #333;
  font-size: 5.33vw;
}
.div_box_top{
  height: 13.07vw;
  width: 89.5vw;
}
.div_box_hr{
  width: 86.6vw;
  background-color: #eee;
  margin-right: 5.07vw;
  border: 0;
  height: 0.27vw;
  padding: 0;
}
.div_shebei{
  width: 76.8vw;
  height: 25.07vw;
  line-height: 19vw;
  margin-left: 6.5vw;
}
.div_dox_name{
  height: 7vw;
  width: 76.8vw;
}
.div_dox_num{
  height: 5.87vw;
  width: 76.8vw;
}
.span_lable{
  color: #666666;
  font-size: 4.27vw;
  font-weight: bold;
}
.span_arrdess{
  color: #38F;
  font-size: 4.27vw;
  font-weight: bold;
}
</style>