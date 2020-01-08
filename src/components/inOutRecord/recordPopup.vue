<template>
    <cube-popup type="my-popup" ref="myPopup">
      <v-touch @swipeleft="swipeleft" height="500px" @swiperight="swiperight">
        <transition :name="transitionName">
          <div class="record-right-content" :style="area"  v-show="show">
            <p class="title">
              <span>选择时间</span>
            </p>
            <p class="tips">出入记录只保留近期3个月的记录</p>
            <div class="select-time">
              <p>
                <a href="javascript: void(0)" :class="aStyle.a0" @click="selectTime('a0','0',0)">全部</a>
                <a href="javascript: void(0)" :class="aStyle.a1" @click="selectTime('a1',monthFirst,1)">{{monthFirst}}月</a>
              </p>
              <p style="margin:0">
                <a href="javascript: void(0)" :class="aStyle.a2" @click="selectTime('a2',monthSecond,2)">{{monthSecond}}月</a>
                <a href="javascript: void(0)" :class="aStyle.a3" @click="selectTime('a3',monthThird,3)">{{monthThird}}月</a>
              </p>
            </div>
            <p class="title">
              <span>选择人物</span>
            </p>
            <div class="select-time">
              <p v-for="(item,index) in mQueryAbleRole" :key="index">
                <!--<a href="javascript: void(0)" :class="aPeopleStyle.p0" @click="selectPeople('p0')">{{item[0].typeDesc}}</a>-->
                <a href="javascript: void(0)"
                   v-for="(itemItem,indexIndex) in item" :key="indexIndex"
                   :class="{'active' : aPeopleStyleCount===(index*2+indexIndex)}"
                   @click="selectPeople(index*2+indexIndex,'p'+(index*2+indexIndex),itemItem.type)">{{itemItem.typeDesc}}</a>
              </p>
              <!--<p>-->
              <!--<a href="javascript: void(0)" :class="aPeopleStyle.p2" @click="selectPeople('p2')">家人</a>-->
              <!--<a href="javascript: void(0)" :class="aPeopleStyle.p3" @click="selectPeople('p3')">访客</a>-->
              <!--</p>-->
            </div>
            <div class="btn-grow">
              <button type="button" @click="btnClick('cancel')">取消</button>
              <button type="button" @click="btnClick('ok')">确认</button>
            </div>
          </div>
        </transition>
      </v-touch>
    </cube-popup>
</template>


