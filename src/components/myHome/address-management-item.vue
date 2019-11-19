<template>
  <div class="address-management-item-box">
    <div class="base-horizontal-layout-space-between-item-center">
      <p style="font-size: 3.73vw;color: #45484D"
      >{{addressManagementInfo.name}}<span
        style="margin-left: 10.67vw">{{addressManagementInfo.phone}}</span></p>
      <img :src="require('@/assets/icon/icon_edit-blue.png')" class="base-icon-normal-style" @click="editAddress">
    </div>
    <div class="address-management-item-text">
      <p style="color: #8A8F99;margin-top: 4.27vw">{{addressManagementInfo.area}}</p>
      <p style="color: #45484D;margin-top: 2vw">{{addressManagementInfo.address}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "address-management-item",
    props:
      {
        // index: Number,
        addressManagementInfo: {},
      },
    methods: {
      editAddress() {
        this.$router.push({ path: "/my-home/installation/address-management/address-management-change", query: {title: "编辑地址"}});//todo 传地址id
      }
    }
  };
</script>

<style scoped>
  .address-management-item-box {
    padding: 5.33vw 8vw;
    border-top: 0.27vw solid rgba(227,228,230,1);
    background-color: white;
  }
  .address-management-item-text {
    font-size: 3.73vw;
    font-weight: 400;
  }
</style>
