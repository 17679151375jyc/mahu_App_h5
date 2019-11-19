<template>
  <div class="wrap">
    <div class="items" v-for="(item,index) of item" :key="index" @click="toIndex(index)">
      <!-- <img :src="it.icon" alt="icon"> -->
        <i :class="['iconfont', item.icon]" :style="{'color': item.color}"></i>
      <span>{{item.desc}}</span>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: "sHeader",
    props: {
      item: {
        type: Array,
        default: []
      }
    },
    data() {
      return {};
    },
    mounted() {
      console.log(this.item);
    },
    computed: {
      ...mapState({
        'mUserHasProprietor': state => state.user.userHasProprietor
      })
    },
    methods: {
      toIndex(index) {
        console.log(index);
        switch (index) {
          case 0:
            if(this.mUserHasProprietor) {
              this.$router.push({path: "/service/feedback"});
            } else {
              this.hasProprietorToast();
            }
            break;
          case 1:
            if(this.mUserHasProprietor) {
              this.availableToast();
            } else {
              this.hasProprietorToast();
            }
            break;
          case 2:
            if(this.mUserHasProprietor) {
              this.availableToast();
            } else {
              this.hasProprietorToast();
            }
            break;
          case 3:
            if(this.mUserHasProprietor) {
              this.availableToast();
            } else {
              this.hasProprietorToast();
            }
            break;
          case 4:
            if(this.mUserHasProprietor) {
              this.availableToast();
            } else {
              this.hasProprietorToast();
            }
            break;
          default:
            break;
        }
      },
      availableToast() {
        const toast = this.$createToast({
          type: 'correct',
          txt: "该功能暂未开通！"
        });
        toast.show();
      },
      hasProprietorToast() {
        const toast = this.$createToast({
          type: "warn",
          txt: "需要先加入社区，才能使用此功能"
        });
        toast.show();
      },
    }
  };
</script>

<style lang="stylus" scoped>

.wrap {
  background: #fff;
  height: 53.3333vw
  padding: 5.3333vw;
  box-sizing border-box
  display: flex;
  flex-wrap: wrap;
  align-content flex-start
  .items {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 12.8vw;
    margin-bottom: 5.3333vw;
    margin-right: 6.3vw;
    &:nth-child(5n) {
        margin-right:0;
    }
    .iconfont{
        font-size: 9.2vw;
    }
    span {
      margin-top: 1.6vw;
      font-size: 3.2vw;
      color: #999999;
      line-height: 4.2667vw;
      height: 4.2667vw;
    }

    img {
      width: 9.2vw;
      height: 9.2vw;
    }
  }
}
</style>