<script>
  export default {
    name: "recordPopup",
    props:
      {
        queryAbleRole: {
          type: Array,
          default: () => []
        },
        aPeopleCount: {
          type: Number,
          default: 0
        },
        aMonthIndexIndex: {
          type: Number,
          default: 0
        }
      },
    data() {
      return {
        area: {
          width: 0,
          height: 0
        },
        show: false,
        aStyle: {
          a0: ["active"],
          a1: [],
          a2: [],
          a3: []
        },
        aPeopleStyle: {
          // p0: ["active"],
          // p1: [],
          // p2: [],
          // p3: [],
          // p4: [],
          // p5: [],
        },
        aPeopleStyleCount: 0,
        aPeopleType: 0,
        aPeopleTypeIndex: 0,
        aMonth: "0",
        aMonthIndex: 0,
        transitionName: "record",

        monthFirst: "",
        monthSecond: "",
        monthThird: "",

        mQueryAbleRole: []
      };
    },
    created() {
      let now = new Date();
      let month = now.getMonth() + 1;
      let year = now.getFullYear();
      this.monthFirst = now.getFullYear() + "-" + month;
      this.monthSecond = (month<2 ? year-1 : year) + "-" + (month<2 ? 12 : month-1);
      this.monthThird = (month<3 ? year-1 : year) + "-" + (month<2 ? 11 : month<3 ? 12 : month-2);

      console.log(this.queryAbleRole);
      for(let count=0;count<this.queryAbleRole.length;count++){
        if(count === 0) {
          this.aPeopleStyle['p'+count] = ["active"];
        } else {
          this.aPeopleStyle['p'+count] = [];
        }
      }
      // this.queryAbleRole.forEach((index)=>{
      //   if(index === 0) {
      //     this.aPeopleStyle['p'+index] = ["active"];
      //   } else {
      //     this.aPeopleStyle['p'+index] = [];
      //   }
      //   console.log(555555555555,this.aPeopleStyle);
      // });
      let queryAbleRole_length = this.queryAbleRole.length;
      for (let count=0;count<queryAbleRole_length;count+=2) {
        this.mQueryAbleRole.push(this.queryAbleRole.slice(count,count+2));
      }
      // alert(this.mQueryAbleRole[0][1].typeDesc);
    },
    mounted() {
      let self = this;
      this.$refs["myPopup"].show();
      setTimeout(() => {
        self.inint();
        self.selectTime("a"+self.aMonthIndexIndex,
          self.aMonthIndexIndex === 1 ? self.monthFirst :
            self.aMonthIndexIndex === 2 ? self.monthSecond :
              self.aMonthIndexIndex === 3 ? self.monthThird : "0",
          self.aMonthIndexIndex);
        for (let count = 0;count < self.queryAbleRole.length;count++) {
          if (count === self.aPeopleCount) {
            self.selectPeople(self.aPeopleCount,"p"+count,self.queryAbleRole[count].type)
          }
        }
      }, 10);
    },
    watch: {
      // aMonthIndexIndex() {
      //   let self = this;
      //   setTimeout(() => {
      //     self.inint();
      //     self.selectTime("a"+self.aMonthIndexIndex,self.monthFirst,self.aMonthIndexIndex);
      //     for (let count = 0;count < self.queryAbleRole.length;count++) {
      //       if (count === self.aPeopleCount) {
      //         self.selectPeople(self.aPeopleCount,"p"+count,self.queryAbleRole[count].type)
      //       }
      //     }
      //   }, 10);
      // }
    },
    methods: {
      inint() {
        this.area.width = "64vw";
        this.area.height = "calc(100vh - 11.7333vw)";
        // this.area.height = "100%";

        this.show = true;
      },
      selectTime(event,month,index) {
        for (let i = 0; i < Object.keys(this.aStyle).length; i++) {
          this.aStyle[Object.keys(this.aStyle)[i]].pop();
        }
        this.aStyle[event].push("active");
        this.aMonth = month;
        this.aMonthIndex = index;
        this.$emit("popupCloseIndex",
          {aPeopleStyleCount: this.aPeopleStyleCount, aMonthIndex: this.aMonthIndex});
      },
      selectPeople(index,event,type) {
        console.log(index,event+type);
        for (let i = 0; i < Object.keys(this.aPeopleStyle).length; i++) {
          this.aPeopleStyle[Object.keys(this.aPeopleStyle)[i]].pop();
        }
        this.aPeopleStyle[event].push("active");
        this.aPeopleStyleCount = index;
        this.aPeopleType = type;
        this.$emit("popupCloseIndex",
          {aPeopleStyleCount: this.aPeopleStyleCount, aMonthIndex: this.aMonthIndex});
      },
      btnClick(event) {
        let self = this;
        self.$emit("popupClose",
          {event: event, aPeopleType: self.aPeopleType, aMonth: self.aMonth});
      },
      swipeleft(e) {
        //console.log(e)
        this.show = true;
      },
      swiperight(e) {
        this.transitionName = "records";

        this.show = false;
        setTimeout(() => {
          this.btnClick(false);
        }, 250);

        //this.transitionName = 'record'
      }
    }
  };
</script>

<style lang="stylus">
.record-right-content {

  position: relative;
  box-sizing: content-box;
  background-color: rgba(255, 255, 255, 1);
  left: 18vw;

  border-top: 1px solid #f0f0f0;

  .title {
    padding: 5.87vw 5.33vw 0.4rem 5.33vw;
    font-size: 3.47vw;
    color: rgba(77, 77, 77, 1);

    line-height: 0.3rem;
    display: flex;
    align-items: center;
    &::before {
      content: " ";
      font-size: 0.28rem;
      margin-top: -0.6vw;
      width: 0.53vw;
      height: 2.67vw;
      background: rgba(51, 136, 255, 1);
      color: rgba(51, 136, 255, 1);
    }
    span {
      margin-left: 2.67vw;
      font-weight: 600;
    }
  }
  .tips {
    font-size: 2.97vw;
    padding: 1.07vw 0;
    color: rgba(77, 77, 77, 1);
    margin: 2.93vw 5.33vw 0 5.33vw;
    background: rgba(237, 238, 240, 1);
    border-radius: 1.33vw;
    text-align: center;
  }
  .select-time {
    margin: 2.67vw 5.33vw;
    display: flex;
    flex-direction: column;
    p {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 0 0 2.67vw 0;
    }
    a {
      display: flex;
      flex-direction: row;
      justify-content center;
      align-items center;
      font-size: 3.47vw;
      width: 24vw;
      height 9.07vw;
      text-align: center;
      border: 1px solid rgba(227, 228, 229, 1);
      border-radius: 4.53vw;
      color: rgba(179, 179, 179, 1);
      font-weight: 600;
      &:link {
        text-decoration: none;
      }
      &.active {
        box-sizing: border-box;
        border: 1px solid rgba(51, 136, 255, 1);
        color: rgba(51, 136, 255, 1);
      }
    }
  }
  .btn-grow {
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;

    button {
      width: 50%;
      display: inline-block;
      padding: 4vw 0;
      border: 0;
      border-top: 1px solid #f0f0f0;
      outline: none;
      font-size: 3.47vw;

      &:first-child {
        background: rgba(255, 255, 255, 1);
        color: rgba(179, 179, 179, 1);
      }
      &:last-child {
        background: rgba(51, 136, 255, 1);
        color: rgba(255, 255, 255, 1);
      }
    }
  }
}
</style>