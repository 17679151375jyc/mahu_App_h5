<template>
  <div class="wrapper">
    <return-head :title="title"></return-head>

    <div class="address-management-change-box">
      <div class="base-horizontal-layout-space-between-item-center">
        <div class="base-vertical-layout-center" style="padding: 0 8vw">
          <div class="base-horizontal-layout-space-between-item-center">
            <input class="address-management-change-input" v-model="name" placeholder=" 请输入姓名"/>
          </div>
          <div style="width: 65.33vw;height: 0.27vw;background-color: #F2F4F5"></div>
          <input class="address-management-change-input" type="number" v-model="phoneNumber" placeholder=" 请输入手机号码"/>
          <div style="width: 65.33vw;height: 0.27vw;background-color: #F2F4F5"></div>
        </div>
        <div class="base-vertical-layout-center-item-center" style="width: 26.67vw;height: 26.67vw">
          <img :src="require('@/assets/icon/icon_contacts.png')" style="width: 8vw;height: 8vw">
          <p class="base-text-details-normal-gray-light" style="color: #A1AAB3;margin-top: 1.33vw">联系人</p>
        </div>
      </div>
      <div style="margin-top: 5.33vw">
        <div class="base-horizontal-layout-space-between-item-center" style="padding: 0 8vw">
          <div class="base-horizontal-layout-center-item-center">
            <img :src="require('@/assets/icon/icon_position.png')" style="width: 3.3vw;height: 3.3vw">
            <p v-if="cityStr===''" style="font-size: 3.73vw;color: #45484D;margin-left: 2.67vw">请选择城区</p>
            <p v-else style="font-size: 3.73vw;color: #8A8F99;margin-left: 2.67vw">{{cityStr}}</p>
          </div>
          <div @click="chooseAddress">
            <img :src="require('@/assets/icon/icon_more.png')" style="width: 5.33vw;height: 5.33vw" >
          </div>

        </div>
        <div style="padding: 0 8vw;margin-top: 4vw">
          <input class="address-management-change-input" v-model="address" placeholder=" 请填写详细地址"/>
        </div>
      </div>
    </div>

    <div class="base-horizontal-layout-center" style="margin-top: 5.33vw;width: 100vw">
      <button-background-bottom text="保存"
                                @buttonOnClick="save">
      </button-background-bottom>
    </div>

    <address-popup v-if="isCityPopShow" @cityStrOnClick="cityStrOnClick"></address-popup>
  </div>
</template>

<script>
  import returnHead from '_c/head/return-head';
  import buttonBackgroundBottom from '_c/button/button-background-bottom';
  import addressPopup from  '_c/popup/address-popup';

  export default {
    name: "address-management-change",
    components: {
      returnHead,
      buttonBackgroundBottom,
      addressPopup
    },
    data() {
      return {
        title: '',
        name: '',
        phoneNumber: '',
        city: {province:"广东省",city:"江门市",area:"蓬江区",street:"城区"},
        cityStr: '',
        address: '',

        isCityPopShow: false,
        refId: 'myAddressPopup',
        popPosition: 'bottom',
        popupContainerStyle: {width: '100vw',padding: '0',borderRadius: '0'},
        popListTitle: "",
        popList: [],
        popListState: 0,

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
      this.title = this.$route.query.title;
    },
    mounted() {
      let self = this;
      // axios.get('').then(res=>{
      //
      // });
      if(self.title === "编辑地址") {
        self.name = "叶";
        self.phoneNumber = "18878099876";
        self.cityStr = self.city.province+" "+self.city.city+" "+self.city.area+" "+self.city.street;
        self.address = "环市二路10号";
      }
    },
    methods: {
      chooseAddress() {
        this.isCityPopShow = true;
      },
      cityStrOnClick(e) {
        if (e.cityStr !== "")  {
          this.cityStr = e.cityStr;
        }
        this.isCityPopShow = e.isPopShow;
      },

      save() {

      },


      // 刷新
      onPullingDown() {
        this.$refs.scroll.forceUpdate();
      },
      onPullingUp() {
        this.$refs.scroll.forceUpdate();
      },
    }
  }
</script>

<style scoped>
  .address-management-change-box {
    margin-top: 0.53vw;
    padding: 5.33vw 0;
    background-color: white;
  }
  .address-management-change-input {
    width: 100%;
    height: 13.33vw;
    font-size: 3.73vw;
  }

  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    color: #B1B1B3;
    font-size: 3.73vw;
  }
  input:-moz-placeholder, textarea:-moz-placeholder {
    color: #B1B1B3;
    font-size: 3.73vw;
  }
  input::-moz-placeholder, textarea::-moz-placeholder {
    color: #B1B1B3;
    font-size: 3.73vw;
  }
  input:-ms-input-placeholder, textarea:-ms-input-placeholder {
    color: #B1B1B3;
    font-size: 3.73vw;
  }
</style>