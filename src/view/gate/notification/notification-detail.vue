<template>
  <div class="wrapper-white">
    <return-head title="通知消息详情"></return-head>
    <div style='width: 85.87vw;margin: 0 auto;;height: 12.53vw;text-align: center;line-height: 12.53vw;color: #666;'>
      <span style="display: block;float: left;font-size: 4.8vw;font-weight: bold;">{{ info.noticeTitle }}</span>
      <span style="display: block;float: right;font-size: 3.73vw;font-weight: bold;">{{ info.plotName }}</span>
    </div>
    <!-- <div style='width: 100%;height: 17.33vw;text-align: center;line-height: 17.33vw;'>
        <h2 style='font-size: 4.8vw;font-weight: bold;'>{{ list.title }}</h2>
    </div> -->
    
    <cube-scroll style="max-height: 88.5%;">
        <div v-html='info.noticeContent' class='cont_css' ref='cont_css'></div> 
        <div class="divImg_css">
          <img  @click="bigImg(index)" v-if='item' class="img_css" :src="item" v-for="(item, index) in info.pictureLink" :key='index' > 
        </div>
        <div ref='date' class='dates'>{{ info.postDate }}</div>
    </cube-scroll>
  </div>
</template>

<script>
  import returnHead from '_c/head/return-head';
  export default {
    components: {
      returnHead,
    },
    props:{
      noticeNumber: {
        type: String,
        default:''
      }
    },
    data() {
      return {
        flag: true,
          info: {
            postDate: null,
            plotName: null,
            noticeTitle: null,
            noticeContent: null,
            pictureLink: [],
          }
      };
    },
    mounted() {
      this.getListInfo()
    },
    methods: {
      //查看图片
      bigImg(val){
        this.$createImagePreview({
          imgs: this.info.pictureLink,
          initialIndex: val
        }).show()
      },
      //封装-时间戳转换成日期
      changeTime(val){
        let date = new Date(val * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        let D = date.getDate() + ' ';
        let h = date.getHours() + ':';
        let m = date.getMinutes()<10 ? '0' + date.getMinutes() : date.getMinutes();
        let s = date.getMinutes()<10 ? '0' + date.getMinutes() : date.getMinutes();
        // let m = date.getMinutes() + ':';
        // let s = date.getSeconds();
        let time =  Y+M+D+h+m;
        return time;
      },
      getListInfo(){
        this.$post('base', '/FamilyJava/client/community/notice/getNoticeById', {
          noticeNumber: this.noticeNumber
        }).then(({data, errorCode})=>{
          if(errorCode === 0){
            if(data){
              let {
                noticeTitle,
                plotName,
                postDate,
                noticeContent,
                pictureLink
              } = data;
              this.info = {
                plotName,
                postDate: this.changeTime(postDate),
                noticeTitle: unescape(noticeTitle.replace(/\\u/g,"%u")),
                noticeContent: unescape(noticeContent?noticeContent.replace(/\\u/g,"%u"):''),
                pictureLink: pictureLink.split(',')
              }
              setTimeout(()=>{
                this.$refs.cont_css.style.height = this.$refs.cont_css.clientHeight + 'px';
              }, 500)
            }
          }
        })        
      }
    }
  };
</script>

<style lang="stylus" scoped>
.cont_css{
  width: 85.87vw;
  margin: 0 auto;
  line-height: 6vw;
  font-size: 3.73vw;
}
.divImg_css{
  width: 90%;
  margin: 0 auto;
}
.img_css{
  width: 100%;
  height: 48.27vw;
  margin:1.07vw auto;
}
.dates{
  width: 92.87vw;
  margin: 0 auto;
  text-align: right;
  font-size:3.73vw;
  color: #999;
  margin: 5vw 0 3vw 0;
}
</style>
