<template>

  <div class="mineDev-wrapper">

    <cube-popup type="my-popup" ref="myPopup" >
      <transition name="scale">
        <div class="container" v-show="popShow">
          <h3>请您选择切换的小区</h3>
          <h4></h4>
          <cube-scroll ref="scroll"
                       :options="setting"
                       class="content">

            <label v-for="(item,index) of options" :class="item.labelClass" v-if="true">
              {{item.label}}
              <input name="item.label"
                     type="radio"
                     value="item.value"
                     @change="selectValue(index)"
                     :class="item.className" /></label>
            <p style="color: #808080;font-weight: 300;font-size:0.31rem" v-if="false">暂未获取到小区信息</p>
          </cube-scroll>
          <div class="footer">
            <button type="button" class="dengji" @click="closePoppup('myPopup')">取消</button>
            <button type="button" class="write"> 确定</button>
          </div>
        </div>
      </transition>
    </cube-popup>
  </div>

</template>

<script>
  import utils from '_libs/utils'

  export default {
    name: '',
    components: {},
    data(){
      return {
        popShow: false,
        addVisitor: 3,
        setting: {
          scrollbar: true,
        },
        options: [
          {
            value:"丽城花园",
            label: 'dfgdf',
            className: [],
            labelClass: []
          },
          {
            value:"丽城花园",
            label: 'dfgdf',
            className: [],
            labelClass: []
          },
        ],
        myComnunities: {}

      }
    },
    methods: {
      init(){
        utils.comnunities().then((result)=>{
          if(result){
            result.forEach((item,index,arr)=>{
              item.label = item.nameDesc;
              item.value = index;
              item.className = [];
              item.labelClass = [];
              this.options.push(item);
            })
          }
        })
      },

      showPopup(refId) {
        const component = this.$refs[refId]
        component.show()
      },
      closePoppup(refId){
        this.$emit('addVisitorClose',refId);

      },
      selectValue(value){
        for(let i=0;i<Array.from(this.options).length;i++){
          Array.from(this.options)[i].className.pop();
          Array.from(this.options)[i].labelClass.pop();
        }
        Array.from(this.options)[value].className.push('active');
        Array.from(this.options)[value].labelClass.push('label-active');
        this.myComnunities = Array.from(this.options)[value];
      },
      closePoppup(refId){
        this.$emit('mineDevPopup',refId);
      },

    },
    computed: {
      hasData(){
        return this.options.length>0
      }
    },
    created(){
      this.init()
    },
    mounted(){
      this.showPopup('myPopup');
      this.popShow = true;


    }
  }
</script>


<style lang="scss">
  @import '@/view/style/animate.scss';
  .mineDev-wrapper {

    .container {
      padding: 0.5rem 0.5rem;
      background: rgba(255,255,255,1);
      border-radius: 0.28rem;

      h3 {
        margin: 0 1.8rem;
        font-size: 0.48rem;
        font-weight: bold;
      }
      h4 {
        font-size: 0.4rem;
        font-weight: 600;
        margin: 0.6rem 0 0.4rem 0;
      }

      .content {
        border-radius: 0.25rem;
        padding:  1px;
        background:rgba(245,245,245,1);

        height: 35vh;
        label {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding: 0 3vw;
          align-items: center;
          line-height: 1.5rem;
          margin: 2px;
          border-radius: 5px;
          background: #fff;
          font-size: 0.35rem;
          font-weight: 300;
          color: #808080;

          &.label-active {
            color: #4D4D4D;

            font-weight: 500;
          }
        }
        .active {

          &::after {
            content: " 8888 ";
            background: url('/src/assets/inAndOut/icon_selectd.png');
            background-repeat: no-repeat;
            background-size: 53%;
            background-position: left top;
            width: 1rem;
            color: rgba(233,211,255,0);
            height: 1rem;

          }


        }
        p {

          align-items: center;
          font-size: 0.30rem;
          margin: 0.5rem 0;

        }
      }
      .footer {
        margin-top: 0.8rem;
        display: flex;
        flex-direction: row;
        justify-content: center;
        button {
          width: 50%;
          border: 0;
          padding: 0.1rem 0;
          outline: none;
          text-align: center;
          background: rgba(255,255,255,1);
          font-size: 0.4rem;
          font-weight: 500;
          &:first-child {
            color: rgba(77,98,128,1);
            border-right: 1px solid #E9EEF5;
          }
          &:last-child {
            color: #3388FF;

          }
        }

      }
    }
    .close {
      text-align: center;
      margin-top: 1.5rem;
      font-size: 1.5rem;
      color: rgba(255,255,255,1)
    }


  }

</style>
