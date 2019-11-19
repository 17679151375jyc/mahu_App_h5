<template>
  <div class="wrapper">
    <topBar :title="'修改区域'" @goBack="back" >
    </topBar>
    <div class="items">
        <div class="item switch-item border-bottom-1px">
            <div class="label">
                是否接收报警信息
            </div>
            <div>
                <cube-switch v-model="value"></cube-switch>
            </div>
        </div>
        <div class="item border-bottom-1px">
            <span class="label">所在城市</span>
            <b>江门市蓬江区</b>
        </div>
        <div class="item border-bottom-1px">
            <span class="label">区域名称</span>
            <b>圣地亚哥花园18座1801</b>
        </div>
    </div>
    <div class="items">
        <div class="item">
            <span class="label">详细地址</span>
            <b style="color: #666;">环市二路10号1栋1501</b>
        </div>
    </div>
  </div>
</template>

<script>
  import topBar from "_c/topBar";
    export default {
        name: "mineModifierarea",
      components: { topBar, },
      created(){
        try{
          if(CYJ){
            CYJ.hideTab()
          }
        }catch(e){

        }
      },
      methods: {
        back(e) {
          setTimeout(() => {
            this.$router.goBack();
          }, 50)
        },
      },
    }
</script>

<style lang="stylus" scoped>
.wrapper{
    position fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #EDEEF0;    
    .items{
        background: #fff;
        box-sizing: border-box;
        margin-top: 2.6667vw;
        .item{
            height: 13.3333vw;
            margin: 0 5.3333vw;
            display: flex;
            align-items center;
            justify-content space-between;
            .label{
                color: #666;
                font-size: 3.4667vw;
            }
            b{
                color: #ccc;
                font-size: 3.4667vw;
            }
        }
        .switch-item{
            .label{
                font-size: 4.2667vw;
                color: #333;
                font-weight: bold;
            }
        }
    }
}
</style>
