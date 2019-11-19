<template>
  <div>
    <base-popup v-if="isPopShow"
                :refId="refId"
                :popPosition="popPosition"
                :popupContainerStyle="popupContainerStyle"
                :isShowbtn="false">

      <div class="base-horizontal-layout-space-between-item-center" style="height: 10.67vw">
        <div style="width: 7.47vw;height: 7.47vw;margin-left: 2.67vw"></div>
        <p style="font-size: 4.27vw;color: #666666;text-align: center">选择城区</p>
        <img :src="require('./icon_close-gray.png')"
             @click="closePoppup"
             style="width: 7.47vw;height: 7.47vw;margin-right: 2.67vw">
      </div>
      <div class="base-horizontal-layout-general" style="padding: 2.67vw 0 0 5.33vw" v-show="popListState>1">
        <div class="base-vertical-layout-general-item-center" style="margin-top: 1vw">
          <div class="base-vertical-layout-general-item-center">
            <div style="width: 2.4vw;height: 2.4vw;background-color: #3388FF;border-radius: 50%"></div>
            <div style="width: 0;height: 7vw;border: 0.27vw solid rgba(51,136,255,1)"></div>
            <div v-if="popListState===2" style="width: 2.4vw;height: 2.4vw;border: 0.27vw solid rgba(51,136,255,1);border-radius: 50%"></div>
            <div v-else style="width: 2.4vw;height: 2.4vw;background-color: #3388FF;border-radius: 50%"></div>
          </div>
          <div v-show="popListState>2" class="base-vertical-layout-general-item-center">
            <div style="width: 0;height: 6.8vw;border: 0.27vw solid rgba(51,136,255,1)"></div>
            <div v-if="popListState===3" style="width: 2.4vw;height: 2.4vw;border: 0.27vw solid rgba(51,136,255,1);border-radius: 50%"></div>
            <div v-else style="width: 2.4vw;height: 2.4vw;background-color: #3388FF;border-radius: 50%"></div>
          </div>
          <div v-show="popListState>3" class="base-vertical-layout-general-item-center">
            <div style="width: 0;height: 6.8vw;border: 0.27vw solid rgba(51,136,255,1)"></div>
            <div style="width: 2.4vw;height: 2.4vw;border: 0.27vw solid rgba(51,136,255,1);border-radius: 50%"></div>
          </div>
        </div>
        <div style="margin-left: 2.67vw;font-size: 3.73vw">
          <p style="margin-bottom: 6.4vw;width: 80vw"
             @click="returnChooseCity(1)">{{popListTitleProvince.name}}</p>
          <p style="margin-bottom: 6.4vw"
             :class="{'pop-list-text-color' : popListState===2}"
             @click="returnChooseCity(2)">{{popListTitleCity.name}}</p>
          <p v-show="popListState>2"
             style="margin-bottom: 6.2vw"
             @click="returnChooseCity(3)"
             :class="{'pop-list-text-color' : popListState===3}">{{popListTitleArea.name}}</p>
          <p v-show="popListState>3"
             style="margin-bottom: 6.4vw"
             :class="{'pop-list-text-color' : popListState===4}">{{popListTitleStreet.name}}</p>
        </div>
      </div>
      <cube-scroll
        ref="scroll"
        :style="defaultStyle">
        <div style="padding: 5vw 5.33vw 0 5.33vw">
          <p style="font-size: 3.2vw;color: #999999;margin-bottom: 3.33vw">{{popListTitle}}</p>
          <div v-show="popListState===4"
               class="base-horizontal-layout-space-between-item-center"
               style="height: 10vw"
               @click="chooseCity(popListState,0,-1)">
            <p style="font-size: 4.27vw;color: #3388FF"
               :style="cityData.isChooseStreet ? {color: '#333333'} : {color: '#3388FF'}">（暂不选择）</p>
            <img v-if="!cityData.isChooseStreet" :src="require('./icon_gou-color.png')"
                 style="width: 6vw;height: 4vw">
          </div>
          <div v-for="(item,index) in popList" :key="index"
               class="base-horizontal-layout-space-between-item-center"
               style="height: 9.666666vw" @click="chooseCity(popListState,1,index)">
            <div class="base-horizontal-layout-center-item-center">
              <!--<p style="font-size: 3.47vw;color: #999999;margin-right: 5.33vw">{{item.spell}}</p>-->
              <p class="pop-list-text"
                 :class="{'pop-list-text-color' : isChooseId===item.id}">{{item.name}}</p>
            </div>
            <img v-show="isChooseId===item.id"
                 :src="require('./icon_gou-color.png')"
                 style="width: 6vw;height: 4vw">
          </div>
          <div style="height: 4.33vw"></div>
        </div>
      </cube-scroll>
    </base-popup>
  </div>
