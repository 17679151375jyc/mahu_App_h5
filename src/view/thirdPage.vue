<template>

  <div class="third-wrapper">
    <header>
       <span class="fa fa-chevron-left"></span>
       <h4>{{name}}</h4> 
       <span class="fa fa-ellipsis-h"></span>
    </header>
     <cube-scroll class="scroll"
                  :style="scroll"
                  :options="options">
        <div class="item" v-for="(item,index) of dataList" >
          <p class="time" v-if="item.showTime">
             <span style="background: #fff; border-radius: 5px;padding: 0.07rem 0.1rem;padding-top:0.1rem">
             {{item.time}}
             </span>
          </p>
          <div class="item-wrapper-heself" v-if="item.userID != myID">
           
               
               <img class="img-header" 
                    src="./assets/inAndOut/head.jpg" 
                    alt="头像" />
          
                <span class="fa fa-caret-left square"></span>
                  <p class="content-text">
                  {{item.content}}
              </p>
          </div>
          <div class="item-wrapper-myself" v-else :style="item.userID==myID? 'right: 3vw':'justify-content: flex-start'">  
                
                  <p class="content-text" :style="item.userID == myID? 'background: #33ff66':'background: #fff'">
                  {{item.content}}
              </p>
              <span class="fa fa-caret-right square-right"></span>
                <img class="img-header" 
                     src="./assets/inAndOut/head.jpg" 
                     alt="头像" />
          </div>
        </div>
    </cube-scroll>
     <footer :style="footer">
        <div class="footer">
          <span class="fa fa-wifi" style="transform: rotateZ(90deg)"></span>
             
                  <textarea class="input"
                            type="submit"
                            @focus="focus" 
                            @blur="blur"
                            name="myInput"
                            :value="value"
                            @input="input" 
                            :style="textarea"></textarea>
                 <span class="fa fa-paper-plane-o" @click="sendMsg"></span>
            <span class="fa fa-meh-o"></span>
            <span class="fa fa-plus add"></span>
          </div>
      
     </footer>
  </div>
</template>

<script>

    import utils from '_libs/utils'
   export default {
       name: 'thirdPage',
       components: {},
       data(){
         return {
             options: {
               scrollbar: true
             },
             myID: 1,
             name: 'VencentLum',
             names: '',
             inputText: '',
             scroll: {},
             textarea: {
              
             },
             footer: {

             },
             dataList:[ ],
             value: '',
         }
       },
       methods: {
           getName(){
                 let num = (window.location.href).indexOf('?');
                 this.names = (window.location.href).substr(num+1,window.location.href.length-1);
                 this.name = this.names;
            },
            getIdentify(){
                 this.myID = this.names == 'VencentLum'?1:2;
            },
           input(value){
                 this.value = document.getElementsByName('myInput')[0].value;
                 this.inputText = this.value;
           },
           focus(){
             //this.scroll = {height:'78vh'};
            // this.footer = {height:0,minHeight:'13vh'}
            // this.textarea = {border:0}
            this.name = '正在输入ing'

           },
           
           blur(e){
              this.name=this.names
           },
           sendMsg(){
                this.dataList.push(
                   {
                      user: 'heSelf',
                      time: utils.timetrans(new Date().getTime(), 'hhmmss'),
                      content: this.inputText,
                      userID: Math.random()*2>1? 1:2,
                      showTime: Math.random()*2>1.5
                  }
                )
                 this.value = '';
                 this.inputText = '';
           }
       },
       mounted(){
           this.getName();
           this.getIdentify();
       },
   }
</script>
<style lang="scss" scoped>
.third-wrapper{
 
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
    background: rgba(245, 245, 245, 1);
    z-index: 10;
    height: 100vh;
    
      header {
          height: 7vh;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          font-size: 0.45rem;
          font-weight: 600;
          padding: 0 5vw;
          
          p {
           
          }
      }
      .scroll {
         max-height: 83vh;
         //padding-bottom: 5vh;
       //  justify-content: flex-end;
         .item {
              
              width: 94vw;
              margin: 0 3vw;
            
              &:nth-child(n+2){
                  margin: 4vh 3vw;
                  
                  clear: both;
              }
            .time {
                text-align: center;
                font-size: 0.4rem;
                font-weight: 200;
                padding: 0.4rem 0;
                //padding-top: 0.4rem;
                color: gray;
             }
            .item-wrapper-heself {
             display: flex;
              flex-direction: row;
              align-items: flex-start;
              justify-content: flex-start;
            }
            .item-wrapper-myself {
                display: flex;
                flex-direction: row;
                align-items: flex-start;
                justify-content: flex-end;
               // text-align: right;
               // background: red;
              
            }
              //justify-content: space-between;
           .img-header {
              width: 1rem;
              height: 1rem;
           }

           .content-text {
                //min-height: 1rem;
                padding: 0.2rem 0.3rem;
                padding-top: 0.3rem;
                font-weight: normal;
                border-radius: 3px;
                background: #fff;
                word-break: break-all;
                max-width: 62vw;
                font-size: 0.43rem;
                //text-align: right;
                text-overflow: wrap;
                text-align: justify;
                letter-spacing: 0.5px;
                line-height: 0.52rem;
           }
         }
         .square {
                  margin-left: 1vw;
                  color: #fff;
                  font-size: 0.42rem;
                  
            }
          .square-right {
                  margin-right: 1vw;
                  color: #33ff66;
                  font-size: 0.42rem;
          }
         
    }
      footer {
             height: 8vh;
            
             padding: 0  1vw;
             display: flex;
             flex-direction: column;
             justify-cntent: center;
      }
     footer>.footer {
             margin-top: 2vh;
             display: flex;
             flex-direction: row;
             justify-content: space-around;
             align-items: center;
             
            .input {
             
              width: 50vw;
              padding: 0.3vh 0.1vw;
              padding-top: 0.6vh;
              text-overflow: wrap;
              font-size: 0.45rem;
              line-height: 0.46rem;
              border: 1px solid gray;
              display: flex;
              flex-direction: column;
               
            }

            span {
              font-size: 0.7rem;
            }
            .add {
               
            }
          }
          .key {
              width: 100vw;
              max-width: 100vw;
              
          }

}

</style>