</template>

<script>
  import basePopup from '_c/popup/base-popup';

  export default {
    name: "address-popup",
    props:
      {
        cityData: {
          type: Object,
          default: () => {}
        }
      },
    components: {
      basePopup
    },
    data() {
      return {
        isPopShow: false,
        refId: 'myAddressPopup',
        popPosition: 'bottom',
        popupContainerStyle: {width: '100vw',padding: '0',marginBottom: '0', borderRadius: '0'},
        popListTitle: "",
        popListTitleProvince: {id:-1,name:""},
        popListTitleCity: {id:-1,name:"请选择市"},
        popListTitleArea: {id:-1,name:"请选择区/县"},
        popListTitleStreet: {id:-1,name:"请选择街道"},
        popList: [],
        popListState: 0,
        isChooseId: -1,
        city: {},

        /**
         * 我不想删除我的模拟基础数据，这是我美好的回忆
         */
        // province:[{id:1,name:"广东省",spell:"A"},{id:2,name:"广东省",spell:"A"},{id:3,name:"广东省",spell:"B"},{id:4,name:"广东省",spell:"B"},
        //   {id:5,name:"广东省",spell:"C"}, {id:6,name:"广东省",spell:"C"},{id:7,name:"广东省",spell:"C"},{id:8,name:"广东省",spell:"C"},
        //   {id:9,name:"广东省",spell:"C"},{id:10,name:"广东省",spell:"C"},{id:11,name:"广东省",spell:"C"}],
        // cCity:[{id:1,name:"江门市"},{id:11,name:"江门市"},{id:12,name:"江门市"},{id:13,name:"江门市"},{id:14,name:"江门市"},
        //   {id:15,name:"江门市"},{id:16,name:"江门市"},{id:17,name:"江门市"},{id:18,name:"江门市"},{id:19,name:"江门市"},{id:110,name:"江门市"}],
        // area:[{id:21,name:"蓬江区"},{id:211,name:"蓬江区"},{id:221,name:"蓬江区"},{id:231,name:"蓬江区"},{id:241,name:"蓬江区"},
        //   {id:251,name:"蓬江区"},{id:261,name:"蓬江区"},{id:271,name:"蓬江区"},{id:281,name:"蓬江区"},{id:291,name:"蓬江区"},{id:301,name:"蓬江区"}],
        // street:[{id:55,name:"城区"},{id:56,name:"蓬江区"},{id:57,name:"江海区"},{id:58,name:"新会"},{id:59,name:"开平"}],

        defaultStyle: {
          height: 'calc(113.6vw - 33.33vw)',
          backgroundColor: '#F5F5F5'
        },
        scrollOptions: {
          observeDOM: true,
          click: true,
          probeType: 1,
          scrollbar: false,
          pullDownRefresh: {
            stopTime: 500,
            txt: `刷新成功`
          },
          pullUpLoad: false
        },
      }
    },
    created() {
    },
    mounted() {
      this.isPopShow = true;
      let self = this;
      self.$post("com","/province",{}).then((res)=>{
        self.popList = [...res.data.list];
        self.popListState = 1;

        if (self.cityData.isChoose) {
          self.popListTitleProvince = {id:self.cityData.valueId1,name:self.cityData.value1};
          self.popListTitleCity = {id:self.cityData.valueId2,name:self.cityData.value2};
          self.popListTitleArea = {id:self.cityData.valueId3,name:self.cityData.value3};
          self.popListTitleStreet = {id:self.cityData.valueId4,name:self.cityData.value4};
          self.isChooseId = self.cityData.valueId3;
          self.popListTitleArea.id = self.cityData.valueId3;
          if (self.cityData.isChooseStreet) {
            self.returnChooseCity(4)
          } else {
            self.returnChooseCity(3)
          }
        }
      });
    },
    watch: {
      popListState() {
        switch (this.popListState) {
          case 1:
            this.popListTitle = "选择省份/地区";
            break;
          case 2:
            this.popListTitle = "选择城市";
            break;
          case 3:
            this.popListTitle = "选择区/县";
            break;
          case 4:
            this.popListTitle = "选择街道";
            break;
          default:
            break;
        }
      }
    },
    methods: {
      closePoppup() {
        let self = this;
        self.isPopShow = false;
        self.isChooseId = -1;
        self.$emit('cityStrOnClick',
          {cityStr: "", isPopShow: this.isPopShow});
      },
      chooseCity(popListState,isChooseStreet,index) {//todo 弄个蒙层让用户点不了
        setTimeout(() => {
          let self = this;
          this.isChooseId = -1;
          this.popListState = popListState+1;
          switch (popListState) {
            case 1:
              self.popListTitleProvince = this.popList[index];
              self.$post("com","/city",{provinceId: this.popListTitleProvince.id}).then((res)=>{
                self.popList = [...res.data.list];
                self.popListTitleCity = {id:-1,name:"请选择市"};
              });
              break;
            case 2:
              this.popListTitleCity = this.popList[index];
              self.$post("com","/area",{cityId: this.popListTitleCity.id}).then((res)=>{
                self.popList = [...res.data.list];
                self.popListTitleArea = {id:-1,name:"请选择区/县"};
              });
              break;
            case 3:
              this.popListTitleArea = this.popList[index];
              self.$post("com","/street",{areaId: this.popListTitleArea.id}).then((res)=>{
                self.popList = [...res.data.list];
                self.popListTitleStreet = {id:-1,name:"请选择街道"};
                self.cityData.isChooseStreet = false;
              });
              break;
            case 4:
              this.popListTitleStreet = this.popList[index];
              this.isPopShow = false;
              if (isChooseStreet===0) {
                this.city =
                  {province:this.popListTitleProvince,city:this.popListTitleCity,
                    area:this.popListTitleArea,street:{id:-1,name:""}};
              } else {
                this.city =
                  {province:this.popListTitleProvince,city:this.popListTitleCity,
                    area:this.popListTitleArea,street:this.popListTitleStreet};
              }
              self.$emit('cityStrOnClick',
                {
                  cityStr: this.city.province.name+" "+this.city.city.name+" "+this.city.area.name+" "+this.city.street.name,
                  province: this.city.province,
                  city: this.city.city,
                  area: this.city.area,
                  street: this.city.street,
                  isPopShow: this.isPopShow
                });
              this.popListState = 0;
              break;
            default:
              break;
          }
        }, 350);
      },
      returnChooseCity(popListState) {
        let self = this;
        this.popListState = popListState;
        switch (popListState) {
          case 1:
            this.isChooseId = this.popListTitleProvince.id;
            self.$post("com","/province",{}).then((res)=>{
              self.popList = [...res.data.list];
            });
            break;
          case 2:
            this.isChooseId = this.popListTitleCity.id;
            self.$post("com","/city",{provinceId: this.popListTitleProvince.id}).then((res)=>{
              self.popList = [...res.data.list];
            });
            break;
          case 3:
            this.isChooseId = this.popListTitleArea.id;
            self.$post("com","/area",{cityId: this.popListTitleCity.id}).then((res)=>{
              self.popList = [...res.data.list];
            });
            break;
          case 4:
            this.isChooseId = this.popListTitleStreet.id;
            self.$post("com","/street",{areaId: this.popListTitleArea.id}).then((res)=>{
              self.popList = [...res.data.list];
            });
            break;
          default:
            break;
        }
      }
    }
  }
</script>

<style scoped>
  .pop-list-text {
    font-size: 4.27vw;
    color: #333333;
  }
  .pop-list-text-color {
    color: #3388FF;
  }
</style>